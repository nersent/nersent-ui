import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  color: string;
  top: boolean;
  focused: boolean;
}

const Label = withProps<IProps>()(styled.div)`
  font-size: ${props => !props.top ? 16 : 12}px;
  color: ${props => !props.focused ? "#000" : props.color};
  opacity: ${props => !props.focused ? 0.54 : 0.87};
  position: absolute;
  top: ${props => !props.top ? 20 : 0}px;
  transition: 0.2s top ease-out, 0.2s font-size, 0.2s opacity, 0.2s color;
`;

export default Label;
