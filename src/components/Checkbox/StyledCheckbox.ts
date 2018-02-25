import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  scaleAnimation: boolean;
}

const StyledCheckbox = withProps<IProps>()(styled.div)`
  width: 18px;
  height: 18px;
  position: relative;
  transform: translate3d(0, 0, 0) scale(${props => !props.scaleAnimation ? 1 : 0.92}) translateZ(0);
  transition: 0.4s transform;
  -webkit-font-smoothing: subpixel-antialiased;
`;

export default StyledCheckbox;
