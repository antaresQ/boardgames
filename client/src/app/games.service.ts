import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { GamesList, GamesName } from './model';

@Injectable()
export class GamesService {


    constructor(readonly http:HttpClient) {}

    gamesList(): Promise<GamesList> {
        return (
            this.http.get<GamesName[]>('/api/games')
            .toPromise()
            .then(result => {
                
                return (<GamesList>{
                    games:result,
                    timestamp: (new Date()).toUTCString()
                });
            })
        )
    }



}