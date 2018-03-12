import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Utils
import { getComponentForeground } from "../../utils/component-color";

// Enums
import Theme from "../../enums/theme";

// Mixins
import { getForegroundColor } from "utils/colors";
import typography from "../../mixins/typography";

export interface IProps {
  disabled: boolean;
  theme: Theme;
}

export default styled.div`
  margin-left: 8px;
  margin-right: 24px;
  font-size: 15px;
  ${typography.body2()};
  opacity: ${(props: IProps) => 1};
  color: ${props => getComponentForeground(props.disabled, props.theme)};
`;
