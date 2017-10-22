import { Observer, Subject } from 'rxjs';

// Simplified Subscription
interface Subscription {
  unsubscribe(): void;
}

export {
  Observer,
  Subject,
  Subscription
};