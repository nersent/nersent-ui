import styled, { keyframes } from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
  opacity: number;
}

const getSize = ({ height, width }) => {
  return Math.max(width, height);
};

const StyledRipple = withProps<IProps>()(styled.div)`
  position: absolute;
  background-color: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.x};
  top: ${props => props.y};
  transform: translate3d(-50.1%, -50.1%, 0);
  height: ${props => getSize(props)}px;
  width: ${props => getSize(props)}px;
  opacity: ${props => props.opacity};
  transition: 0.3s width, 0.3s height, 0.3s opacity;
`;

export default StyledRipple;
