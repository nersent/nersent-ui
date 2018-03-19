import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Utils
import { getComponentBackground } from "../../utils/component-color";

// Defaults
import transparency from "../../defaults/transparency";

// Enums
import Align from "../../enums/align";
import Theme from "../../enums/theme";

// Mixins
import Positioning from "../../mixins/positioning";

const getBackground = (color: string, toggled: boolean, disabled: boolean, theme: Theme) => {
  return getComponentBackground(color, toggled, disabled, theme);
};

export interface IStyledRadioButtonProps {
  scaleAnimation: boolean;
}

export const StyledRadioButton = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  transition: 0.2s transform ease-out;

  transform: ${(props: IStyledRadioButtonProps) =>
    !props.scaleAnimation ? "scale(1)" : "scale(0.9)"};
`;

export interface IBorderProps {
  borderWidth: number;
  animations: boolean;
  color: string;
  toggled: boolean;
  disabled: boolean;
  theme: Theme;
}

export const Border = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border-style: solid;
  box-sizing: border-box;

  border-width: ${(props: IBorderProps) => props.borderWidth}px;
  border-color: ${props =>
    getBackground(props.color, props.toggled, props.disabled, props.theme)};
  transition: ${props =>
    props.animations ? "0.1s border-color, 0.3s border-width ease-out" : ""};
`;

export interface ICircleProps {
  size: number;
  visible: boolean;
  color: string;
  toggled: boolean;
  disabled: boolean;
  theme: Theme;
}

export const Circle = styled.div`
  position: absolute;
  position: relative;
  border-radius: 100%;
  transition: 0.1s background-color, 0.2s width ease-out, 0.2s height ease-out;

  width: ${(props: ICircleProps) => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props =>
    getBackground(props.color, props.toggled, props.disabled, props.theme)};
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  ${Positioning.center(Align.CenterBoth)};
`;