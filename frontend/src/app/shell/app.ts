import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { navigationRoutes, navSections, Role, roles } from '../core/data/nexodocs-data';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  private readonly router = inject(Router);
  readonly roles = roles;
  readonly sections = navSections;
  readonly currentUrl = signal(this.router.url);
  readonly expanded = signal<string[]>(['Inicio']);
  readonly role = signal('Administrador de tenant');
  readonly toast = signal('');
  readonly chatOpen = signal(false);
  readonly mobileNavOpen = signal(false);
  private toastTimer?: ReturnType<typeof setTimeout>;

  readonly availableSections = computed(() =>
    this.sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => !item.roles || item.roles.includes(this.role() as Role)),
      }))
      .filter((section) => section.items.length > 0),
  );

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));
  }

  isWorkspace(): boolean {
    return this.currentUrl() !== '/login';
  }

  isExpanded(label: string): boolean {
    return this.expanded().includes(label);
  }

  toggleNav(label: string): void {
    this.expanded.update((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  }

  openNav(label: string): void {
    this.expanded.update((current) => (current.includes(label) ? current : [...current, label]));
    this.mobileNavOpen.set(false);
  }

  isActiveItem(label: string): boolean {
    const route = navigationRoutes.find((item) => item.href === this.currentUrl());
    return (route?.module ?? 'Inicio') === label;
  }

  isActiveChild(href: string): boolean {
    return this.currentUrl() === href;
  }

  unreadCount(label: string): string {
    if (label === 'Workflows') return '8';
    if (label === 'Notificaciones') return '3';
    return '';
  }

  notify(message: string): void {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(''), 2600);
  }

  routeLabel(href: string): string {
    return navigationRoutes.find((route) => route.href === href)?.subcategory ?? 'Resumen';
  }
}
