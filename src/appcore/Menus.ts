export enum MenuItemKind {
    text,
    textIcon,
    icon,
    separator
}

type MenuEvent = {

};

// eslint-disable-next-line
export type MenuItemProps = {
    kind?: MenuItemKind;   
    text: string;
    click?: (e: MenuEvent) => void;
    items: Array<MenuItemProps>;
};

export class MenuItem {
    kind: MenuItemKind;   
    text: string;
    click?: (e: MenuEvent) => void;
    items?: Array<MenuItem>;

    constructor(props: MenuItemProps) {
        const { text, kind, click, items } = props;
        this.text = text;
        this.kind = kind || MenuItemKind.text;
        this.click = click;
        this.items = items ? items.map((i) => new MenuItem(i)) : undefined;
    }
    
}

export class Menu {

    private items: Array<IMenuItem>;

    constructor() {
        this.items = new Array<IMenuItem>();
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
