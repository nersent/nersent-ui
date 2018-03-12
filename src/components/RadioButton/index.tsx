import * as React from "react";

// Utils
import { getRippleEvents } from "../../utils/ripple";

// Defaults
import colors from "../../defaults/colors";

// Enums
import Theme from "../../enums/theme";

// Components
import ComponentContainer from "../ComponentContainer";
import ComponentText from "../ComponentText";
import Ripples from "../Ripples";

// Styles
import { Border, Circle, StyledRadioButton } from "./styles";

export interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  color?: string;
  theme?: Theme;
  onClick?: (e: object, component?: RadioButton) => void;
  toggled?: boolean;
}

export interface IState {
  toggled: boolean;
  borderAnimations: boolean;
  fullBorderSize: boolean;
  circleVisible: boolean;
  fullCircleSize: boolean;
  animation: boolean;
  rippleColor: string;
}

export default class RadioButton extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: colors.blue["500"],
    theme: Theme.Light,
    ripple: true
  };

  public state: IState = {
    toggled: false,
    borderAnimations: true,
    fullBorderSize: false,
    circleVisible: false,
    fullCircleSize: true,
    animation: false,
    rippleColor: "#000"
  };

  private timeouts = [];
  private radioButton: HTMLDivElement;
  private ripples: Ripples;

  public getRippleLeft = () => {
    return -this.radioButton.offsetWidth;
  };

  public getRippleTop = () => {
    return -this.radioButton.offsetHeight;
  };

  public onClick = e => {
    const onClick = this.props.onClick;

    if (typeof onClick === "function") {
      onClick(e, this);
    }
  };

  public toggle = (flag = !this.state.toggled) => {
    this.setState({
      toggled: flag,
      animation: true,
      rippleColor: flag ? this.props.color : "#000"
    });

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
    const {
      className,
      children,
      theme,
      disabled,
      color
    } = this.props;

    const {
      toggled,
      fullBorderSize,
      fullCircleSize,
      animation,
      borderAnimations,
      circleVisible,
      rippleColor
    } = this.state;

    const borderWidth = fullBorderSize ? this.radioButton.offsetWidth / 2 : 2;
    const circleSize = fullCircleSize ? 14 : 9;

    const events = {
      ...getRippleEvents(this.props, () => this.ripples),
      onClick: this.onClick
    };

    return (
      <ComponentContainer {...events}>
        <div style={{ position: "relative" }}>
          <StyledRadioButton
            innerRef={r => (this.radioButton = r)}
            scaleAnimation={animation}
          >
            <Border
              borderWidth={borderWidth}
              animations={borderAnimations}
              color={color}
              toggled={toggled}
              disabled={disabled}
              theme={theme}
            />
            <Circle
              size={circleSize}
              visible={circleVisible}
              color={color}
              toggled={toggled}
              disabled={disabled}
              theme={theme}
            />
          </StyledRadioButton>
          <Ripples
            icon={true}
            ref={r => (this.ripples = r)}
            color={rippleColor}
            parentWidth={18}
            parentHeight={18}
            rippleTime={0.7}
            initialOpacity={0.1}
          />
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
