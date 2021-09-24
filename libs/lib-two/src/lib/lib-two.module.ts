import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LibTreeService } from '@nx-example/lib-tree';
import { LibTwoComponent } from './lib-two.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: LibTwoComponent } ]),
    HttpClientModule
  ],
  exports: [ LibTwoComponent, ItemComponent ],
  declarations: [ LibTwoComponent, ItemComponent ]
})
export class LibTwoModule {
  static forRoot(): ModuleWithProviders<LibTwoModule> {
    return {
      ngModule: LibTwoModule,
      providers: [ LibTreeService ]
    };
  }
}
