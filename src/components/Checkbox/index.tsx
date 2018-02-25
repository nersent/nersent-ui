import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";
import Ripples from "../Ripples";
import Border from "./Border";
import Container from "./Container";
import Icon from "./Icon";
import StyledCheckbox from "./StyledCheckbox";
import Text from "./Text";

import { executeEvent, getEvents } from "../../utils/events";
import { getRippleEvents } from "../../utils/ripple";

interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  color?: string;
  theme?: Theme;
  onCheck?: (flag: boolean, component?: any, fromProps?: boolean) => void;
  ripple?: boolean;
  customRippleBehavior?: boolean;
}

interface IState {
  checked: boolean;
  borderWidth: number;
  borderTransition: string;
  iconScaleAnimation: boolean;
  iconPathAnimation: boolean;
  iconTransition: string;
  scaleAnimation: boolean;
}

export default class Checkbox extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: colors.blue["500"],
    backgroundColor: "transparent",
    theme: Theme.Light,
    ripple: true,
    customRippleBehavior: false,
  };

  public state: IState = {
    checked: false,
    borderWidth: 2,
    borderTransition: "none",
    iconScaleAnimation: false,
    iconPathAnimation: false,
    iconTransition: "none",
    scaleAnimation: false,
  };

  private isAnimating = false;
  private checkbox: HTMLDivElement;
  private timeouts = [];
  private easing = "cubic-bezier(0.19, 1, 0.22, 1)";
  private ripples: Ripples;

  public onClick = (e) => {
    if (this.props.disabled) { return; }

    this.check(!this.state.checked);

    executeEvent(e, this.props);
  }

  public getRippleLeft = () => {
    return -this.checkbox.offsetWidth;
  }

  public getRippleTop = () => {
    return -this.checkbox.offsetHeight;
  }

  public check(flag: boolean, fromProps = false) {
    if (this.isAnimating || this.state.checked === flag) { return; }

    const { onCheck, color } = this.props;
    if (typeof onCheck === "function") {
      onCheck(flag, this, fromProps);
    }

    this.setState({checked: flag});

    if (flag) {
      this.setState({
        borderWidth: this.checkbox.offsetWidth / 2,
        borderTransition: "0.1s border-color, 0.3s border-width " + this.easing,
        scaleAnimation: true,
        iconTransition: "none",
        iconPathAnimation: false,
      });

      for (const timeout of this.timeouts) {
        clearTimeout(timeout);
      }

      this.timeouts = [];

      this.ripples.changeRippleColor(color);

      setTimeout(() => {
        this.setState({
          iconTransition: "1s clip-path " + this.easing,
          iconScaleAnimation: false,
        });

        this.timeouts.push(setTimeout(() => {
          this.setState({
            iconPathAnimation: true,
          });
        }, 150));

        this.timeouts.push(setTimeout(() => {
          this.setState({scaleAnimation: false});
        }, 200));
      }, 100);
    } else {
      this.setState({
        borderTransition: "0.1s border-color, 0.4s border-width " + this.easing,
        iconTransition: "1s transform " + this.easing,
        iconScaleAnimation: false,
        scaleAnimation: true,
      });

      this.ripples.changeRippleColor("#000");

      setTimeout(() => {
        this.setState({iconScaleAnimation: true});

        for (const timeout of this.timeouts) {
          clearTimeout(timeout);
        }

        this.timeouts = [];

        this.timeouts.push(setTimeout(() => {
          this.setState({
            borderWidth: this.checkbox.offsetWidth / 2 - 1,
          });
        }, 150));

        this.timeouts.push(setTimeout(() => {
          this.setState({
            borderWidth: 2,
          });
        }, 300));

        setTimeout(() => {
          this.setState({scaleAnimation: false});
        }, 250);
      });
    }
  }

  public render() {
    const {
      className,
      style,
      disabled,
      theme,
      children,
      color,
    } = this.props;

    const {
      checked,
      borderWidth,
      borderTransition,
      scaleAnimation,
      iconScaleAnimation,
      iconPathAnimation,
      iconTransition,
    } = this.state;

    const events = {
      ...getEvents(this.props),
      ...getRippleEvents(this.props, () => this.ripples),
      onClick: this.onClick,
    };

    return (
        <Container className={className} style={style} onClick={this.onClick} {...events}>
          <div style={{position: "relative"}}>
            <StyledCheckbox
              innerRef={r => (this.checkbox = r)}
              scaleAnimation={scaleAnimation}
            >
              <Border
                checked={checked}
                color={color}
                borderWidth={borderWidth}
                disabled={disabled}
                theme={theme}
                transition={borderTransition}
              />
              <Icon
                pathAnimation={iconPathAnimation}
                scaleAnimation={iconScaleAnimation}
                transition={iconTransition}
                theme={theme}
              />
            </StyledCheckbox>
            <Ripples
              icon
              ref={r => (this.ripples = r)}
              color="#000"
              parentWidth={18}
              parentHeight={18}
              initialOpacity={0.1} />
          </div>
          {children != null &&
            <Text disabled={disabled} theme={theme}>
              {children}
            </Text>
          }
        </Container>
    );
  }
}
