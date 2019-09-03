import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';


const MODULES = [
    MatToolbarModule
  ];


@NgModule({
    imports: MODULES,
    exports: MODULES
})

export class MaterialModule {}