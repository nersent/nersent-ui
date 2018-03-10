import styled from "styled-components";

import { withProps } from "../../utils/with-props";

import Align from "../../enums/align";
import Positioning from "../../mixins/positioning";

interface IProps {
  size: number;
  visible: boolean;
  color: string;
}

const Border = withProps<IProps>()(styled.div)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: absolute;
  position: relative;
  border-radius: 100%;
  background-color: ${props => props.color};
  visibility: ${props => (props.visible ? "visible" : "hidden")};
  transition: 0.1s background-color, 0.2s width ease-out, 0.2s height ease-out;
  ${Positioning.center(Align.CenterBoth)}
`;

export default Border;
