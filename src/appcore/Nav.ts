import { ButtonProps, Button } from './Core';
import { Menu } from './Menus';

export interface NavButtonProps extends ButtonProps {
    menu: Menu;
}

export class NavButton extends Button {

    menu: Menu;

    constructor(props: NavButtonProps) {
        super(props);
        this.menu = props.menu;
    }
}