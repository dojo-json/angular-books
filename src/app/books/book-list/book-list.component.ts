import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BOOKS } from '../../data/book-data';
import { Book } from '../../models/book';
import { BookService } from '../../services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  selectedBook: Book;
  books: Book[] = [];

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this retrieves the resolved data
    this.route.data
      .pipe(
        map(({ books }: { books: Book[] }) => books),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(books => {
        this.books = books;
      });
    // this.bookService.getBooks().subscribe(books => {
    //   this.books = books;
    // });
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
    this.bookService
      .createBook(book)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(createdBook => {
        // this.books.push(createdBook);
        // console.log('created', createdBook);
        this.books = [...this.books, createdBook];
      });
  }

  onDelete(id: string) {
    this.bookService
      .removeBook(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(deletedBook => {
        console.log('deleted book', deletedBook);

        this.books = this.books.filter(book => book._id !== deletedBook._id);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
