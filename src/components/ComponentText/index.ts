import React from "react";
import styled, { StyledComponentClass } from "styled-components";

import { componentForeground } from "../../utils/component-color";

import typography from "../../mixins/typography";

import Theme from "../../enums/theme";

export interface IProps {
  disabled: boolean;
  theme: Theme;
}

const ComponentText = styled.div`
  margin-left: 8px;
  margin-right: 24px;
  font-size: 15px;
  color: ${(props: IProps) => componentForeground(props.disabled, props.theme)};
  ${typography.body2()}
`;

export default ComponentText;
