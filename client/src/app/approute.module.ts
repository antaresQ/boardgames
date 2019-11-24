import { NgModule} from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GamelistComponent } from './gameslist/gamelist.component';
import { CommentsComponent } from './comments/comments.component';
import { GamesdetailsComponent } from './gamesdetails/gamesdetails.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { GamessearchComponent } from './gamessearch/gamessearch.component';

const ROUTES: Routes = [
    { path: '', component: GamelistComponent},
    { path: 'games', component: GamelistComponent },
    { path: 'game/:gameId', component:GamesdetailsComponent },
    { path: 'comment/:gameId', component: CommentFormComponent},
    { path: 'comments/:gameId', component: CommentsComponent},
    { path: 'gamessearch', component: GamessearchComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class ApprouteModule {}
