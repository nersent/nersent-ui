import React, { SyntheticEvent } from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";
import Ripples from "../Ripples";
import OverShade from "./OverShade";
import StyledButton from "./StyledButton";
import Text from "./Text";

type ButtonEvent = (e?: SyntheticEvent<HTMLDivElement>) => void;

interface IProps {
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
    ripple: true,
  };

  private ripples: Ripples;

  public onTouchStart = (e) => {
    const { onTouchStart } = this.props;

    if (typeof onTouchStart === "function") {
      onTouchStart(e);
    }
  }

  public onTouchEnd = (e) => {
    const { onTouchEnd } = this.props;

    if (typeof onTouchEnd === "function") {
      onTouchEnd(e);
    }
  }

  public onMouseDown = (e) => {
    const { onMouseDown, ripple, customRippleBehavior } = this.props;
    const { pageX, pageY } = e;

    if (ripple && !customRippleBehavior) {
      this.ripples.makeRipple(pageX, pageY);
    }

    if (typeof onMouseDown === "function") {
      onMouseDown(e);
    }
  }

  public onMouseEnter = (e) => {
    const { onMouseEnter } = this.props;

    if (typeof onMouseEnter === "function") {
      onMouseEnter(e);
    }
  }

  public onMouseLeave = (e) => {
    const { onMouseLeave, ripple, customRippleBehavior } = this.props;

    if (ripple && !customRippleBehavior) {
      this.ripples.removeRipples();
    }

    if (typeof onMouseLeave === "function") {
      onMouseLeave(e);
    }
  }

  public onClick = (e) => {
    const { onClick } = this.props;

    if (typeof onClick === "function") {
      onClick(e);
    }
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
      onMouseEnter: this.onMouseEnter,
      onClick: this.onClick,
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd,
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
        <div style={{clear: "both"}} />
      </div>
    );
  }
}
