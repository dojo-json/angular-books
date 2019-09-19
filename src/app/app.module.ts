import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { BookResolver } from './resolvers';

import * as fromBooks from './books';

@NgModule({
  declarations: [AppComponent, ...fromBooks.components, NavComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [BookResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
