import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentsList } from '../model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentsList: CommentsList;

  constructor(readonly gamesSvc: GamesService, readonly router: Router, readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const gameId = this.activatedRoute.snapshot.params.gameId;
    this.gamesSvc.commentsList(gameId)
    .then(result => {
      this.commentsList = result;
      console.info(result);
    })
    .catch(error =>{
      console.error('>> error:', error)
    })
  }

}
