import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  borderWidth: number;
  animations: boolean;
  color: string;
}

const Border = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border-width: ${props => props.borderWidth}px;
  border-style: solid;
  border-color: ${props => props.color};
  box-sizing: border-box;
  transition: ${props =>
    props.animations ? "0.1s border-color, 0.3s border-width ease-out" : ""};
`;

export default Border;
