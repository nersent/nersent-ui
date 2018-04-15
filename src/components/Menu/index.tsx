import * as React from "react";

import { StyledMenu } from "./styles";
import { getEvents } from "../../utils/events";
import MenuItem from "../MenuItem";
import MenuSeparator from "../MenuSeparator";

export type ButtonEvent = (e?: React.SyntheticEvent<HTMLDivElement>) => void;

export interface IProps {
  visible?: boolean;
  large?: boolean;
  onClick?: ButtonEvent;
  onMouseDown?: ButtonEvent;
  onMouseUp?: ButtonEvent;
  onMouseLeave?: ButtonEvent;
  onMouseEnter?: ButtonEvent;
  style?: any;
  className?: string;
}

export interface IState {
  visible: boolean;
}

export default class Menu extends React.Component<IProps, IState> {
  public static Item = MenuItem;
  public static Separator = MenuSeparator;

  public state: IState = {
    visible: false
  };

  private menu: HTMLDivElement;
  private height: number;

  public componentWillReceiveProps(nextProps: IProps) {
    this.toggle(nextProps.visible);
  }

  public toggle(flag: boolean) {
    if (flag) {
      this.menu.style.transition = "0.2s opacity, 0.2s margin-top";
      requestAnimationFrame(() => {
        this.menu.style.height = `0px`;
        requestAnimationFrame(() => {
          this.menu.style.transition =
            "0.2s opacity, 0.2s height, 0.2s margin-top";
          this.height = this.menu.scrollHeight;
          this.menu.style.height = `${this.height}px`;
        });
      });
    } else {
      this.menu.style.transition = "0.2s opacity, 0.2s margin-top";
    }
    this.setState({ visible: flag });
  }

  public updateHeight() {
    if (this.state.visible) {
      requestAnimationFrame(() => {
        this.menu.style.transition =
          "0.2s opacity, 0.2s height, 0.2s margin-top";
        this.height = this.menu.scrollHeight;
        this.menu.style.height = `${this.height}px`;
      });
    }
  }

  public getHeight() {
    return this.height;
  }

  public render() {
    const { visible } = this.state;
    const { large, style, className } = this.props;

    let i = 1;

    const events = {
      ...getEvents(this.props)
    };

    return (
      <StyledMenu
        innerRef={r => (this.menu = r)}
        large={large}
        visible={visible}
        style={{ ...style }}
        className={className}
        {...events}
      >
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child as React.ReactElement<any>, {
            menu: this,
            i: i++,
            visible
          })
        )}
      </StyledMenu>
    );
  }
}
