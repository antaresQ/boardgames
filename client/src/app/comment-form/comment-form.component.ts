import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment, GameBrief } from '../model';

import { ErrorStateMatcher } from '@angular/material/core'
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  addCommentForm: FormGroup;
  ratings: number[];
  newComment: Comment;
  refreshCounter: number = 0;
  message: string;
  gameId: number;



  constructor(readonly gameSvc: GamesService, readonly router: Router, readonly activatedRoute: ActivatedRoute,
    private formBuild: FormBuilder,  private toastr: ToastrService) { }




  ngOnInit() {

    this.ratings = Array(10).fill(0).map((x,i)=>i+1);

    this.addCommentForm = this.formBuild.group({
      user: ['', Validators.required],
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    })

    this.gameId = this.activatedRoute.snapshot.params.gameId;

    this.gameSvc.gameBrief(this.gameId)
    .then(result => {
      this.newComment = {
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


  onSubmit(formData: any,  formDirective: FormGroupDirective) {
    const formComment = this.addCommentForm.value;

    this.newComment.user = formComment.user;
    this.newComment.rating = formComment.rating;
    this.newComment.comment = formComment.comment;

    this.addCommentForm.reset();

    this.gameSvc.comment(this.newComment)
    .then(result => {
      this.message = result;
      // console.info('>> component success:' + result);
      formDirective.resetForm();
      this.addCommentForm.reset();
      this.refreshCount();
      this.showSuccess();
    })
    .catch( error => {
      console.error('>> component error:' + error)
    })



  }

  get user() {
    return this.addCommentForm.get('user');
  }

  get rating() {
    return this.addCommentForm.get('rating');
  }

  get comment() {
    return this.addCommentForm.get('comment');
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

}
