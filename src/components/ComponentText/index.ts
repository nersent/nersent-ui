import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';
import Theme from '../../enums/theme';
import typography from '../../mixins/typography';
import { getForegroundColor } from '../../utils/colors';
import { getComponentForeground } from '../../utils/component-color';

export interface IProps {
  disabled: boolean;
  theme: Theme;
}

export default styled.div`
  margin-left: 8px;
  margin-right: 24px;
  font-size: 15px;

  opacity: ${(props: IProps) => 1};
  color: ${props => getComponentForeground(props.disabled, props.theme)};
  ${typography.body2()};
`;
