import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";

import ComponentContainer from "../ComponentContainer";
import ComponentText from "../ComponentText";
import StyledSwitch from "./StyledSwitch";
import Thumb from "./Thumb";
import ThumbContainer from "./ThumbContainer";
import Track from "./Track";

interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  color?: string;
  theme?: Theme;
  toggled?: boolean;
}

interface IState {
  toggled?: boolean;
  thumbLeft?: number;
}

export default class Switch extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: colors.blue["500"],
    theme: Theme.Light,
  };

  public state: IState = {
    toggled: false,
    thumbLeft: -10,
  };

  private track: HTMLDivElement;
  private thumb: HTMLDivElement;

  public onClick = (e) => {
    if (!this.props.disabled) { this.toggle(!this.state.toggled); }
  }

  public toggle(flag: boolean) {
    this.setState({
      toggled: flag,
      thumbLeft: flag ? this.track.offsetWidth - this.thumb.offsetWidth / 2 : -this.thumb.offsetWidth / 2,
    });
  }

  public render() {
    const {
      className,
      children,
      theme,
      disabled,
      color,
    } = this.props;

    const {
      toggled,
      thumbLeft,
    } = this.state;

    return (
      <ComponentContainer onClick={this.onClick}>
        {children != null &&
          <ComponentText theme={theme} disabled={disabled}>
            {children}
          </ComponentText>
        }
        <StyledSwitch>
          <Track
            innerRef={r => (this.track = r)}
            toggled={toggled}
            disabled={disabled}
            color={color} />
          <ThumbContainer toggled={toggled} left={thumbLeft}>
            <Thumb
              innerRef={r => (this.thumb = r)}
              toggled={toggled}
              disabled={disabled}
              color={color} />
          </ThumbContainer>
        </StyledSwitch>
      </ComponentContainer>
    );
  }
}
