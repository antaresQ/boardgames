import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';


const MODULES = [
    MatToolbarModule,
    MatListModule
  ];


@NgModule({
    imports: MODULES,
    exports: MODULES
})

export class MaterialModule {}