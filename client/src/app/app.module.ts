import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchbynameComponent } from './components/searchbyname.component';
import { SearchbycategoryComponent } from './components/searchbycategory.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchbynameComponent,
    SearchbycategoryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
