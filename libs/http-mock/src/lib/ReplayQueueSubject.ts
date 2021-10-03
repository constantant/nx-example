import { ReplaySubject, Subscriber, Subscription } from 'rxjs';

/**
 * @class ReplayQueueSubject<T>
 */
export class ReplayQueueSubject<T> extends ReplaySubject<T> {
  /** @deprecated This is an internal implementation detail, do not use. */
  _subscribe(subscriber: Subscriber<T>): Subscription {
    const subscription = super._subscribe(subscriber);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._events.shift();
    return subscription;
  }
}
