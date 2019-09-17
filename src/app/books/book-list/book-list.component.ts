import { Component, OnInit } from '@angular/core';

import { BOOKS } from '../../data/book-data';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  selectedBook: Book;
  books: Book[] = BOOKS;

  constructor() {}

  ngOnInit() {}

  onSelect(book: Book) {
    console.log('selecting book');
    // (expression) ? (if true) : (if false)
    this.selectedBook = this.selectedBook === book ? null : book;
    // if (this.selectedBook === book) {
    //   this.selectedBook = null;
    // } else {
    //   this.selectedBook = book;
    // }
  }

  onCreate(book: Book) {
    console.log('creating book', book);

    this.books.push(book);
  }
}
