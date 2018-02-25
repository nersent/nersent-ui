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
}

const getSize = ({ height, width }) => {
  return Math.max(width, height);
};

const getWidth = ({ x, width }) => {
  if (width === 0) {
    return 0;
  }

  if (x > width / 2) {
    return  width + width - (width - x) + 10;
  }

  return width + width - x + 10;
};

const StyledRipple = withProps<IProps>()(styled.div)`
  position: absolute;
  background-color: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: translate3d(-50.1%, -50.1%, 0);
  height: ${props => getWidth(props)}px;
  width: ${props => getWidth(props)}px;
  opacity: ${props => props.opacity};
  transition: ${props => props.rippleTime}s width,
    ${props => props.rippleTime}s height,
    ${props => props.fadeOutTime}s opacity;
  overflow: hidden;
  pointer-events: none;
`;

export default StyledRipple;
