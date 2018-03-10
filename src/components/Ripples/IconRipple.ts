import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  width: number;
  height: number;
  color: string;
}

const getBackgroundColor = color => {
  const opacityHex = 14; // 0.8

  if (color.startsWith("#")) {
    if (color.length >= 7) {
      return `${color}${opacityHex}`;
    } else if (color.length === 4) {
      return `${color}${color.substring(1)}${opacityHex}`;
    }
  }

  return color;
};

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
      return `
        background-color: ${getBackgroundColor(props.color)};
      `;
    }}
  }
`;

export default IconRipple;
