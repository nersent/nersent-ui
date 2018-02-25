import styled from "styled-components";

import { withProps } from "../../utils/with-props";

import { hexToRgb } from "../../utils/colors";

interface IProps {
  width: number;
  height: number;
  color: string;
}

const IconRipple = withProps<IProps>()(styled.div)`
  position: absolute;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  left: ${props => props.width / 2}px;
  top: ${props => props.height / 2}px;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: 0.2s background-color;

  &:hover {
    ${props => {
      const rgb = hexToRgb(props.color);
      return `
        background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08);
      `;
    }}
  }
`;

export default IconRipple;
