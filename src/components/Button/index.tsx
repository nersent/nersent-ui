import * as React from "react";
import { SyntheticEvent } from "react";

// Utils
import { getForegroundColor } from "../../utils/colors";
import { getEvents } from "../../utils/events";
import { getRippleEvents } from "../../utils/ripple";

// Defaults
import colors from "../../defaults/colors";

// Enums
import Theme from "../../enums/theme";

// Components
import Clear from "../Clear";
import Ripples from "../Ripples";

// Styles
import { OverShade, StyledButton, Text } from "./styles";

export type ButtonEvent = (e?: SyntheticEvent<HTMLDivElement>) => void;

export interface IProps {
  className?: string;
  style?: {};
  raised?: boolean;
  disabled?: boolean;
  theme?: Theme;
  color?: string;
  dialog?: boolean;
  ripple?: boolean;
  customRippleBehavior?: boolean;
  onClick?: ButtonEvent;
  onMouseDown?: ButtonEvent;
  onMouseUp?: ButtonEvent;
  onMouseLeave?: ButtonEvent;
  onMouseEnter?: ButtonEvent;
  onTouchStart?: ButtonEvent;
  onTouchEnd?: ButtonEvent;
}

export interface IState {
  foreground: string;
}

export default class Button extends React.Component<IProps, IState> {
  public static defaultProps = {
    raised: true,
    disabled: false,
    color: colors.blue["500"],
    theme: Theme.Light,
    dialog: false,
    customRippleBehavior: false,
    ripple: true
  };

  public state: IState = {
    foreground: "black"
  };

  private ripples: Ripples;

  public componentDidMount() {
    this.setState({
      foreground: getForegroundColor(this.props.color)
    });
  }

  public componentWillReceiveProps(nextProps) {
    if (this.props.color !== nextProps.color) {
      this.setState({
        foreground: getForegroundColor(nextProps.color)
      });
    }
  }

  public render() {
    let { color } = this.props;

    const {
      className,
      style,
      raised,
      disabled,
      theme,
      children,
      dialog
    } = this.props;

    const { foreground } = this.state;

    if (typeof color === "object") {
      color = color["500"];
    }

    const events = {
      ...getEvents(this.props),
      ...getRippleEvents(this.props, () => this.ripples)
    };

    return (
      <>
        <StyledButton
          className={className}
          style={style}
          color={color}
          raised={raised}
          theme={theme}
          disabled={disabled}
          dialog={dialog}
          {...events}
        >
          <Text foreground={foreground} disabled={disabled} theme={theme}>
            {children}
          </Text>
          <OverShade className="over-shade" />
          <Ripples ref={r => (this.ripples = r)} color={foreground} />
        </StyledButton>
        <Clear />
      </>
    );
  }
}
