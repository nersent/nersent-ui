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
  transition: string;
}

const Border = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 100%;
  border-width: ${props => props.borderWidth}px;
  border-color: ${props =>
    componentColor(props.color, props.checked, props.disabled, props.theme)};
  border-style: solid;
  border-radius: 3px;
  box-sizing: border-box;
  transition: ${props => props.transition};
`;

export default Border;
