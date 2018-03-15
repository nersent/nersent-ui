import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

export const StyledProgressBar = styled.div`
  width: 260px;
  height: 4px;
  position: relative;
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
  background-color ${(props: IBackground) => props.color};
  opacity: 0.38;
`;

export interface ILine {
  color: string;
};

export const Line = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color ${(props: ILine) => props.color};
`;
