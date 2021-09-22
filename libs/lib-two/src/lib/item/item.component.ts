import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nx-example-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.css' ]
})
export class ItemComponent {
  @Output()
  delete = new EventEmitter();
}
