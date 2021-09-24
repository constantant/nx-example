import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LibTreeModule } from '@nx-example/lib-tree';
import { LibOneModule } from '@nx-example/lib-one';
import { dataSourceModules } from '../data-sources/data-source';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    LibTreeModule.forRoot(),
    RouterModule.forRoot(
      [
        { path: '', loadChildren: () => LibOneModule },
        { path: 'two', loadChildren: () => import('@nx-example/lib-two').then(m => m.LibTwoModule) }
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    ...dataSourceModules
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
