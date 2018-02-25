import React from "react";
import ReactDOM from "react-dom";

import Ripple from "../Ripple";
import StyledRipples from "./StyledRipples";

interface IProps {
  className?: string;
  style?: {};
  center?: boolean;
  scale?: number;
  time?: number;
  opacity?: number;
  color?: string;
}

interface IRipple {
  color: string;
  x: number;
  y: number;
}

interface IState {
  ripples: IRipple[];
}

let nextRippleId = -1;

export default class Ripples extends React.Component<IProps, IState> {
  public static defaultProps = {
    center: false,
    scale: 16,
    time: 0.8,
    opacity: 0.6,
    touchSupport: true,
    color: "#000",
  };

  public state = {
    ripples: [],
  };

  private ripples: HTMLDivElement;

  public makeRipple(e: Event) {
    const { color, opacity } = this.props;

    this.setState({
      ripples: [
        ...this.state.ripples,
        {
          color,
          opacity,
          ...this.getPosition(false, 0, e),
          id: nextRippleId++,
        },
      ],
    });
  }

  public removeRipple = (id: number) => {
    const index = this.state.ripples.indexOf(
      this.state.ripples.filter(ripple => ripple.id === id)[0]
    );

    this.setState({
      ripples: [
        ...this.state.ripples.slice(0, index),
        ...this.state.ripples.slice(index + 1),
      ],
    });
  }

  public getPosition(center: boolean, offsetX: number, e: any) {
    if (!center) {
      let pos = {
        x: -1,
        y: -1,
      };

      if (e.type === "touchstart") {
        const touch = e.touches[0];

        pos = {
          x: touch.pageX,
          y: touch.pageY,
        };
      } else {
        pos = {
          x: e.pageX,
          y: e.pageY,
        };
      }

      return {
        x: pos.x - this.ripples.getBoundingClientRect().left + "px",
        y: pos.y - this.ripples.getBoundingClientRect().top + "px",
      };
    } else {
      return {
        x: 50 + offsetX + "%",
        y: "50%",
      };
    }
  }

  public render() {
    const { ripples } = this.state;

    const { time, opacity } = this.props;

    return (
      <StyledRipples innerRef={r => (this.ripples = r)}>
        {ripples.map(ripple => {
          const { offsetHeight, offsetWidth } = this.ripples;

          return (
            <Ripple
              height={offsetHeight}
              width={offsetWidth}
              time={time}
              removeRipple={this.removeRipple}
              {...ripple}
              key={ripple.id}
            />
          );
        })}
      </StyledRipples>
    );
  }
}
