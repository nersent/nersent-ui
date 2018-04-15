import * as React from 'react';

import { StyledMenuItem, Title } from './styles';
import Ripples from '../Ripples';
import colors from '../../defaults/colors';
import { getEvents } from '../../utils/events';
import { getRippleEvents } from '../../utils/ripple';
import Menu from '../Menu';

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
  hide?: boolean;
  disabled?: boolean;
  hideMenuOnClick?: boolean;
}

export interface IState {
  visible: boolean;
}

export default class MenuItem extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    rippleColor: colors.black,
    ripple: true,
    hideMenuOnClick: true,
  };

  public state: IState = {
    visible: false,
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
    const { menu, onClick, hideMenuOnClick } = this.props;
    if (hideMenuOnClick) {
      menu.toggle(false);
    }

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  public render() {
    const { rippleColor, hide, disabled } = this.props;
    const { visible } = this.state;

    const events = {
      ...getEvents(this.props),
      ...getRippleEvents(this.props, () => this.ripples),
      onClick: this.onClick,
    };

    return (
      <StyledMenuItem hide={hide} visible={visible} {...events}>
        <Title disabled={disabled}>{this.props.children}</Title>
        <Ripples ref={r => (this.ripples = r)} initialOpacity={0.1} color={rippleColor} />
      </StyledMenuItem>
    );
  }
}
