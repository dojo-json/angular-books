import { Component, OnInit } from '@angular/core';

import { Book } from '../../models';
import { BookService } from 'src/app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent implements OnInit {
  book: Book;

  constructor(
    private readonly bookService: BookService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map(params => params.get('book_id')),
        switchMap(id => this.bookService.getBook(id))
      )
      .subscribe({
        next: book => (this.book = book),
        error: error => {
          console.log(error);
        },
      });
  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    // const book = form.value;
    const { value: book }: { value: Book } = form;

    this.bookService.updateBook(book).subscribe(updatedBook => {
      console.log('updated book', updatedBook);

      this.router.navigate(['/books', updatedBook._id]);
    });
  }
}
