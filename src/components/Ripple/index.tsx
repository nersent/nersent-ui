import React from "react";
import ReactDOM from "react-dom";

import StyledRipple from "./StyledRipple";

interface IProps {
  height: number;
  width: number;
  color: string;
  opacity: number;
  time: number;
  x: number;
  y: number;
  removeRipple: (ripple) => void;
  id: number;
}

interface IRipple {
  color: string;
}

interface IState {
  width: number;
  height: number;
  opacity: number;
}

export default class Ripple extends React.Component<IProps, IState> {
  public state = {
    width: 0,
    height: 0,
    opacity: 1,
  };

  timeouts = [];

  componentDidMount() {
    const { height, width, time, removeRipple, id, opacity } = this.props;

    this.setState({
      opacity,
    });

    this.timeouts.push(
      setTimeout(() => {
        this.setState({
          width,
          height,
        });
      }, 1)
    );

    this.timeouts.push(
      setTimeout(() => {
        this.setState({
          opacity: 0,
        });
      }, 100)
    );

    this.timeouts.push(
      setTimeout(() => {
        removeRipple(id);
      }, time * 1000)
    );
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  public render() {
    const { height, width, opacity } = this.state;
    const { color, time, x, y } = this.props;

    return (
      <StyledRipple
        height={height}
        width={width}
        color={color}
        opacity={opacity}
        x={x}
        y={y}
      />
    );
  }
}
