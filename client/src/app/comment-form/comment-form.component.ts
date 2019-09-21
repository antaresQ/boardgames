import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment, GameBrief } from '../model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

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
    user: 'Apple',
    rating: null,
    comment: '',
    ID: null ,
    name: ''
  };

  submitted = false;

  constructor(readonly gameSvc: GamesService, readonly router: Router, readonly activatedRoute: ActivatedRoute) { }

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

    console.info(this.ratings)
  }

  onSubmit() { this.submitted = true; 
    const comment = this.model;
    this.gameSvc.comment(comment)
    .then(result => {
      this.message = result;
      console.info('>> component success:' + result);
      this.ngOnInit();
    })
    .catch( error => {
      console.error('>> component error:' + error)
    })
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
