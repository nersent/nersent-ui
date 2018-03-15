import * as React from "react";
import { SyntheticEvent } from "react";

// Defaults
import colors from "../../defaults/colors";

// Styles
import { Background, Line, StyledProgressBar } from "./styles";

export interface IProps {
  className?: string;
  style?: {};
  color: string;
}

export interface IState {
  foreground: string;
}

export default class ProgressBar extends React.Component<IProps, IState> {
  public static defaultProps = {
    raised: false,
    disabled: false,
    color: colors.blue["500"]
  };

  public state: IState = {
    foreground: "black"
  };

  public render() {
    const {
      className,
      style,
      color
    } = this.props;

    return (
      <StyledProgressBar>
        <Background color={color} />
        <Line color={color} />
      </StyledProgressBar>
    );
  }
}
