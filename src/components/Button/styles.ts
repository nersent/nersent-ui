import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

import buttons from "../../defaults/buttons";
import transparency from "../../defaults/transparency";

import Align from "../../enums/align";
import Theme from "../../enums/theme";

import positioning from "../../mixins/positioning";
import shadows from "../../mixins/shadows";
import typography from "../../mixins/typography";
import userSelection from "../../mixins/user-selection";

const getBackgroundColor = (props: IStyledButtonProps) => {
  if (props.disabled) {
    if (props.raised) {
      return `rgba(0, 0, 0, ${transparency[props.theme].button.disabled})`;
    }
  }
  return props.backgroundColor;
};

export interface IStyledButtonProps {
  disabled: boolean;
  raised: boolean;
  dialog: boolean;
  theme: Theme;
  backgroundColor: string;
}

export const StyledButton = styled.div`
  position: relative;
  padding: 0 16px 0 16px;
  text-transform: uppercase;
  float: left;
  cursor: ${(props: IStyledButtonProps) =>
    props.disabled ? "default" : "pointer"};
  background-color: ${props => getBackgroundColor(props)};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  color: ${props => (props.disabled ? "#000" : props.color)};
  box-shadow: ${props =>
    props.raised && !props.disabled ? shadows[buttons.elevation] : "none"};
  border-radius: ${buttons.cornerRadius}px;
  min-width: ${props => (props.dialog ? 0 : buttons.minWidth)}px;
  height: ${buttons.height}px;
  ${userSelection.noUserSelect()} ${userSelection.noTapHighlight()}
  overflow: hidden;
  transition: 0.3s box-shadow;

  &:hover {
    box-shadow: ${props =>
      props.raised ? shadows[buttons.hoveredElevation] : "none"};
  }

  &:active {
    box-shadow: ${props =>
      props.raised ? shadows[buttons.pressedElevation] : "none"};
  }
`;

export const OverShade = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.color};
  opacity: 0;
  transition: 0.25s opacity;
  z-index: 2;

  &:hover {
    opacity: ${props => transparency[props.theme].button.focused};
  }
`;

export interface ITextProps {
  disabled: boolean;
  theme: Theme;
}

export const Text = styled.div`
  position: relative;
  z-index: 2;
  opacity: ${(props: ITextProps) =>
    props.disabled
      ? transparency[props.theme].button.text.disabled
      : transparency[props.theme].text.primary};
  ${typography.button()};
  ${positioning.center(Align.CenterBoth)};
`;
