import React, { SyntheticEvent } from "react";

import colors from "../../defaults/colors";

import { getEvents } from "../../utils/events";
import { getRippleEvents } from "../../utils/ripple";

import Theme from "../../enums/theme";

import Ripples from "../Ripples";

import { OverShade, StyledButton, Text } from "./styles";

export type ButtonEvent = (e?: SyntheticEvent<HTMLDivElement>) => void;

export interface IProps {
  className?: string;
  style?: {};
  raised?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  theme?: Theme;
  color?: string;
  dialog?: boolean;
  onClick?: ButtonEvent;
  onMouseDown?: ButtonEvent;
  onMouseUp?: ButtonEvent;
  onMouseLeave?: ButtonEvent;
  onMouseEnter?: ButtonEvent;
  onTouchStart?: ButtonEvent;
  onTouchEnd?: ButtonEvent;
  ripple?: boolean;
  customRippleBehavior?: boolean;
}

export default class Button extends React.Component<IProps, {}> {
  public static defaultProps = {
    raised: false,
    disabled: false,
    color: colors.black,
    backgroundColor: "transparent",
    theme: Theme.Light,
    dialog: false,
    customRippleBehavior: false,
    ripple: true
  };

  private ripples: Ripples;

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
      dialog
    } = this.props;

    if (typeof color === "object") {
      color = color["500"];
    }

    const events = {
      ...getEvents(this.props),
      ...getRippleEvents(this.props, () => this.ripples)
    };

    return (
      <div>
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
        <div style={{ clear: "both" }} />
      </div>
    );
  }
}
