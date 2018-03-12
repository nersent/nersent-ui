import * as React from "react";

// Defaults
import colors from "../../defaults/colors";

// Enums
import Theme from "../../enums/theme";

// Components
import ComponentContainer from "../ComponentContainer";
import ComponentText from "../ComponentText";

// Styles
import { StyledSwitch, Thumb, ThumbContainer, Track } from "./styles";

export interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  color?: string;
  theme?: Theme;
  toggled?: boolean;
}

export interface IState {
  toggled?: boolean;
  thumbLeft?: number;
}

export default class Switch extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: colors.blue["500"],
    theme: Theme.Light
  };

  public state: IState = {
    toggled: false,
    thumbLeft: -10
  };

  private track: HTMLDivElement;
  private thumb: HTMLDivElement;

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
        : -this.thumb.offsetWidth / 2
    });
  }

  public render() {
    const { className, children, theme, disabled, color } = this.props;

    const { toggled, thumbLeft } = this.state;

    return (
      <ComponentContainer onClick={this.onClick}>
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
            />
          </ThumbContainer>
        </StyledSwitch>
      </ComponentContainer>
    );
  }
}
