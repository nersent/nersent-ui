import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Utils
// import { componentForeground } from "../../utils/component-color";

// Enums
import Theme from "../../enums/theme";

// Mixins
import typography from "../../mixins/typography";

export interface IProps {
  disabled: boolean;
  theme: Theme;
}

//  color: ${(props: IProps) => componentForeground(props.disabled, props.theme)};
export default styled.div`
  margin-left: 8px;
  margin-right: 24px;
  font-size: 15px;
  ${typography.body2()}
`;
