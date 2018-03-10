import React from "react";

import colors from "../../defaults/colors";

import { componentColor } from "../../utils/component-color";

import Theme from "../../enums/theme";

import ComponentContainer from "../ComponentContainer";
import ComponentText from "../ComponentText";
import Border from "./Border";
import Circle from "./Circle";
import StyledRadioButton from "./StyledRadioButton";

interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  color?: string;
  theme?: Theme;
  onClick?: (e: object, component?: RadioButton) => void;
  toggled?: boolean;
}

interface IState {
  toggled: boolean;
  borderAnimations: boolean;
  fullBorderSize: boolean;
  circleVisible: boolean;
  fullCircleSize: boolean;
  animation: boolean;
}

export default class RadioButton extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: colors.blue["500"],
    theme: Theme.Light
  };

  public state: IState = {
    toggled: false,
    borderAnimations: true,
    fullBorderSize: false,
    circleVisible: false,
    fullCircleSize: true,
    animation: false
  };

  private timeouts = [];
  private radioButton: HTMLDivElement;

  public onClick = e => {
    const onClick = this.props.onClick;

    if (typeof onClick === "function") {
      onClick(e, this);
    }
  };

  public toggle = (flag = !this.state.toggled) => {
    this.setState({ toggled: flag, animation: true });

    if (flag) {
      this.setState({ fullBorderSize: true });

      for (const timeout of this.timeouts) {
        clearTimeout(timeout);
      }

      this.timeouts = [];

      this.timeouts.push(
        setTimeout(() => {
          this.setState({
            borderAnimations: false,
            circleVisible: true,
            fullBorderSize: false,
            fullCircleSize: false,
            animation: false
          });
        }, 300)
      );
    } else {
      this.setState({ fullCircleSize: true });

      for (const timeout of this.timeouts) {
        clearTimeout(timeout);
      }

      this.timeouts = [];

      this.timeouts.push(
        setTimeout(() => {
          this.timeouts.push(
            this.setState({
              circleVisible: false,
              fullBorderSize: true
            })
          );

          this.timeouts.push(
            setTimeout(() => {
              this.setState({ borderAnimations: true });

              this.timeouts.push(
                setTimeout(() => {
                  this.setState({
                    fullBorderSize: false,
                    animation: false
                  });
                })
              );
            })
          );
        }, 200)
      );
    }
  };

  public render() {
    const { className, children, theme, disabled } = this.props;

    const {
      toggled,
      fullBorderSize,
      fullCircleSize,
      animation,
      borderAnimations,
      circleVisible
    } = this.state;

    const borderWidth = fullBorderSize ? this.radioButton.offsetWidth / 2 : 2;
    const circleSize = fullCircleSize ? 14 : 9;

    const color = componentColor(this.props.color, toggled, disabled, theme);

    return (
      <ComponentContainer onClick={this.onClick}>
        <div style={{ position: "relative" }}>
          <StyledRadioButton
            innerRef={r => (this.radioButton = r)}
            scaleAnimation={animation}
          >
            <Border
              borderWidth={borderWidth}
              animations={borderAnimations}
              color={color}
            />
            <Circle size={circleSize} visible={circleVisible} color={color} />
          </StyledRadioButton>
        </div>
        {children != null && (
          <ComponentText theme={theme} disabled={disabled}>
            {children}
          </ComponentText>
        )}
      </ComponentContainer>
    );
  }
}
