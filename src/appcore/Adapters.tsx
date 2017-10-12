import * as React from 'react';
import { Menu as AppMenu, 
    MenuItem as AppMenuItem, 
    MenuItemKind as AppMenuItemKind
} from './Menus';
import { 
    Menu, MenuItem, MenuDivider,
    Popover, Position, Icon 
} from '@blueprintjs/core';

export function convertItem(item: AppMenuItem, index: number) {
    switch (item.kind) {
        case AppMenuItemKind.separator:
            return <MenuDivider key={index}/>;
        case AppMenuItemKind.text:
        default:
            const { text } = item;
            return (<MenuItem key={index} text={text} />);
    }
}

export interface MenuAdapterProps {
    menu: AppMenu;
}

export class MenuAdapter extends React.Component<MenuAdapterProps, {}> {
    constructor(props: MenuAdapterProps) {
        super(props);
    }

    render() {
        // Convert to Menu system
        const { menu } = this.props;
        const items = menu.getItems().map(convertItem);
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