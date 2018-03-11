import * as React from "react";
import * as ReactDOM from "react-dom";

// Styles
import {
  IconRipple,
  StyledRipples
} from "./styles";

// Components
import Ripple from "../Ripple";

export interface IProps {
  className?: string;
  style?: {};
  center?: boolean;
  scale?: number;
  fadeOutTime?: number;
  rippleTime?: number;
  initialOpacity?: number;
  color?: string;
  icon?: boolean;
  parentHeight?: number;
  parentWidth?: number;
}

export interface IRipple {
  x: number;
  y: number;
  id: number;
  isRemoving: boolean;
}

export interface IState {
  ripples: IRipple[];
  color: string;
}

let nextRippleId = -1;

export default class Ripples extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    center: false,
    scale: 16,
    fadeOutTime: 0.6,
    initialOpacity: 0.2,
    color: "#000",
    rippleTime: 1,
    icon: false
  };

  public state: IState = {
    ripples: [],
    color: this.props.color
  };

  private ripples: HTMLDivElement;
  private currentRipple: IRipple;
  private isTouched = false;

  public componentDidMount() {
    window.addEventListener("mouseup", () => {
      this.removeRipples();
    });
  }

  public componentWillReceiveProps (nextProps) {
    if (nextProps.color !== this.state.color) {
      this.setState({
        color: nextProps.color
      })
    }
  }

  public makeRipple(mouseX: number, mouseY: number, isTouch = false) {
    if (!isTouch && this.isTouched) {
      return;
    }
    const { color, initialOpacity } = this.props;

    const newRipple: IRipple = {
      ...this.getRipplePosition(0, mouseX, mouseY),
      id: nextRippleId++,
      isRemoving: false
    };

    this.currentRipple = newRipple;

    this.setState({
      ripples: [...this.state.ripples, newRipple]
    });

    if (isTouch && !this.isTouched) {
      this.isTouched = true;
    }
  }

  public removeRipple = (id: number) => {
    const index = this.state.ripples.indexOf(
      this.state.ripples.filter(ripple => ripple.id === id)[0]
    );

    this.setState({
      ripples: [
        ...this.state.ripples.slice(0, index),
        ...this.state.ripples.slice(index + 1)
      ]
    });
  };

  public removeRipples = () => {
    this.setState({
      ripples: [
        ...this.state.ripples.map((ripple: IRipple) => {
          const newRipple: IRipple = { ...ripple };
          newRipple.isRemoving = true;
          return newRipple;
        })
      ]
    });
  };

  public changeRippleColor = (newColor: string) => {
    this.setState({ color: newColor });
  };

  public getRipplePosition(offsetX = 0, x = 0, y = 0) {
    return {
      x: x - this.ripples.getBoundingClientRect().left,
      y: y - this.ripples.getBoundingClientRect().top
    };
  }

  public render() {
    const { ripples, color } = this.state;

    const {
      fadeOutTime,
      initialOpacity,
      rippleTime,
      icon,
      parentWidth,
      parentHeight
    } = this.props;

    const component = (
      <StyledRipples innerRef={r => (this.ripples = r)}>
        {ripples.map((ripple: IRipple) => {
          const { offsetHeight, offsetWidth } = this.ripples;
          const { id, x, y, isRemoving } = ripple;

          return (
            <Ripple
              height={offsetHeight}
              width={offsetWidth}
              fadeOutTime={fadeOutTime}
              rippleTime={rippleTime}
              removeRipple={this.removeRipple}
              initialOpacity={initialOpacity}
              color={color}
              isRemoving={isRemoving}
              x={x}
              y={y}
              id={id}
              key={id}
            />
          );
        })}
      </StyledRipples>
    );

    return (
      (icon && (
        <IconRipple width={parentWidth} height={parentHeight} color={color}>
          {component}
        </IconRipple>
      )) ||
      component
    );
  }

  private changeRippleProperty = (
    id: number,
    property: string,
    newValue: any
  ) => {
    this.setState({
      ripples: [
        ...this.state.ripples.map((ripple: IRipple) => {
          if (ripple.id === id) {
            const newRipple: IRipple = { ...ripple };
            newRipple[property] = newValue;
            return newRipple;
          } else {
            return ripple;
          }
        })
      ]
    });
  };
}
