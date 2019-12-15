import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GamesList, GameBrief } from '../model';
import { isEmpty } from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-gamessearch',
  templateUrl: './gamessearch.component.html',
  styleUrls: ['./gamessearch.component.css']
})
export class GamessearchComponent implements OnChanges {

  constructor(readonly gameSvc: GamesService, readonly router:Router) { }

  @Input() searchText: string;

  gamesList: GamesList; //={ games: GameBrief[] , timestamp:'' }
  games: GameBrief[];
  gamesToDisplay: GameBrief[];

  // search(games: GameBrief[]): GameBrief[] {

  // }




  ngOnChanges(changes: SimpleChanges) {


    // console.log('ngOnChanges Hit');
    // // tslint:disable-next-line: forin
    // for (let propName in changes) {
    //   let change = changes[propName];
    //   let curVal  = JSON.stringify(change.currentValue);
    //   let prevVal = JSON.stringify(change.previousValue);

    //   console.log(curVal);
    //   console.log(prevVal);
    // }

        //  if (!this.searchText) {
        //   console.log('if hit');
        //   this.gamesToDisplay = this.games;
        // } else if (this.searchText) {
        //   console.log('else if hit')
        //   this.searchText = this.searchText.toString().toLowerCase();
        //   console.log(this.games);
        //   this.gamesToDisplay = this.games.filter(game =>
        //     game.Name.toString().toLowerCase().match('%' + this.searchText + '%'));
        // } else {
        //   console.log('else hit');
        //   this.gamesToDisplay = this.games;
        // }

  }

  ngOnInit() {
    const gamesListObservable = this.gameSvc.gamesList();
    gamesListObservable.subscribe((gamesData: GameBrief[]) => {
      this.games = gamesData;
      this.gamesToDisplay = gamesData;
    });

    // this.gameSvc.gamesList()
    // .then(result => {
    //   this.games = result.games;
    //   console.log(this.games);
    //   console.log('gameservice working');
    //   this.gamesToDisplay = this.games.slice(0, 20);
    // })
    // .catch(error =>{
    //   console.error('>> error:', error);
    // });
  }

  onChanges() {
    const gameName = this.searchText.toString();
    console.log('searchText: ', this.searchText);
    console.log('gameName: ', gameName);
    if ( gameName === '' || gameName === null ) {
      this.gamesToDisplay = this.games;
    } else if (gameName != null) {
      this.gamesToDisplay = this.games.filter(game => game.Name === gameName);
      //this.gamesToDisplay = this.filterGames(this.games, this.searchText);
    } else {
      this.gamesToDisplay = this.games;
    }
    console.log('games', this.games);
    console.log('gamesToDisplay', this.gamesToDisplay);
  }

  filterGames = (games: GameBrief[], searchText: string) => {
    return games.filter(game => game.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }

}
