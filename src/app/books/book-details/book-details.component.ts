import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { BookService } from '../../services';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  @Input()
  book: Book;

  errorMessage: string;

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('book_id')),
        switchMap(id => this.bookService.getBook(id))
      )
      .subscribe({
        next: book => {
          console.log('got book', book);
          this.book = book;
        },
        error: error => {
          console.log('error', error);

          this.errorMessage =
            error.status === 404
              ? 'The requested book was not found!'
              : 'An error occured while retrieving your book';
        },
      });

    // this.route.paramMap.subscribe(params => {
    //   console.log(params.get('book_id'));
    //   const id = params.get('book_id');

    //   this.bookService.getBook(id).subscribe(book => {
    //     console.log('got book?', book);
    //     this.book = book;
    //   });
    // });
  }
}
