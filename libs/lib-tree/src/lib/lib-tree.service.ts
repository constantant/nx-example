import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { concat, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class LibTreeService {

  private trigger: Subject<void> = new Subject();
  loading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  data: Observable<string[]> = concat(of(void 0), this.trigger).pipe(
    tap(() => this.loading.next(true)),
    switchMap(() => this.httpClient.get<string[]>(`@lib-tree-api/items`)),
    tap(() => this.loading.next(false)),
    shareReplay(1)
  );

  constructor(private readonly httpClient: HttpClient) {}

  add(data: string): Observable<unknown> {
    return this.httpClient.post(`@lib-tree-api/items`, data).pipe(
      tap(() => this.trigger.next())
    );
  }

  remove(index: number): Observable<unknown> {
    return this.httpClient.delete(`@lib-tree-api/items/${index}`).pipe(
      tap(() => this.trigger.next())
    );
  }
}
