import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";
import Ripples from "../Ripples";
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
  dialog?: boolean;
}

export default class Button extends React.Component<IProps, {}> {
  public static defaultProps = {
    raised: false,
    disabled: false,
    color: colors.black,
    backgroundColor: "transparent",
    theme: Theme.Light,
    dialog: false,
  };

  private ripples: Ripples;

  public onMouseDown = e => {
    this.ripples.makeRipple(e);
  }

  public onMouseLeave = e => {
    this.ripples.handleRippleRemove();
  }

  public render() {
    let { color } = this.props;

    const {
      className,
      style,
      raised,
      disabled,
      backgroundColor,
      theme,
      children,
      dialog,
    } = this.props;

    if (typeof color === "object") {
      color = color["500"];
    }

    const events = {
      onMouseDown: this.onMouseDown,
      onMouseLeave: this.onMouseLeave,
    };

    return (
      <StyledButton
        className={className}
        style={style}
        raised={raised}
        color={color}
        disabled={disabled}
        backgroundColor={backgroundColor}
        theme={theme}
        dialog={dialog}
        {...events}
      >
        <Text disabled={disabled} theme={theme}>
          {children}
        </Text>
        <OverShade theme={theme} color={color} />
        <Ripples ref={r => (this.ripples = r)} color={color} />
      </StyledButton>
    );
  }
}
