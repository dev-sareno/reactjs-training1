import React from "react";
import { Menu } from "@fluentui/react-northstar";

interface IState {

}

export class AppMenu extends React.Component {
  state: IState = {

  }

  constructor(props: any) {
    super(props);
  }

  render() {
    const items = [
      {
        key: 'shoes',
        content: 'Shoes',
      },
      {
        key: 'about',
        content: 'About',
      },
      {
        key: 'logout',
        content: 'Logout',
      }
    ];
    return (
      <Menu items={items} primary defaultActiveIndex={0} />
    );
  }
}
