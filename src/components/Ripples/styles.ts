import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

const getBackgroundColor = color => {
  const opacityHex = 14; // 0.8

  if (color.startsWith("#")) {
    if (color.length >= 7) {
      return `${color}${opacityHex}`;
    } else if (color.length === 4) {
      return `${color}${color.substring(1)}${opacityHex}`;
    }
  }

  return color;
};

export const StyledRipples = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  pointer-events: none;
`;

export interface IIconRippleProps {
  width: number;
  height: number;
  color: string;
}

export const IconRipple = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  left: ${(props: IIconRippleProps) => props.width / 2}px;
  top: ${props => props.height / 2}px;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: 0.2s background-color;

  &:hover {
    background-color: ${props => getBackgroundColor(props.color)};
  }
`;
