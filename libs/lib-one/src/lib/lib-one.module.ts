import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibOneComponent } from './lib-one.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: LibOneComponent } ]),
  ],
  declarations: [
    LibOneComponent
  ]
})
export class LibOneModule {}
