import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { LibTreeService } from '@nx-example/lib-tree';
import { LibOneComponent } from './lib-one.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: LibOneComponent } ]),
    HttpClientModule
  ],
  exports: [ LibOneComponent ],
  declarations: [ LibOneComponent ]
})
export class LibOneModule {
  static forRoot(): ModuleWithProviders<LibOneModule> {
    return {
      ngModule: LibOneModule,
      providers: [ LibTreeService ]
    };
  }
}
