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
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./components/auth/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  // {
  //   path: 'sign-up',
  //   loadComponent: () =>
  //     import('./components/auth/sign-up/sign-up.component').then(
  //       (m) => m.SignUpComponent
  //     ),
  // },
];
