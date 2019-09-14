import { NgModule} from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GamelistComponent } from './gameslist/gamelist.component';
import { CommentsComponent } from './comments/comments.component';
import { GamesdetailsComponent } from './gamesdetails/gamesdetails.component';

const ROUTES: Routes = [
    { path: '', component: GamelistComponent},
    { path: 'games', component: GamelistComponent },
    {path: 'game/:gameId', component:GamesdetailsComponent },
    { path: 'comments/:gameId', component: CommentsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class ApprouteModule {}