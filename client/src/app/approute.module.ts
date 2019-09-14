import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GamelistComponent } from './gameslist/gamelist.component';
import { CommentsComponent } from './comments/comments.component';

const ROUTES: Routes = [
    { path: 'games', component: GamelistComponent },
    { path: 'comments/:gameId', component: CommentsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class ApprouteModule {}