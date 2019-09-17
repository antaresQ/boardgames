import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from '../model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  ratings: number[] = Array(10).fill(0).map((x,i)=>i);

  model: Comment = {
    user:"Someguy",
    rating:this.ratings[0],
    comment:'test',
    ID: null,
    name:''
  }

  submitted = false;

  onSubmit() { this.submitted = true; }


  ngOnInit() {}

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
