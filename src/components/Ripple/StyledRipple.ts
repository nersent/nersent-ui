import styled, { keyframes } from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
  opacity: number;
  rippleTime: number;
  fadeOutTime: number;
  unit: string;
}

const getSize = ({ height, width }) => {
  return Math.max(width, height);
};

const getWidth = ({ x, width }) => {
  if (width === 0) {
    return 0;
  }

  if (x > width / 2) {
    return 2 * x + 10;
  }

  return 2 * width - 2 * x + 10;
};

const easing = "cubic-bezier(0.19, 1, 0.22, 1)";

const StyledRipple = withProps<IProps>()(styled.div)`
  position: absolute;
  background-color: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.x + props.unit};
  top: ${props => props.y + props.unit};
  transform: translate3d(-50.1%, -50.1%, 0);
  height: ${props => getWidth(props)}px;
  width: ${props => getWidth(props)}px;
  opacity: ${props => props.opacity};
  transition: ${props => props.rippleTime}s width ${easing},
    ${props => props.rippleTime}s height ${easing},
    ${props => props.fadeOutTime}s opacity;
  overflow: hidden;
  pointer-events: none;
`;

export default StyledRipple;
