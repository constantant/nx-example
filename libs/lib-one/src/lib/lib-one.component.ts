import { Component } from '@angular/core';
import { LibTreeService } from '@nx-example/lib-tree';

@Component({
  selector: 'nx-example-lib-one',
  templateUrl: './lib-one.component.html',
  styleUrls: [ './lib-one.component.css' ]
})
export class LibOneComponent {
  constructor(public readonly libTreeService: LibTreeService) {}
}
