import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Utils
import { hexToRgb } from "../../utils/colors";

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
  hoverOverShade: boolean;
  disabled: boolean;
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
    ${props => {
      const rgb = hexToRgb(props.color);

      if (props.hoverOverShade && !props.disabled) {
        return `background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08);`
      }
    }}
  }
`;
