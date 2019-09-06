import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

import { GamesList, GamesName } from './model';

@Injectable()
export class GamesService {


    constructor(readonly http:HttpClient) {}

    gameslist(): Promise<GamesList> {
        return (
            this.http.get<GamesName[]>('games')
            .toPromise()
            .then(result => {
                return (<GamesList>{
                    games:result
                });
            })
        )
    }



}