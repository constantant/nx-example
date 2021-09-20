import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LibOneModule } from '@nx-example/lib-one';
import { RouterModule } from '@angular/router';
import { LibTreeModule } from '@nx-example/lib-tree';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    LibTreeModule.forRoot([ 'one', 'two' ]),
    RouterModule.forRoot([ { path: '', loadChildren: () => LibOneModule } ])
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
