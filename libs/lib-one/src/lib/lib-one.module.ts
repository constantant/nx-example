import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibOneComponent } from './lib-one.component';
import { DATA_SET, LibTreeService } from '@nx-example/lib-tree';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: LibOneComponent } ])
  ],
  exports: [ LibOneComponent ],
  declarations: [ LibOneComponent ]
})
export class LibOneModule {
  static forRoot({ dataSet }: { dataSet: string[] }): ModuleWithProviders<LibOneModule> {
    return {
      ngModule: LibOneModule,
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
