import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Enums
import ProgressBarType from "../../enums/progressBar";

export const StyledProgressBar = styled.div`
  width: 400px;
  height: 4px;
  position: relative;
  overflow: hidden;
  margin-left: -32px;
`;

export interface IBackground {
  color: string;
};

export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.38;

  background-color ${(props: IBackground) => props.color};
`;

export interface ILine {
  color: string;
  progress: number;
  type: ProgressBarType;
  margin: number;
  fast: boolean;
  linesAnimation: boolean;
};

export const Line = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition-timing-function: ease;

  width: ${(props: ILine) => props.progress}%;
  background-color: ${props => props.color};
  margin-left: ${props => props.margin}%;
  transition-property: ${props => (props.type === ProgressBarType.Indeterminate && props.linesAnimation) ? "margin-left" : ""};
  transition-duration: ${props => !props.fast ? "2s" : "1s"};
`;
