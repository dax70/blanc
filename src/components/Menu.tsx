import * as React from 'react';
import {
  Dropdown as AppDrowndown,
  Menu as AppMenu,
  MenuItem as AppMenuItem,
  MenuItemKind as AppMenuItemKind
} from '../appcore/Menu';
import {
  Menu as BpMenu, 
  MenuItem as BpMenuItem, 
  MenuDivider as BpMenuDivider,
  Popover, Position, Icon
} from '@blueprintjs/core';

export function convertItem(item: AppMenuItem, index: number) {
  switch (item.kind) {
    case AppMenuItemKind.separator:
      return <BpMenuDivider key={index} />;
    case AppMenuItemKind.text:
    default:
      const { text, iconName, onClick } = item;
      return (<BpMenuItem key={index} text={text} iconName={iconName} onClick={onClick}/>);
  }
}

export interface DropdownProps {
  dropdown: AppDrowndown;
}

export interface MenuProps {
  menu?: AppMenu;
}

export class Dropdown extends React.Component<DropdownProps, {}> {
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
        content={<Menu menu={dropdown.menu} />}
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

export class Menu extends React.Component<MenuProps, {}> {
  constructor(props: MenuProps) {
    super(props);
  }

  render() {
    // Convert to Menu system
    const { menu } = this.props;
    const items = menu ? menu.getItems().map(convertItem) : null;
    return (
      <BpMenu className="pt-elevation-1">
        {items}
      </BpMenu>
    );
  }
}