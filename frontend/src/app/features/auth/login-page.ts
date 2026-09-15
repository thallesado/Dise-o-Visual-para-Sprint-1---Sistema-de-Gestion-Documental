import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink],
  template: `
    <main class="login-page">
      <section class="login-card">
        <div class="brand-mark">ND</div>
        <p class="eyebrow">NexoDocs</p>
        <h1>Ingresa al espacio documental</h1>
        <p>
          Acceso visual de demostracion. La autenticacion real debe resolverse en un
          backend con tenant, usuario y permisos validados.
        </p>
        <label>
          Correo
          <input value="laura@acme.com" />
        </label>
        <label>
          Contrasena
          <input type="password" value="nexodocs-demo" />
        </label>
        <a routerLink="/" class="primary-link">Entrar a la demo</a>
      </section>
    </main>
  `,
})
export class LoginPage {}
