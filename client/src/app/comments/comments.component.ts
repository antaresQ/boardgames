import { Component, OnInit, ViewChild } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentsList } from '../model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  displayedColumns: string[] = ['user', 'rating', 'comment'];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  commentsList: CommentsList;

  constructor(readonly gamesSvc: GamesService, readonly router: Router, readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const gameId = this.activatedRoute.snapshot.params.gameId;
    this.gamesSvc.commentsList(gameId)
    .then(result => {
      this.dataSource = new MatTableDataSource(result.comments.reverse());
      this.dataSource.paginator = this.paginator;
      console.info('result >>', result);
      console.info('commentsList >>', this.commentsList);
      console.info('commentsList >>', this.dataSource);
    })
    .catch(error =>{
      console.error('>> error:', error)
    })
    
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
