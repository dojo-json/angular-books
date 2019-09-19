import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { BookService } from '../services';
import { Book } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class BookResolver implements Resolve<Book[]> {
  constructor(private readonly bookService: BookService) {}

  resolve(): Observable<Book[]> {
    return this.bookService.getBooks();
  }
}
