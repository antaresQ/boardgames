import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GamesList } from '../model';


@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  constructor(readonly gameSvc: GamesService, readonly router:Router,) { }

  gamesList: GamesList ={ games: [] , timestamp:'' }

  ngOnInit() {

    this.gameSvc.gamesList()
    .then(result => {
      this.gamesList = result;
      console.log(this.gamesList);
    })
    .catch(error =>{
      console.error('>> error:', error)
    })

    
  }

}
