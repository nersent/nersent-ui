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

const getHighestSize = ({ height, width }) => {
  return Math.max(width, height);
};

const getSize = (x, size, y = 0, height = 0) => {
  if (size === 0) {
    return 0;
  }

  if (x > size / 2) {
    return 2 * x + Math.abs(y - height / 2);
  }

  return 2 * size - 2 * x + Math.abs(y - height / 2);
};

const easing = "cubic-bezier(0.215, 0.61, 0.355, 1)";

const StyledRipple = withProps<IProps>()(styled.div)`
  position: absolute;
  background-color: ${props => props.color};
  border-radius: 50%;
  ${props => {
    let x = props.x;
    if (props.x > props.width) {
      x = props.width;
    }

    const width = getSize(x, getHighestSize(props), props.y, props.height);
    const height = getSize(props.y, getHighestSize(props), props.x, props.width);

    const size = getHighestSize({ height, width });

    return `
      left: ${x}px;
      top: ${props.y}px;
      height: ${size}px;
      width: ${size}px;
    `;
  }};
  transform: translate3d(-50.1%, -50.1%, 0);
  opacity: ${props => props.opacity};
  transition: ${props => props.rippleTime}s width ${easing},
    ${props => props.rippleTime}s height ${easing},
    ${props => props.fadeOutTime}s opacity,
    0.3s background-color;
  overflow: hidden;
  pointer-events: none;
`;

export default StyledRipple;
