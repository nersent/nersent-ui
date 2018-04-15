import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import transparency from '../../defaults/transparency';
import Theme from '../../enums/theme';
import icons from '../../mixins/icons';
import images from '../../mixins/images';
import userSelection from '../../mixins/user-selection';
import { getComponentBackground, getComponentForeground } from '../../utils/component-color';

const checkIcon = require('../../images/Controls/check.svg');

export interface IStyledCheckboxProps {
  scaleAnimation: boolean;
}

export const StyledCheckbox = styled.div`
  width: 18px;
  height: 18px;
  position: relative;
  transform: translate3d(0, 0, 0) translateZ(0);
  transition: 0.4s transform;
  -webkit-font-smoothing: subpixel-antialiased;

  ${(props: IStyledCheckboxProps) => (!props.scaleAnimation ? 'scale(1)' : 'scale(0.92)')};
  ${userSelection.noTapHighlight()};
`;

export default StyledCheckbox;

export interface IBorderProps {
  checked: boolean;
  color: string;
  borderWidth: number;
  disabled: boolean;
  theme: Theme;
  transition: string;
}

export const Border = styled.div`
  width: 100%;
  height: 100%;
  border-style: solid;
  border-radius: 3px;
  box-sizing: border-box;

  border-width: ${(props: IBorderProps) => props.borderWidth}px;
  border-color: ${(props: IBorderProps) =>
    getComponentBackground(props.color, props.checked, props.disabled, props.theme)};
  transition: ${props => props.transition};
`;

export interface IIconProps {
  transition: string;
  pathAnimation: boolean;
  scaleAnimation: boolean;
  theme: Theme;
}

export const Icon = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-font-smoothing: antialiased;

  clip-path: ${(props: IIconProps) =>
    (props.pathAnimation ? 'inset(0 0 0 0)' : 'inset(100% 50% 0 50%)')};
  transform: ${props => (!props.scaleAnimation ? 'scale(1)' : 'scale(0)')};
  ${props => (props.theme === Theme.Light ? icons.invertColors() : '')}
  transition: ${props => props.transition};
  background-image: ${`url(${checkIcon})`};
  ${images.center('22px', 'auto')}
`;
