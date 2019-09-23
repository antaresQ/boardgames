import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment, GameBrief } from '../model';

import { ErrorStateMatcher } from '@angular/material/core'
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

export class CommentFormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  refreshCounter : number = 0;

  game: GameBrief = {
    ID: null ,
    name: '',
    year: null,
    rank: null,
    average: null,
    bayesAverage: null,
    usersRated: null,
    url: null,
    thumbnail: null
  };

  ratings: number[]; 
  
  message: string;

  model: Comment = {
    _id: '',
    unknown: null,
    user: '',
    rating: null,
    comment: '',
    ID: null ,
    name: ''
  };

  userFormControl = new FormControl('', [
    Validators.required
  ]);
  ratingFormControl = new FormControl('', [
    Validators.required
  ]);
  commentFormControl = new FormControl('', [
    Validators.required
  ]);

  userMatcher = new CommentFormErrorStateMatcher();
  ratingMatcher = new CommentFormErrorStateMatcher();
  commentMatcher = new CommentFormErrorStateMatcher();

  submitted = false;

  constructor(readonly gameSvc: GamesService, readonly router: Router, readonly activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.ratings = Array(10).fill(0).map((x,i)=>i+1);
    
    const gameId = this.activatedRoute.snapshot.params.gameId;
    this.gameSvc.gameBrief(gameId)
    .then(result => {
      this.model = {
        user: '',
        rating: null,
        comment: '',
        ID: result[0].ID ,
        name: result[0].Name
      }
    })
    .catch( error => {
      console.error('>> error', error)
    })

  }

  onSubmit() { this.submitted = true; 
    const comment = this.model;
    this.gameSvc.comment(comment)
    .then(result => {
      this.message = result;
      console.info('>> component success:' + result);
      this.refreshCount();
      this.ngOnInit();
      this.showSuccess();
    })
    .catch( error => {
      console.error('>> component error:' + error)
    })

  }


  refreshCount() {
    this.refreshCounter++;
    // console.log('COUNTER: ', this.refreshCounter);
  }

  
  showSuccess() {
    this.toastr.success("Comment submitted", 'Success!', {
      timeOut: 90000
    });
  }

  // comment: Comment;
  // message: string;

  // constructor(readonly gameSvc: GamesService, readonly router: Router, readonly activatedRoute: ActivatedRoute) { }

  // ngOnInit() {
  //   const comment = this.activatedRoute.snapshot.params.comment;
  //   this.gameSvc.comment(comment)
  //   .then(result => {
  //     this.message = result
  //     console.log(result);
  //   })
  //   .catch( error => {
  //     console.error('>> error:', error)
  //   })
  // }

}
