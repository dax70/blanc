import { IconName as BPIconName } from '@blueprintjs/core/dist/generated/iconName';

type ButtonEvent = {

};

// reference to the Blueprint Icons
export type IconName = BPIconName;

export interface ButtonProps {
  text: string;
  onClick?: (e: ButtonEvent) => void;
  iconName?: IconName;
}

export class Button {
  text: string;
  onClick?: (e: ButtonEvent) => void;
  iconName?: IconName;

  constructor(props: ButtonProps) {
    Object.assign(this, props);
  }
}