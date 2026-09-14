param([string]$Service = 'postgres')

$ErrorActionPreference = 'Stop'
$repositoryDirectory = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$composeArguments = @('compose', '--project-directory', $repositoryDirectory, '--file', (Join-Path $repositoryDirectory 'compose.yaml'))

function Invoke-Compose {
    param([string[]]$CommandArguments)
    $previousPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    try {
        $commandOutput = & docker @composeArguments @CommandArguments 2>&1
        $commandExit = $LASTEXITCODE
    } finally { $ErrorActionPreference = $previousPreference }
    if ($commandExit -ne 0) { throw ($commandOutput | Out-String) }
    return ($commandOutput | Out-String).Trim()
}

# Lee solo nombres, nunca contraseñas, desde el contenedor de este Compose.
$databaseUser = Invoke-Compose -CommandArguments @('exec', '-T', $Service, 'printenv', 'POSTGRES_USER')
$databaseName = Invoke-Compose -CommandArguments @('exec', '-T', $Service, 'printenv', 'POSTGRES_DB')
if (!$databaseUser -or !$databaseName) { throw 'No se pudo resolver POSTGRES_USER/POSTGRES_DB.' }

$backupDirectory = Join-Path $PSScriptRoot 'backups'
$null = New-Item -ItemType Directory -Path $backupDirectory -Force
$backupName = 'before-hardening-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N').Substring(0,8) + '.dump'
$remoteBackup = '/tmp/' + $backupName
$localBackup = Join-Path $backupDirectory $backupName
$null = Invoke-Compose -CommandArguments @('exec', '-T', $Service, 'pg_dump', '-U', $databaseUser, '-d', $databaseName, '--format=custom', '--file', $remoteBackup)
$null = Invoke-Compose -CommandArguments @('exec', '-T', $Service, 'pg_restore', '--list', $remoteBackup)
$null = Invoke-Compose -CommandArguments @('cp', ($Service + ':' + $remoteBackup), $localBackup)
if (!(Test-Path -LiteralPath $localBackup) -or (Get-Item -LiteralPath $localBackup).Length -eq 0) { throw 'No se creó un respaldo local válido.' }
$null = Invoke-Compose -CommandArguments @('exec', '-T', $Service, 'rm', '--', $remoteBackup)
Write-Output "Respaldo previo: $localBackup"

# 001..003 son la base inicial. Las migraciones incrementales empiezan en 004,
# comparten su fuente con el arranque Docker y registran su aplicación en app.
$migrations = Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot 'init') -File -Filter '*.sql' |
    Where-Object { $_.Name -match '^(\d{3})_' -and [int]$Matches[1] -ge 4 } | Sort-Object Name
foreach ($migration in $migrations) {
    $outputText = Invoke-Compose -CommandArguments @('exec', '-T', $Service, 'psql', '-X', '-U', $databaseUser, '-d', $databaseName, '-v', 'ON_ERROR_STOP=1', '-f', ('/docker-entrypoint-initdb.d/' + $migration.Name))
    Write-Output ($migration.Name + ': OK')
}
Write-Output 'MIGRATIONS_OK'
