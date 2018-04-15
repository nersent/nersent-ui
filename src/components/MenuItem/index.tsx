import * as React from "react";

import { StyledMenuItem, Title } from "./styles";
import Ripples from "../Ripples";
import colors from "../../defaults/colors";
import { getEvents } from "../../utils/events";
import { getRippleEvents } from "../../utils/ripple";
import Menu from "../Menu";

export type ButtonEvent = (e?: React.SyntheticEvent<HTMLDivElement>) => void;

export interface IProps {
  rippleColor?: string;
  customRippleBehavior?: boolean;
  onClick?: ButtonEvent;
  onMouseDown?: ButtonEvent;
  onMouseUp?: ButtonEvent;
  onMouseLeave?: ButtonEvent;
  onMouseEnter?: ButtonEvent;
  onTouchStart?: ButtonEvent;
  onTouchEnd?: ButtonEvent;
  ripple?: boolean;
  menu?: Menu;
  i?: number;
  visible?: boolean;
}

export interface IState {
  visible: boolean;
}

export default class MenuItem extends React.Component<IProps, IState> {
  static defaultProps = {
    rippleColor: colors.black,
    ripple: true
  };

  public state = {
    visible: false
  };

  private ripples: Ripples;
  private timeout: any;

  public componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.visible && !this.props.visible) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.setState({ visible: true });
      }, nextProps.i * 25);
    } else if (!nextProps.visible) {
      clearTimeout(this.timeout);
      this.setState({ visible: false });
    }
  }

  public onClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    this.props.menu.toggle(false);

    if (typeof this.props.onClick === "function") {
      this.props.onClick(e);
    }
  };

  public render() {
    const { rippleColor } = this.props;
    const { visible } = this.state;

    const events = {
      ...getEvents(this.props),
      ...getRippleEvents(this.props, () => this.ripples),
      onClick: this.onClick
    };

    return (
      <StyledMenuItem visible={visible} {...events}>
        <Title>{this.props.children}</Title>
        <Ripples
          ref={r => (this.ripples = r)}
          initialOpacity={0.1}
          color={rippleColor}
        />
      </StyledMenuItem>
    );
  }
}
