import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";

import Border from "./Border";
import Icon from "./Icon";
import StyledCheckbox from "./StyledCheckbox";

interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  color?: string;
  theme?: Theme;
  onCheck?: (flag: boolean, component?: any, fromProps?: boolean) => void;
}

interface IState {
  checked: boolean;
  borderWidth: number;
  iconScaleAnimation: boolean;
  iconPathAnimation: boolean;
  checkboxBorderTransition: string;
  checkboxIconTransition: string;
  scaleAnimation: boolean;
}

export default class Checkbox extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: colors.blue["500"],
    backgroundColor: "transparent",
    theme: Theme.Light,
  };

  public state: IState = {
    checked: false,
    borderWidth: 2,
    iconScaleAnimation: false,
    iconPathAnimation: false,
    checkboxBorderTransition: "none",
    checkboxIconTransition: "none",
    scaleAnimation: false,
  };

  private isAnimating = false;
  private checkbox: HTMLDivElement;
  private timeouts = [];
  private easing = "cubic-bezier(0.19, 1, 0.22, 1)";

  public check(flag: boolean, fromProps = false) {
    if (this.isAnimating || this.state.checked === flag) { return; }

    const onCheck = this.props.onCheck;
    if (typeof onCheck === "function") { onCheck(flag, this, fromProps); }

    this.setState({checked: flag});

    if (flag) {
      this.setState({
        borderWidth: this.checkbox.offsetWidth / 2,
        scaleAnimation: true,
        checkboxBorderTransition: "0.1s border-color, 0.2s border-width " + this.easing,
        checkboxIconTransition: "none",
        iconPathAnimation: false,
      });

      for (const t of this.timeouts) {
        clearTimeout(t);
      }

      this.timeouts = [];

      setTimeout(() => {
        this.setState({
          checkboxIconTransition: "1s clip-path " + this.easing,
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
        scaleAnimation: true,
        iconScaleAnimation: false,
        checkboxBorderTransition: "0.1s border-color, 0.4s border-width " + this.easing,
        checkboxIconTransition: "1s transform " + this.easing,
      });

      setTimeout(() => {
        this.setState({iconScaleAnimation: true});

        for (const t of this.timeouts) {
          clearTimeout(t);
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
      iconScaleAnimation,
      checkboxIconTransition,
      iconPathAnimation,
    } = this.state;

    return (
      <StyledCheckbox
        innerRef={r => (this.checkbox = r)}
        className={className}
        style={style}
        color={color}
        disabled={disabled}
        theme={theme}
        onClick={() => { this.check(!this.state.checked); }}
      >
        <Border
          checked={checked}
          color={color}
          borderWidth={borderWidth}
          disabled={disabled}
          theme={theme}
        />
        <Icon
          iconPathAnimation={iconPathAnimation}
          transform={`scale(${!iconScaleAnimation ? 1 : 0})`}
          transition={checkboxIconTransition}
        />
      </StyledCheckbox>
    );
  }
}
