import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  focused: boolean;
  color: string;
}

const FocusLine = withProps<IProps>()(styled.div)`
  width: ${props => !props.focused ? 0 : 100}%;
  height: 2px;
  margin-top: -1.5px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${props => props.color};
  transition: 0.2s width ease-out, 0.2s background-color;
`;

export default FocusLine;
