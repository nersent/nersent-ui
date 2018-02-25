import React from "react";
import ReactDOM from "react-dom";

import Ripple from "../Ripple";
import StyledRipples from "./StyledRipples";

interface IProps {
  className?: string;
  style?: {};
  center?: boolean;
  scale?: number;
  fadeOutTime?: number;
  rippleTime?: number;
  initialOpacity?: number;
  color?: string;
}

interface IRipple {
  x: number;
  y: number;
  id: number;
  isRemoving: boolean;
  color: string;
  unit: string;
}

interface IState {
  ripples: IRipple[];
}

let nextRippleId = -1;

export default class Ripples extends React.Component<IProps, IState> {
  public static defaultProps: IProps = {
    center: false,
    scale: 16,
    fadeOutTime: 0.6,
    initialOpacity: 0.2,
    color: "#000",
    rippleTime: 1.2,
  };

  public state: IState = {
    ripples: [],
  };

  private ripples: HTMLDivElement;
  private currentRipple: IRipple;

  public componentDidMount() {
    window.addEventListener("mouseup", () => {
      this.removeRipples();
    });
  }

  public makeRipple(mouseX: number, mouseY: number) {
    const { color, initialOpacity } = this.props;

    const newRipple: IRipple = {
      ...this.getRipplePosition(false, 0, mouseX, mouseY),
      id: nextRippleId++,
      isRemoving: false,
      color,
    };

    this.currentRipple = newRipple;

    this.setState({
      ripples: [
        ...this.state.ripples,
        newRipple,
      ],
    });
  }

  public removeRipple = (id: number) => {
    const index = this.state.ripples.indexOf(
      this.state.ripples.filter(ripple => ripple.id === id)[0],
    );

    this.setState({
      ripples: [
        ...this.state.ripples.slice(0, index),
        ...this.state.ripples.slice(index + 1),
      ],
    });
  }

  public removeRipples = () => {
    this.setState({
      ripples: [
        ...this.state.ripples.map((ripple: IRipple) => {
          const newRipple: IRipple = { ...ripple };
          newRipple.isRemoving = true;
          return newRipple;
        }),
      ],
    });
  }

  public changeRippleColor = (newColor: string, id: number = this.currentRipple.id) => {
    this.changeRippleProperty(id, "color", newColor);
  }

  public getRipplePosition(center: boolean, offsetX = 0, x = 0, y = 0) {
    if (!center) {
      return {
        x: x - this.ripples.getBoundingClientRect().left,
        y: y - this.ripples.getBoundingClientRect().top,
        unit: "px",
      };
    } else {
      return {
        x: 50 + offsetX,
        y: 50,
        unit: "%",
      };
    }
  }

  public render() {
    const { ripples } = this.state;

    const { fadeOutTime, initialOpacity, rippleTime }: IProps = this.props;

    return (
      <StyledRipples innerRef={r => (this.ripples = r)}>
        {ripples.map((ripple: IRipple) => {
          const { offsetHeight, offsetWidth } = this.ripples;
          const { id, x, y, isRemoving, color, unit } = ripple;

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
              unit={unit}
              x={x}
              y={y}
              id={id}
              key={id}
            />
          );
        })}
      </StyledRipples>
    );
  }

  private changeRippleProperty = (id: number, property: string, newValue: any) => {
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
        }),
      ],
    });
  }
}
