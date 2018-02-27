import styled from "styled-components";

import { componentForeground } from "../../utils/component-color";
import { withProps } from "../../utils/with-props";

import typography from "../../mixins/typography";

import Theme from "../../enums/theme";

interface IProps {
  disabled: boolean;
  theme: Theme;
}

const Text = withProps<IProps>()(styled.div)`
  margin-left: 8px;
  margin-right: 24px;
  font-size: 15px;
  color: ${props => componentForeground(props.disabled, props.theme)};
  ${typography.body2()}
`;

export default Text;
