import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { MaterialModule } from './material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamelistComponent } from './gameslist/gamelist.component';
import { ApprouteModule } from './approute.module';

import { GamesService } from './games.service';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from './comments/comments.component';
import { GamesdetailsComponent } from './gamesdetails/gamesdetails.component';
import { CommentFormComponent } from './comment-form/comment-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    GamelistComponent,
    CommentFormComponent,
    CommentsComponent,
    GamesdetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, ApprouteModule,
    FormsModule, ReactiveFormsModule,
    BrowserAnimationsModule, 
    MaterialModule, MatButtonModule, MatCheckboxModule
  ],
  providers: [ GamesService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
