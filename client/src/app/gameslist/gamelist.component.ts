import { Component, OnInit, Input } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GamesList, GameBrief } from '../model';

@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  constructor(readonly gameSvc: GamesService, readonly router:Router) { }

  @Input() gameBriefList;//={ games: GameBrief[] , timestamp:'' }

  ngOnInit() {

  }
}
