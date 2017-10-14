import * as React from 'react';
import { Menu, MenuItem, MenuDivider, Popover, Position, Icon } from '@blueprintjs/core';
import './Nav.css';

export default class Nav extends React.Component<{}, {}> {

  createMenu() {
    return (
      <Menu className="pt-elevation-1">
        <MenuItem
          iconName="new-text-box"
          onClick={this.handleClick}
          text="New text box"
        />
        <MenuItem
          iconName="new-object"
          onClick={this.handleClick}
          text="New object"
        />
        <MenuItem
          iconName="new-link"
          onClick={this.handleClick}
          text="New link"
        />
        <MenuDivider />
        <MenuItem text="Settings..." iconName="cog" />
      </Menu>
    );
  }
  render() {
    return (
      <nav className="pt-navbar pt-dark">
        <div className="pt-navbar-group pt-align-left">
          <div className="pt-navbar-heading">Blanc|Noir</div>
          <input className="pt-input" placeholder="Search files..." type="text" />
        </div>
        <div className="pt-navbar-group pt-align-right">
          <button className="pt-button pt-minimal pt-icon-home">
            Home
                        <Icon className="pt-align-right" iconName="caret-down" />
          </button>
          <Popover
            className="main-menu"
            position={Position.BOTTOM}
            inheritDarkTheme={false}
            content={this.createMenu()}
            target={
              <button className="pt-button pt-minimal pt-icon-document">
                Files
                <Icon className="pt-align-right" iconName="caret-down" />
              </button>
            }
          />
          <span className="pt-navbar-divider" />
          <button className="pt-button pt-minimal pt-icon-user" />
          <button className="pt-button pt-minimal pt-icon-notifications" />
          <button className="pt-button pt-minimal pt-icon-cog" />
        </div>
      </nav>
    );
  }

  private handleClick(e: React.MouseEvent<{}>) {
    // tslint:disable-next-line:no-console
    console.log('clicked', (e.target as HTMLElement).textContent);
  }
}