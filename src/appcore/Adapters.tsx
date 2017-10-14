import * as React from 'react';
import {
  Dropdown as AppDrowndown,
  Menu as AppMenu,
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
      return <MenuDivider key={index} />;
    case AppMenuItemKind.text:
    default:
      const { text, iconName } = item;
      return (<MenuItem key={index} text={text} iconName={iconName} />);
  }
}

export interface DropdownProps {
  dropdown: AppDrowndown;
}

export interface MenuAdapterProps {
  menu?: AppMenu;
}

export class DropdownAdapter extends React.Component<DropdownProps, {}> {
  constructor(props: DropdownProps) {
    super(props);
  }

  render() {
    const { dropdown } = this.props;
    return (
      <Popover
        className="main-menu"
        position={Position.BOTTOM}
        inheritDarkTheme={false}
        content={<MenuAdapter menu={dropdown.menu} />}
        target={
          <button className="pt-button pt-minimal pt-icon-document">
            {dropdown.text}
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

export class MenuAdapter extends React.Component<MenuAdapterProps, {}> {
  constructor(props: MenuAdapterProps) {
    super(props);
  }

  render() {
    // Convert to Menu system
    const { menu } = this.props;
    const items = menu ? menu.getItems().map(convertItem) : null;
    return (
      <Menu className="pt-elevation-1">
        {items}
      </Menu>
    );
  }
}