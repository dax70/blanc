export type IteratorResult<T> = {
  done: boolean;
  value?: T;
};

export type Iterator<T> = {
  next(value?: {}): IteratorResult<T>;
  // return?(value?: {}): IteratorResult<T>;
  // throw?(e?: {}): IteratorResult<T>;
};

export type Iterable<T>  = {
  [Symbol.iterator](): Iterator<T>;
};

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

export class ArrayIterator<T> implements Iterator<T> {
  arr: Array<T>;
  index: number;

  constructor (arr: Array<T>) {
    this.arr = arr;
    this.index = 0;
  }

  next(): IteratorResult<T> {
    const { length } = this.arr;

    if (this.index < length) {
      const value = this.arr[this.index++];
      return { value: value, done: false };
    }

    return { done: true };
  }
}

type Predicate<T> = (i?: T) => boolean;
type Selector<T, K> = (i?: T) => K;

export class FilterIterator<T> implements Iterator<T> {
  iterator: Iterator<T>;
  predicate: Predicate<T>;

  constructor (iterator: Iterator<T>, predicate: Predicate<T>) {
    this.iterator = iterator;
    this.predicate = predicate;
  }

  next () {
    const{ iterator, predicate } = this;
    let result = iterator.next();

    while (!result.done) {
      if (predicate(result.value)) {
        return result;
      }

      result = iterator.next();
    }

    return result;
  }
}

export class MapIterator<T, K> implements Iterator<K> {
  iterator: Iterator<T>;
  selector: Selector<T, K>;

  constructor (iterator: Iterator<T>, selector: Selector<T, K>) {
    this.iterator = iterator;
    this.selector = selector;
  }

  next () {
    const { iterator, selector } = this;
    let result = iterator.next();

    while (!result.done) {
      return { value: selector(result.value), done: false };
    }

    return { done: true };
  }
}

// TODO: Revisit Reducer
// type Accumulator<T, K> = (prev: K, current: T, index: number) => K;

// export class ReduceIterator<T, K> implements Iterator<K> {
//   index: number = 0;
//   previousValue?: K;
//   iterator: Iterator<T>;
//   combinator: Accumulator<T, K>;
  
//   constructor(iterator: Iterator<T>, combinator: Accumulator<T, K>) {
//     this.iterator = iterator;
//     this.combinator = combinator;
//   }

//   next () {
//     const { iterator, combinator } = this;

//     if (this.index === 0) {
//       let firstResult = iterator.next();
//       this.previousValue = firstResult.value;
//       this.index++;
//     }

//     let result = iterator.next();

//     while (!result.done) {
//       // previous, current, index
//       this.previousValue = combinator(this.previousValue, result.value, this.index++);
//       return { value: this.previousValue, done: false };
//     }

//     return { value: this.previousValue, done: true };
//   }
// }