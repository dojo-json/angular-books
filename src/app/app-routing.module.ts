import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import * as fromBooks from './books';

const enableTracing = false && !environment.production;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    children: [
      {
        path: '',
        component: fromBooks.BookListComponent,
      },
      {
        path: 'new',
        component: fromBooks.BookNewComponent,
      },
      {
        path: ':book_id',
        component: fromBooks.BookDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'books',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
