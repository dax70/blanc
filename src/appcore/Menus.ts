export enum MenuItemKind {
    text,
    textIcon,
    icon,
    separator
}

type MenuEvent = {

};

export class MenuItem {
    kind: MenuItemKind;    
    text: string;
    click: (e: MenuEvent) => void;
}

export class Menu {

    private items: Array<MenuItem>;

    constructor() {
        this.items = new Array<MenuItem>();
    }

    append(menuItem: MenuItem) {
        this.items.push(menuItem);
    }

    getItems() {
        return this.items;
    }
}
