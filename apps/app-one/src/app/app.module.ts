import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LibOneModule } from '@nx-example/lib-one';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    LibOneModule.forRoot({ dataSet: [ 'one', 'two' ] })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
