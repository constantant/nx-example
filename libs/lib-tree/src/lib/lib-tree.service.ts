import { Inject, Injectable } from '@angular/core';
import { DATA_SET } from './lib-tree.token';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LibTreeService {

  private store: BehaviorSubject<string[]> = new BehaviorSubject(this.dataSet);
  data: Observable<string[]> = this.store.asObservable();

  constructor(@Inject(DATA_SET) private readonly dataSet: string[]) {}

  add(data: string): void {
    this.store.next([ ...this.store.getValue(), data ]);
  }

  update(index: number, data: string): void {
    const arr = this.store.getValue();
    arr.splice(index, 1, data);
    this.store.next(arr);
  }

  remove(index: number): void {
    const arr = this.store.getValue();
    arr.splice(index, 1);
    this.store.next(arr);
  }
}
