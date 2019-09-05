import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GamelistComponent } from './components/gamelist.component';

const ROUTES: Routes = [
    { path: 'games', component: GamelistComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class ApprouteModule {}