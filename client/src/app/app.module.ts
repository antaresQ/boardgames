import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamelistComponent } from './components/gamelist.component';
import { ApprouteModule } from './approute.module';

@NgModule({
  declarations: [
    AppComponent,
    GamelistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule, ApprouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
