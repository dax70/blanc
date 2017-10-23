import { Observer, Subject } from 'rxjs';

type EventHandler<T> = (t: T) => void | Observer<T>;

type IndexedArgs<T> = {
  index: number, 
  item: T
};

// Simplified Subscription
type Subscription = {
  unsubscribe(): void;
};

export {
  EventHandler,
  IndexedArgs,
  Observer,
  Subject,
  Subscription
};