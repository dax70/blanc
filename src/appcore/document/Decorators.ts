import { DocumentComponent } from './Components';

export enum CardDepth {
  zero,
  one,
  two,
  three,
  four
}

export interface Card extends DocumentComponent { 
  depth: CardDepth;
}