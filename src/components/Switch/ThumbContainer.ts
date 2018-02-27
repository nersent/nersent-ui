import styled from "styled-components";

import { withProps } from "../../utils/with-props";

import Align from "../../enums/align";
import Positioning from "../../mixins/positioning";

interface IProps {
  toggled: boolean;
  left: number;
}

const ThumbContainer = withProps<IProps>()(styled.div)`
  position: absolute;
  left: ${props => props.left}px;
  transition: 0.25s left ease-out;
  ${Positioning.center(Align.CenterVertical)}
`;

export default ThumbContainer;
