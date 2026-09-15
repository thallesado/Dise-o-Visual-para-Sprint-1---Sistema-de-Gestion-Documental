import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { demoList, DemoItem, RouteInfo, screenCopy } from '../../core/data/nexodocs-data';

type PageStat = { icon: string; label: string; value: string; detail: string; tone: string };

@Component({
  selector: 'app-workspace-page',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page">
      @if (isHome) {
        <section class="dashboard-welcome">
          <div>
            <p class="eyebrow">Martes, 15 de septiembre de 2026</p>
            <h1>Buenos días, Laura</h1>
            <p class="welcome-copy">Aquí tienes un resumen de lo que está ocurriendo en Acme Consulting.</p>
          </div>
          <div class="hero-actions">
            <a routerLink="/documents/new"><span>＋</span> Crear documento</a>
            <a routerLink="/documents/upload" class="secondary-action"><span>↑</span> Subir archivo</a>
          </div>
        </section>
        <div class="dashboard-grid">
          <article class="dashboard-card task-card">
            <div class="card-heading"><div><span class="card-icon amber">◷</span><div><h2>Mis tareas</h2><p>Requieren tu atención</p></div></div><a routerLink="/dashboard/tasks">Ver todas →</a></div>
            <div class="task-summary"><strong>8</strong><span>pendientes</span><b>3</b><span>alta prioridad</span></div>
            <div class="task-line"><span class="dot amber-dot"></span><div><b>Revisar contrato marco proveedores</b><small>Vence mañana · Legal</small></div><span class="status pending">Pendiente</span></div>
            <div class="task-line"><span class="dot blue-dot"></span><div><b>Aprobar política de seguridad</b><small>Vence en 3 días · Dirección</small></div><span class="status review">En revisión</span></div>
          </article>
          <article class="dashboard-card activity-card">
            <div class="card-heading"><div><span class="card-icon teal">↗</span><div><h2>Actividad reciente</h2><p>Últimos movimientos del tenant</p></div></div><a routerLink="/dashboard/activity">Ver actividad →</a></div>
            <div class="activity-row"><span class="activity-avatar">MG</span><div><b>María González aprobó un documento</b><small>Política de seguridad de la información</small></div><time>Hace 18 min</time></div>
            <div class="activity-row"><span class="activity-avatar blue">CM</span><div><b>Carlos Méndez subió un archivo</b><small>Contrato marco proveedores 2025</small></div><time>Hace 1 h</time></div>
            <div class="activity-row"><span class="activity-avatar purple">AR</span><div><b>Ana López completó un workflow</b><small>Alta de proveedor · EXP-2041</small></div><time>Ayer</time></div>
          </article>
        </div>
        <section class="panel dashboard-documents">
          <div class="panel-title"><div><h2>Documentos recientes</h2><p>Los documentos que han tenido actividad recientemente.</p></div><a routerLink="/documents">Ver todos →</a></div>
          <div class="list document-list">
            @for (item of documents; track item.title) {
              <article>
                <span class="file-icon">{{ fileType(item) }}</span>
                <div><h3>{{ item.title }}</h3><p>{{ item.meta }}</p></div>
                <time>{{ item.date }}</time><span [class]="statusClass(item)">{{ item.status }}</span><button type="button" aria-label="Más opciones">•••</button>
              </article>
            }
          </div>
        </section>
      } @else {
        <header class="module-header">
          <div class="module-icon">{{ moduleIcon }}</div>
          <div class="module-heading">
            <p class="eyebrow">{{ routeInfo.module }} <span>·</span> {{ routeInfo.subcategory }}</p>
            <h1>{{ routeInfo.subcategory }}</h1>
            <p>{{ copy.description }}</p>
          </div>
          <button type="button" (click)="actionMessage = copy.action + ' preparado'"><span>{{ actionIcon }}</span>{{ copy.action }}</button>
        </header>
      }

      @if (!isHome) {
        <div class="stats">
          @for (stat of stats; track stat.label) {
            <article>
              <span class="stat-icon" [class]="stat.tone">{{ stat.icon }}</span>
              <div><small>{{ stat.label }}</small><strong>{{ stat.value }}</strong><p>{{ stat.detail }}</p></div>
            </article>
          }
        </div>
      }

      @if (isFormPage) {
        <div class="content-grid">
          <form class="panel form-panel" (submit)="$event.preventDefault(); actionMessage = 'Borrador guardado localmente'">
            <div class="form-title"><h2>{{ routeInfo.subcategory }}</h2><span class="required-note">* Campos obligatorios</span></div>
            <div class="form-fields">
              <label>Nombre <input placeholder="Ej. Contrato marco proveedores" /></label>
              <label>Responsable <input placeholder="Laura Martinez" /></label>
              <label>Área <select><option>Dirección</option><option>Legal</option><option>Archivo</option></select></label>
              <label>Tipo documental <select><option>Contrato</option><option>Política</option><option>Informe</option></select></label>
            </div>
            <label>Descripción <textarea rows="5" placeholder="Resumen operativo del documento"></textarea></label>
            <div class="form-actions"><button type="button" class="cancel-button">Cancelar</button><button type="submit">Guardar borrador</button></div>
          </form>
          <aside class="panel note-panel">
            <span class="side-kicker">GUÍA RÁPIDA</span><h2>Completa la información</h2>
            <p>Los datos de clasificación ayudan a encontrar y proteger los documentos de tu organización.</p>
            <ul><li>Usa un nombre descriptivo y único.</li><li>Asigna un responsable para el seguimiento.</li><li>Podrás agregar versiones y permisos después.</li></ul>
            <div class="simulated-note"><b>Operación simulada</b><span>Esta pantalla no guarda datos porque todavía no existe backend ni API autenticada.</span></div>
          </aside>
        </div>
      } @else if (!isHome) {
        <section class="panel list-panel">
          <div class="panel-title"><div><h2>{{ listTitle }}</h2><p>Datos de demostración filtrados por el tenant actual.</p></div><button type="button" class="panel-action" (click)="actionMessage = 'Exportación preparada'">↓ Exportar</button></div>
          <div class="list-toolbar"><label><span>⌕</span><input placeholder="Buscar en este módulo..." /></label><button type="button" (click)="actionMessage = 'Filtros abiertos'">Estado · Área · Fecha</button></div>
          <div class="list">
            @for (item of items; track item.title) {
              <article>
                <span class="file-icon">{{ fileType(item) }}</span>
                <div class="list-main"><h3>{{ item.title }}</h3><p>{{ item.meta }}</p></div>
                <time>{{ item.date }}</time><span [class]="statusClass(item)">{{ item.status }}</span><button class="more-button" type="button" (click)="actionMessage = item.title + ' abierto'" aria-label="Abrir opciones">•••</button>
              </article>
            }
          </div>
        </section>
      }

      @if (actionMessage) { <div class="inline-toast" role="status">{{ actionMessage }}</div> }
      <footer class="demo-note"><span>ⓘ</span> Vista de demostración con datos simulados de <b>Acme Consulting</b>. No realiza operaciones persistentes.</footer>
    </section>
  `,
})
export class WorkspacePage {
  private readonly route = inject(ActivatedRoute);
  readonly routeInfo = this.route.snapshot.data['routeInfo'] as RouteInfo;
  readonly copy = screenCopy(this.routeInfo);
  readonly items = demoList(this.routeInfo.module);
  readonly documents = demoList('Documentos');
  readonly isHome = this.routeInfo.href === '/';
  readonly isFormPage = ['Crear', 'Nuevo', 'Subir', 'Escanear'].some((word) => this.routeInfo.subcategory.includes(word));
  readonly listTitle = this.routeInfo.href === '/' ? 'Actividad prioritaria' : `${this.routeInfo.module} recientes`;
  actionMessage = '';

  readonly stats: PageStat[] = this.buildStats(this.routeInfo.module);

  get moduleIcon(): string {
    return ({ Documentos: '▤', Expedientes: '▱', Digitalizacion: '⌗', Workflows: '↗', 'Usuarios y equipos': '♙', Auditoria: '◌', Reportes: '▥', Notificaciones: '♢', Configuracion: '⚙', Tenants: '⌂' } as Record<string, string>)[this.routeInfo.module] ?? '✦';
  }

  get actionIcon(): string { return this.isFormPage ? '＋' : '↗'; }

  statusClass(item: DemoItem): string {
    const base = 'status ';
    if (['Aprobado', 'Activo', 'Completado'].includes(item.status)) return `${base}ok`;
    if (item.status.includes('revision')) return `${base}review`;
    if (item.status === 'Pendiente') return `${base}pending`;
    if (['Bloqueado', 'Suspendido'].includes(item.status)) return `${base}danger`;
    return `${base}muted`;
  }

  fileType(item: DemoItem): string {
    const type = item.meta.split(' - ')[1] ?? '';
    return type.length <= 4 && type ? type : this.routeInfo.module === 'Workflows' ? 'WF' : 'DOC';
  }

  private buildStats(module: string): PageStat[] {
    const values: Record<string, PageStat[]> = {
      'Inicio': [{ icon: '▤', label: 'Registros', value: '1,248', detail: 'Tenant actual', tone: 'teal' }, { icon: '◷', label: 'Pendientes', value: '24', detail: 'Requieren atención', tone: 'amber' }, { icon: '↗', label: 'Actividad mensual', value: '+12.5%', detail: 'Comparado con mayo', tone: 'green' }],
      Documentos: [{ icon: '▤', label: 'Documentos', value: '1,248', detail: '+12 esta semana', tone: 'teal' }, { icon: '◷', label: 'Pendientes', value: '24', detail: '8 requieren acción', tone: 'amber' }, { icon: '✓', label: 'Aprobados', value: '1,106', detail: '88.6% del total', tone: 'green' }],
      Workflows: [{ icon: '↗', label: 'Activos', value: '32', detail: '8 requieren acción', tone: 'blue' }, { icon: '◷', label: 'Tiempo promedio', value: '2.4 días', detail: '-8% este mes', tone: 'teal' }, { icon: '✓', label: 'Completados', value: '148', detail: '96% dentro del plazo', tone: 'green' }],
      'Usuarios y equipos': [{ icon: '♙', label: 'Usuarios activos', value: '42', detail: '2 invitaciones pendientes', tone: 'green' }, { icon: '▱', label: 'Áreas y grupos', value: '14', detail: 'Cobertura organizacional', tone: 'teal' }, { icon: '◇', label: 'Roles', value: '6', detail: '128 permisos asignados', tone: 'blue' }],
      Digitalizacion: [{ icon: '⌗', label: 'En cola', value: '18', detail: '126 páginas', tone: 'blue' }, { icon: '✦', label: 'Confianza media', value: '91.4%', detail: 'Extracción OCR', tone: 'green' }, { icon: '!', label: 'Requieren validación', value: '7', detail: 'Confianza menor a 80%', tone: 'amber' }],
      Notificaciones: [{ icon: '♢', label: 'No leídas', value: '6', detail: '2 de alta prioridad', tone: 'amber' }, { icon: '◷', label: 'Vencen hoy', value: '3', detail: 'Tareas asignadas', tone: 'rose' }, { icon: '✓', label: 'Atendidas', value: '21', detail: 'Esta semana', tone: 'green' }],
    };
    return values[module] ?? values['Inicio'];
  }
}
