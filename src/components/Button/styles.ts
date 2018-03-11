import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Utils
import { getComponentBackground, getComponentForeground } from "../../utils/component-color"

// Defaults
import buttons from "../../defaults/buttons";
import transparency from "../../defaults/transparency";

// Enumms
import Align from "../../enums/align";
import Theme from "../../enums/theme";

// Mixins
import positioning from "../../mixins/positioning";
import shadows from "../../mixins/shadows";
import typography from "../../mixins/typography";
import userSelection from "../../mixins/user-selection";

export interface IStyledButtonProps {
  color: string;
  raised: boolean;
  theme: Theme;
  disabled: boolean;
  dialog: boolean;
}

const getBackground = (color: string, disabled: boolean, theme: Theme) => {
  return getComponentBackground(color, null, disabled, theme, {
    disabled: {
      light: transparency.light.button.disabled,
      dark: transparency.dark.button.disabled
    },
    toggledOff: null
  });
}

const getForeground = (disabled: boolean, theme: Theme, foreground: string) => {
  if (!disabled) { return foreground; }

  return getComponentForeground(disabled, theme,{
    disabled: {
      light: transparency.light.text.disabled,
      dark: transparency.dark.text.disabled
    },
    enabled: {
      light: 1,
      dark: 1
    }
  });
}

export const StyledButton = styled.div`
  min-width: ${(props: IStyledButtonProps) => (props.dialog ? 0 : buttons.minWidth)}px;
  height: ${buttons.height}px;
  position: relative;
  padding: 0 16px 0 16px;
  text-align: center;
  text-transform: uppercase;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  cursor: ${props =>
    props.disabled ? "default" : "pointer"};
  background-color: ${props => getBackground(props.color, props.disabled, props.theme)};
  box-shadow: ${props => props.raised && !props.disabled ? shadows[buttons.elevation] : "none"};
  pointer-events: ${props => props.disabled ? "none" : "auto"};
  border-radius: ${buttons.cornerRadius}px;
  overflow: hidden;
  transition: 0.3s box-shadow, 0.2s background-color;
  ${userSelection.noUserSelect()} ${userSelection.noTapHighlight()}

  &:hover {
    box-shadow: ${props =>
      props.raised ? shadows[buttons.hoveredElevation] : "none"};

    & .over-shade {
      opacity: 0.12;
    }
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
  background-color: #000;
  opacity: 0;
  transition: 0.25s opacity;
  z-index: 2;
`;

export interface ITextProps {
  foreground: string;
  disabled: boolean;
  theme: Theme;
}

export const Text = styled.div`
  position: relative;
  z-index: 3;
  white-space: nowrap;
  color: ${(props: ITextProps) => getForeground(props.disabled, props.theme, props.foreground)};
  ${typography.button()};
  transition: 0.2s color;
`;
