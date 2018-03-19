import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Enums
import Align from "../../enums/align";
import Theme from "../../enums/theme";

// Mixins
import Positioning from "../../mixins/positioning";
import Shadows from "../../mixins/shadows";

const getThumbBackgroundColor = (props: IThumbProps) => {
  const { disabled, toggled, color, theme } = props;

  if (disabled) {
    if (theme === Theme.Light) {
      return "#BDBDBD";
    } else {
      return "#424242";
    }
  } else if (!toggled) {
    if (theme === Theme.Light) {
      return "#FAFAFA";
    } else {
      return "#BDBDBD";
    }
  } else {
    return color;
  }
};

const getTrackBackgroundColor = (props: ITrackProps) => {
  const { disabled, toggled, color, theme } = props;

  if (disabled) {
    if (props.theme === Theme.Light) {
      return "rgba(0,0,0,0.12)";
    } else {
      return "rgba(255,255,255,0.10)";
    }
  } else if (!toggled) {
    if (props.theme === Theme.Light) {
      return "rgba(0,0,0,0.38)";
    } else {
      return "rgba(255,255,255,0.30)";
    }
  } else {
    return color;
  }
};

export const StyledSwitch = styled.div`
  width: 24px;
  height: 14px;
  position: relative;
`;

export interface IThumbContainerProps {
  toggled: boolean;
  left: number;
}

export const ThumbContainer = styled.div`
  position: absolute;
  transition: 0.25s left ease-out;

  left: ${(props: IThumbContainerProps) => props.left}px;
  ${Positioning.center(Align.CenterVertical)};
`;

export interface IThumbProps {
  toggled: boolean;
  disabled: boolean;
  color: string;
  theme: Theme;
  thumbScaleAnimation: boolean;
}

export const Thumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  transition: 0.2s transform, 0.2s background-color;

  background-color: ${(props: IThumbProps) => getThumbBackgroundColor(props)};
  transform: ${props =>
    !props.thumbScaleAnimation ? "scale(1)" : "scale(0.9)"};
  box-shadow: ${Shadows[2]};
`;

export interface ITrackProps {
  toggled: boolean;
  disabled: boolean;
  color: string;
  theme: Theme;
}

export const Track = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: 0.2s opacity, 0.2s background-color;

  opacity: ${(props: ITrackProps) => (props.toggled ? 0.5 : 1)};
  background-color: ${props => getTrackBackgroundColor(props)};
`;
