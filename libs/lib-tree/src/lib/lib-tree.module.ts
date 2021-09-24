import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LibTreeService } from './lib-tree.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class LibTreeModule {
  static forRoot(): ModuleWithProviders<LibTreeModule> {
    return {
      ngModule: LibTreeModule,
      providers: [ LibTreeService ]
    };
  }
}
