import { ButtonProps } from './Core';

export enum MenuItemKind {
    text,
    textIcon,
    icon,
    separator
}

type MenuEvent = {

};

export interface MenuItemProps extends ButtonProps {
    kind?: MenuItemKind;   
    items?: Array<MenuItemProps>;
}

export class MenuItem {
    kind: MenuItemKind;   
    text: string;
    iconName?: string;
    click?: (e: MenuEvent) => void;
    items?: Array<MenuItem>;

    constructor(props: MenuItemProps) {
        const { text, iconName, kind, click, items } = props;
        this.text = text;
        this.iconName = iconName;
        this.kind = kind || MenuItemKind.text;
        this.click = click;
        this.items = items ? items.map((i) => new MenuItem(i)) : undefined;
    }
    
}

export class Menu {

    private items: Array<MenuItem>;

    constructor() {
        this.items = new Array<MenuItem>();
    }

    append(menuItem: MenuItem) {
        this.items.push(menuItem);
    }

    appendDivider() {
        const separator = { 
            text: 'sep',
            kind: MenuItemKind.separator
        };
        this.items.push(separator);
    }

    getItems() {
        return this.items;
    }
}
