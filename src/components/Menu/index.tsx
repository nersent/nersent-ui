import * as React from 'react';

import { StyledMenu } from './styles';
import { getEvents } from '../../utils/events';
import MenuItem from '../MenuItem';
import MenuSeparator from '../MenuSeparator';

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
  height: number;
  heightTransition: boolean;
}

export default class Menu extends React.Component<IProps, IState> {
  public static Item = MenuItem;
  public static Separator = MenuSeparator;

  public state: IState = {
    visible: false,
    heightTransition: false,
    height: 0,
  };

  private menu: HTMLDivElement;
  private height: number;

  public componentWillReceiveProps(nextProps: IProps) {
    this.toggle(nextProps.visible);
  }

  public toggle(flag: boolean) {
    if (flag === this.state.visible) return;
    this.setState({ visible: flag });

    if (flag) {
      this.setState({ heightTransition: false });
      requestAnimationFrame(() => {
        this.setState({ height: 0 });
        this.updateHeight();
      });
    } else {
      this.setState({ heightTransition: false });
    }
  }

  public updateHeight() {
    if (this.state.visible) {
      requestAnimationFrame(() => {
        this.height = this.menu.scrollHeight;
        this.setState({ heightTransition: true, height: this.height });
      });
    }
  }

  public getHeight() {
    return this.height;
  }

  public render() {
    const { visible, height, heightTransition } = this.state;
    const { large, style, className } = this.props;

    let i = 1;

    const events = {
      ...getEvents(this.props),
    };

    return (
      <StyledMenu
        innerRef={r => (this.menu = r)}
        large={large}
        visible={visible}
        className={className}
        style={{
          ...style,
          height,
          transition: `0.2s opacity, 0.2s margin-top ${heightTransition ? ', 0.2s height' : ''}`,
        }}
        {...events}
      >
        {React.Children.map(this.props.children, child =>
          React.cloneElement(child as React.ReactElement<any>, {
            menu: this,
            i: i++,
            visible,
          }))}
      </StyledMenu>
    );
  }
}
