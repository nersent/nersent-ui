import * as React from "react";

// Utils
import { getComponentRippleColor } from "../../utils/component-color";
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
import { StyledSwitch, Thumb, ThumbContainer, Track } from "./styles";

export interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  color?: string;
  theme?: Theme;
  toggled?: boolean;
  ripple?: boolean;
}

export interface IState {
  toggled: boolean;
  thumbLeft: number;
  thumbScaleAnimation: boolean;
}

export default class Switch extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: colors.blue["500"],
    theme: Theme.Light,
    ripple: true
  };

  public state: IState = {
    toggled: false,
    thumbLeft: -10,
    thumbScaleAnimation: false
  };

  private track: HTMLDivElement;
  private thumb: HTMLDivElement;
  private ripples: Ripples;

  public getRippleLeft = () => {
    return -this.thumb.offsetWidth;
  };

  public getRippleTop = () => {
    return -this.thumb.offsetHeight;
  };

  public onClick = e => {
    if (!this.props.disabled) {
      this.toggle(!this.state.toggled);
    }
  };

  public toggle(flag: boolean) {
    this.setState({
      toggled: flag,
      thumbLeft: flag
        ? this.track.offsetWidth - this.thumb.offsetWidth / 2
        : -this.thumb.offsetWidth / 2,
      thumbScaleAnimation: true
    });

    setTimeout(() => {
      this.setState({thumbScaleAnimation: false})
    }, 100)
  }

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
      thumbLeft,
      thumbScaleAnimation
    } = this.state;

    const rippleColor = getComponentRippleColor(toggled, color, theme);

    const events = {
      ...getRippleEvents(this.props, () => this.ripples),
      onClick: this.onClick
    };

    return (
      <ComponentContainer disabled={disabled} {...events}>
        {children != null && (
          <ComponentText theme={theme} disabled={disabled}>
            {children}
          </ComponentText>
        )}
        <StyledSwitch>
          <Track
            innerRef={r => (this.track = r)}
            toggled={toggled}
            disabled={disabled}
            color={color}
            theme={theme}
          />
          <ThumbContainer toggled={toggled} left={thumbLeft}>
            <Thumb
              innerRef={r => (this.thumb = r)}
              toggled={toggled}
              disabled={disabled}
              color={color}
              theme={theme}
              thumbScaleAnimation={thumbScaleAnimation}
            />
            <Ripples
              icon={true}
              ref={r => (this.ripples = r)}
              color={rippleColor}
              parentWidth={20}
              parentHeight={20}
              rippleTime={0.7}
              initialOpacity={0.1}
              hoverOverShade={false}
            />
          </ThumbContainer>
        </StyledSwitch>
      </ComponentContainer>
    );
  }
}
