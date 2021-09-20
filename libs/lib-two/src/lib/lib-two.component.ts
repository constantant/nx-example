import { Component } from '@angular/core';
import { LibTreeService } from '@nx-example/lib-tree';

@Component({
  selector: 'nx-example-lib-two',
  templateUrl: './lib-two.component.html',
  styleUrls: ['./lib-two.component.css']
})
export class LibTwoComponent {
  constructor(public readonly libTreeService: LibTreeService) {}
}
