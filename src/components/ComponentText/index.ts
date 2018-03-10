import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

import { componentForeground } from "../../utils/component-color";

import Theme from "../../enums/theme";
import typography from "../../mixins/typography";

export interface IProps {
  disabled: boolean;
  theme: Theme;
}

export default styled.div`
  margin-left: 8px;
  margin-right: 24px;
  font-size: 15px;
  color: ${(props: IProps) => componentForeground(props.disabled, props.theme)};
  ${typography.body2()}
`;