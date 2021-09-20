import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DATA_SET } from './lib-tree.token';
import { LibTreeService } from './lib-tree.service';

@NgModule({
  imports: [ CommonModule ]
})
export class LibTreeModule {
  static forRoot(dataSet: string[] = []): ModuleWithProviders<LibTreeModule> {
    return {
      ngModule: LibTreeModule,
      providers: [
        {
          provide: DATA_SET,
          useValue: dataSet
        },
        LibTreeService
      ]
    };
  }
}
