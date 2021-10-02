import { ObjectUnsubscribedError, SchedulerLike, Subject, Subscriber, Subscription } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';
import { SubjectSubscription } from 'rxjs/src/internal/SubjectSubscription';
import { queueScheduler } from 'rxjs/src/internal/scheduler/queue';

/**
 * @class ReplayQueueSubject<T>
 */
export class ReplayQueueSubject<T> extends Subject<T> {
  private _events: (ReplayEvent<T> | T)[] = [];
  private readonly _bufferSize: number;
  private readonly _windowTime: number;
  private readonly _infiniteTimeWindow: boolean;

  constructor(bufferSize: number = Number.POSITIVE_INFINITY,
              windowTime: number = Number.POSITIVE_INFINITY,
              private scheduler?: SchedulerLike) {
    super();
    this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
    this._windowTime = windowTime < 1 ? 1 : windowTime;

    if (windowTime === Number.POSITIVE_INFINITY) {
      this._infiniteTimeWindow = true;
      this.next = this.nextInfiniteTimeWindow;
    } else {
      this._infiniteTimeWindow = false;
      this.next = this.nextTimeWindow;
    }
  }

  private nextInfiniteTimeWindow(value: T): void {
    if (!this.isStopped) {
      const _events = this._events;
      _events.push(value);
      // Since this method is invoked in every next() call than the buffer
      // can overgrow the max size only by one item
      if (_events.length > this._bufferSize) {
        _events.shift();
      }
    }
    super.next(value);
  }

  private nextTimeWindow(value: T): void {
    if (!this.isStopped) {
      this._events.push(new ReplayEvent(this._getNow(), value));
      this._trimBufferThenGetEvents();
    }
    super.next(value);
  }

  /** @deprecated This is an internal implementation detail, do not use. */
  _subscribe(subscriber: Subscriber<T>): Subscription {
    // When `_infiniteTimeWindow === true` then the buffer is already trimmed
    const _infiniteTimeWindow = this._infiniteTimeWindow;
    const _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents();
    const scheduler = this.scheduler;
    const len = _events.length;
    let subscription: Subscription;

    if (this.closed) {
      throw new ObjectUnsubscribedError();
    } else if (this.isStopped || this.hasError) {
      subscription = Subscription.EMPTY;
    } else {
      this.observers.push(subscriber);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      subscription = new SubjectSubscription(this, subscriber);
    }

    if (scheduler) {
      subscriber.add(subscriber = new ObserveOnSubscriber<T>(subscriber, scheduler));
    }

    if (_infiniteTimeWindow) {
      for (let i = 0; i < len && !subscriber.closed; i++) {
        subscriber.next(<T>_events[ i ]);
      }
    } else {
      for (let i = 0; i < len && !subscriber.closed; i++) {
        subscriber.next((<ReplayEvent<T>>_events[ i ]).value);
      }
    }

    if (this.hasError) {
      subscriber.error(this.thrownError);
    } else if (this.isStopped) {
      subscriber.complete();
    }

    _events.shift();
    return subscription;
  }

  _getNow(): number {
    return (this.scheduler || queueScheduler).now();
  }

  private _trimBufferThenGetEvents(): ReplayEvent<T>[] {
    const now = this._getNow();
    const _bufferSize = this._bufferSize;
    const _windowTime = this._windowTime;
    const _events = <ReplayEvent<T>[]>this._events;

    const eventsCount = _events.length;
    let spliceCount = 0;

    // Trim events that fall out of the time window.
    // Start at the front of the list. Break early once
    // we encounter an event that falls within the window.
    while (spliceCount < eventsCount) {
      if ((now - _events[ spliceCount ].time) < _windowTime) {
        break;
      }
      spliceCount++;
    }

    if (eventsCount > _bufferSize) {
      spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
    }

    if (spliceCount > 0) {
      _events.splice(0, spliceCount);
    }

    return _events;
  }

}

class ReplayEvent<T> {
  constructor(public time: number, public value: T) {}
}
