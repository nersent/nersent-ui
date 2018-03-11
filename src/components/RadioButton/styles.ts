import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Utils
import { componentColor } from "../../utils/component-color";

// Defaults
import transparency from "../../defaults/transparency";

// Enums
import Align from "../../enums/align";
import Theme from "../../enums/theme";

// Mixins
import Positioning from "../../mixins/positioning";

export interface IStyledRadioButtonProps {
  scaleAnimation: boolean;
}

export const StyledRadioButton = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  transform: ${(props: IStyledRadioButtonProps) => !props.scaleAnimation ? "scale(1)" : "scale(0.9)"};
  transition: 0.2s transform ease-out;
`;

export interface ICircleProps {
  size: number;
  visible: boolean;
  color: string;
}

export const Circle = styled.div`
  width: ${(props: ICircleProps) => props.size}px;
  height: ${props => props.size}px;
  position: absolute;
  position: relative;
  border-radius: 100%;
  background-color: ${props => props.color};
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  transition: 0.1s background-color, 0.2s width ease-out, 0.2s height ease-out;
  ${Positioning.center(Align.CenterBoth)}
`;

export interface IBorderProps {
  borderWidth: number;
  animations: boolean;
  color: string;
}

export const Border = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border-width: ${(props: IBorderProps) => props.borderWidth}px;
  border-style: solid;
  border-color: ${props => props.color};
  box-sizing: border-box;
  transition: ${props =>
    props.animations ? "0.1s border-color, 0.3s border-width ease-out" : ""};
`;
