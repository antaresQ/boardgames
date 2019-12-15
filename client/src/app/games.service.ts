import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { GamesList, GamesName, GameBrief, Comment, CommentsList } from './model';
import { reject } from 'q';

@Injectable()
export class GamesService {

  headers: Headers;
  options: HttpHeaders;

  httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(readonly http: HttpClient) {}

  getGamesList(): Promise<GamesList> {
    return (
      this.http.get<GameBrief[]>(`/api/games`)
      .toPromise()
      .then(result => {
        const g = {
            games: result,
            timestamp: (new Date()).toUTCString()
        } as GamesList;
        return(g);
      })
    );
  }

  gamesList() {
    return this.http.get<GameBrief[]>(`/api/games`);
  }

  gameBrief(gameId: number): Promise<GameBrief> {
      return (
          this.http.get<GameBrief>(`/api/gameBrief/${gameId}`)
          .toPromise()
          .then(result => {
              return (result);
          })
      );
  }

  commentsList(gameId: number): Promise<CommentsList> {
      return (
          this.http.get<Comment[]>(`/api/comments/${gameId}`)
          .toPromise()
          .then(result => {

              return ({
                  comments:result
              } as CommentsList);
          })
      )
  }

  comment(commentFromForm: any): Promise<any> {
      // let body = JSON.stringify(comment);
      const comment = {
          index: null,
          user: commentFromForm.user,
          rating: commentFromForm.rating,
          comment: commentFromForm.comment,
          ID: commentFromForm.ID,
          name: commentFromForm.name
      }
      return(
          this.http.post<any>('/api/addcomment', comment)
          .pipe(
              catchError(this.handleError)
          )
          .toPromise()
          .then(result => {
              console.info('>> service Success:' + result.data);
              return '>> service Success:' + result.data;
          })
          .catch(error => {
              console.info('service error' + error);
              return error;
          })
      )
  }

  private extractData(res: Response) {
      let body = res.json();
      return body || {};
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

}
