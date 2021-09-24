import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LibOneModule } from '@nx-example/lib-one';
import { dataSourceModules } from '../data-sources/data-source';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    LibOneModule.forRoot(),
    ...dataSourceModules
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
