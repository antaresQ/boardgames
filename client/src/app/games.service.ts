import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'

import { GamesList, GamesName, GameBrief, Comment, CommentsList } from './model';
import { reject } from 'q';

@Injectable()
export class GamesService {

    headers: Headers;
    options: HttpHeaders;

    httpOptions ={
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(readonly http:HttpClient) {}

    gamesList(): Promise<GamesList> {
        return (
            this.http.get<GamesName[]>(`/api/games`)
            .toPromise()
            .then(result => {
                
                return (<GamesList>{
                    games:result,
                    timestamp: (new Date()).toUTCString()
                });
            })
        )
    }

    gameBrief(gameId: string): Promise<GameBrief> {
        return (
            this.http.get<GameBrief>(`/api/gameBrief/${gameId}`)
            .toPromise()
            .then(result => {
                return (result);
            })
        )
    }

    commentsList(gameId: string): Promise<CommentsList> {
        return (
            this.http.get<Comment[]>(`/api/comments/${gameId}`)
            .toPromise()
            .then(result => {
                
                return (<CommentsList>{
                    comments:result
                });
            })
        )
    }

    comment(comment: any): Promise<any> {
        //let body = JSON.stringify(comment);
        return(
            this.http.post<any>('/api/addcomment', comment)
            .pipe(
                catchError(this.handleError)
            )
            .toPromise()
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