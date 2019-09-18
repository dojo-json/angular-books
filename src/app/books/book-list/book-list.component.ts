import { Component, OnInit } from '@angular/core';

import { BOOKS } from '../../data/book-data';
import { Book } from '../../models/book';
import { BookService } from '../../services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  selectedBook: Book;
  books: Book[] = [];

  constructor(private readonly bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

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
    this.bookService.createBook(book).subscribe(createdBook => {
      // this.books.push(createdBook);
      // console.log('created', createdBook);
      this.books = [...this.books, createdBook];
    });
  }

  onDelete(id: number) {
    this.bookService.removeBook(id).subscribe(deletedBook => {
      console.log('deleted book', deletedBook);

      this.books = this.books.filter(book => book.id !== deletedBook.id);
    });
  }
}
