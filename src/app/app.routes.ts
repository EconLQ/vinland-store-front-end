import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'archive',
    loadComponent: () =>
      import('./components/blogs/blogs.component').then(
        (m) => m.BlogsComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
];
