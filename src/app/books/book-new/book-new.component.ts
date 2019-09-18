import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { BookService } from '../../services';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css'],
})
export class BookNewComponent implements OnInit {
  book = new Book();

  @Output()
  createBook = new EventEmitter<Book>();

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    // this.books.push(this.book);

    // this.createBook.emit(this.book);

    this.bookService.createBook(this.book).subscribe(creaetdBook => {
      console.log('created', creaetdBook);
      this.book = new Book();
      form.reset();

      // this.router.navigate(['/'])
      this.router.navigateByUrl('/');
    });

    // console.log('submitting', this.books);
  }
}
