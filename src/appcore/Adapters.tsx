import * as React from 'react';
import { Menu as AppMenu, 
    // MenuItem as AppMenuItem, 
    MenuItemKind as AppMenuItemKind
} from './Menus';
import { 
    Menu, MenuItem, MenuDivider,
    Popover, Position, Icon 
} from '@blueprintjs/core';

export class MenuAdapter {
    adapt(menu: AppMenu) {
        // Convert to Menu system
        const items = menu.getItems().map((item, index) => {
            switch (item.kind) {
                case AppMenuItemKind.separator:
                    return <MenuDivider key={index}/>;
                case AppMenuItemKind.text:
                default:
                    const { text } = item;
                    return (<MenuItem key={index} text={text}/>);
            }
        });

        return (
            <Popover 
                className="main-menu"
                position={Position.BOTTOM}
                inheritDarkTheme={false}
                content={
                    <Menu className="pt-elevation-1">
                        {items}
                    </Menu>
                } 
                target={                    
                    <button className="pt-button pt-minimal pt-icon-document">
                        Menu
                        <Icon 
                            className="pt-align-right" 
                            iconName="caret-down" 
                        />                                
                    </button>
                } 
            />
        );
    }
}