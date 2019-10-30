import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router, ActivatedRoute } from '@angular/router';
import {} from '../model';

@Component({
  selector: 'app-gamesdetails',
  templateUrl: './gamesdetails.component.html',
  styleUrls: ['./gamesdetails.component.css']
})
export class GamesdetailsComponent implements OnInit {

  constructor(readonly gameSvc: GamesService, readonly router:Router,) { }



  ngOnInit() {
  }

}
