import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

export const StyledPreloader = styled.div`
  width: 56px;
  height: 56px;
  transform-origin: center center;
  animation: nersent-ui-preloader-rotate 2s linear infinite;
`;

export interface IPathProps {
  color: string;
};

export const Path = styled.circle.attrs({
  style: props => {
    return {
      stroke: props.color
    };
  }
})`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: nersent-ui-preloader-dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: square;
  stroke-width: 4;
  transition: 0.3s stroke;
`;