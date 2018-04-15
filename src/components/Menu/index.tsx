import * as React from "react";

import { StyledMenu } from "./styles";
import { getEvents } from "../../utils/events";

export type ButtonEvent = (e?: React.SyntheticEvent<HTMLDivElement>) => void;

export interface IProps {
  visible?: boolean;
  large?: boolean;
  onClick?: ButtonEvent;
  onMouseDown?: ButtonEvent;
  onMouseUp?: ButtonEvent;
  onMouseLeave?: ButtonEvent;
  onMouseEnter?: ButtonEvent;
}

export default class Menu extends React.Component<IProps, IProps> {
  static defaultProps = {
    visible: false
  };

  public state = {
    visible: false
  };

  private menu: HTMLDivElement;

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
          this.menu.style.height = `${this.menu.scrollHeight}px`;
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
        this.menu.style.height = `${this.menu.scrollHeight}px`;
      });
    }
  }

  public render() {
    const { visible } = this.state;
    const { large } = this.props;

    let i = 1;

    const events = {
      ...getEvents(this.props)
    };

    return (
      <StyledMenu
        innerRef={r => (this.menu = r)}
        large={large}
        visible={visible}
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
