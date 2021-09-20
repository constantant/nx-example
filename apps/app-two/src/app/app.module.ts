import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LibTreeModule } from '@nx-example/lib-tree';
import { LibOneModule } from '@nx-example/lib-one';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    LibTreeModule.forRoot([ 'one', 'two', 'three', 'four' ]),
    RouterModule.forRoot(
      [
        { path: '', loadChildren: () => LibOneModule },
        { path: 'two', loadChildren: () => import('@nx-example/lib-two').then(m => m.LibTwoModule) }
      ],
      { initialNavigation: 'enabledBlocking' }
    )
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
