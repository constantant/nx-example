import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibTwoComponent } from './lib-two.component';
import { DATA_SET, LibTreeService } from '@nx-example/lib-tree';
import { ItemComponent } from './item/item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([ { path: '', component: LibTwoComponent } ])
  ],
  exports: [ LibTwoComponent, ItemComponent ],
  declarations: [ LibTwoComponent, ItemComponent ]
})
export class LibTwoModule {
  static forRoot({ dataSet }: { dataSet: string[] }): ModuleWithProviders<LibTwoModule> {
    return {
      ngModule: LibTwoModule,
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
