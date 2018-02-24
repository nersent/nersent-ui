import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";
import OverShade from "./OverShade";
import StyledButton from "./StyledButton";
import Text from "./Text";

interface IProps {
  className?: string;
  style?: {};
  raised?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  theme?: Theme;
  color?: string;
}

export default class Button extends React.Component<IProps, {}> {
  public static defaultProps = {
    raised: false,
    disabled: false,
    color: colors.black,
    backgroundColor: "transparent",
    theme: Theme.Light,
  };

  public render() {
    let {
      color,
    } = this.props;

    const {
      className,
      style,
      raised,
      disabled,
      backgroundColor,
      theme,
      children,
    } = this.props;

    if (typeof color === "object") {
      color = color["500"];
    }

    return (
      <StyledButton
        className={className}
        style={style}
        raised={raised}
        color={color}
        disabled={disabled}
        backgroundColor={backgroundColor}
        theme={theme}>
        <Text disabled={disabled} theme={theme}>
          {children}
        </Text>
        <OverShade theme={theme} color={color} />
      </StyledButton>
    );
  }
}
