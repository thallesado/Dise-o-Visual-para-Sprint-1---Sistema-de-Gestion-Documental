import { Routes } from '@angular/router';
import { LoginPage } from '../../features/auth/login-page';
import { navigationRoutes } from '../data/nexodocs-data';
import { NotFoundPage } from '../../features/not-found/not-found-page';
import { WorkspacePage } from '../../features/workspace/workspace-page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    title: 'Login - NexoDocs',
  },
  ...navigationRoutes.map((route) => ({
    path: route.href === '/' ? '' : route.href.slice(1),
    component: WorkspacePage,
    title: `${route.subcategory} - NexoDocs`,
    data: { routeInfo: route },
  })),
  {
    path: '**',
    component: NotFoundPage,
    title: 'Pagina no encontrada - NexoDocs',
  },
];
