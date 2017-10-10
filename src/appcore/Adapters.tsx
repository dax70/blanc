import * as React from 'react';
import { Menu as AppMenu, 
    // MenuItem as AppMenuItem, 
    MenuItemKind as AppMenuItemKind
} from './Menus';
import { 
    Menu, MenuItem, MenuDivider 
} from '@blueprintjs/core';

export class MenuAdapter {
    adapt(menu: AppMenu) {
        // Convert to Menu system
        const items = menu.getItems().map(item => {
            switch (item.kind) {
                case AppMenuItemKind.separator:
                    return <MenuDivider />;
                case AppMenuItemKind.text:
                default:
                    return (<MenuItem {...item}/>);
            }
        });

        return (
            <Menu>
                {items}
            </Menu>
        );
    }
}