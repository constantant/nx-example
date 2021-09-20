import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibTwoComponent } from './lib-two.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: LibTwoComponent } ])
  ],
  declarations: [
    LibTwoComponent
  ]
})
export class LibTwoModule {}
