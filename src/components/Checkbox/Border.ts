import styled from "styled-components";

import { componentColor } from "../../utils/component-color";
import { withProps } from "../../utils/with-props";

import transparency from "../../defaults/transparency";
import Theme from "../../enums/theme";

interface IProps {
  checked: boolean;
  color: string;
  borderWidth: number;
  disabled: boolean;
  theme: Theme;
}

const Border = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 100%;
  border-width: ${props => props.borderWidth}px;
  border-color: ${props => componentColor(props.color, props.checked, props.disabled, props.theme)};
  border-style: solid;
  border-radius: 3px;
  box-sizing: border-box;
  transition: 0.1s border-color, 0.4s border-width cubic-bezier(0.19, 1, 0.22, 1);
`;

export default Border;
