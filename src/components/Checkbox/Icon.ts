import styled from "styled-components";

import { withProps } from "../../utils/with-props";

const checkIcon = require("../../images/Controls/check.svg");

import icons from "../../mixins/icons";
import images from "../../mixins/images";

interface IProps {
  transform: string;
  transition: string;
  iconPathAnimation: boolean;
}

const Icon = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${checkIcon});
  clip-path: inset(${props => props.iconPathAnimation ? "0 0 0 0" : "100% 50% 0 50%"});
  -webkit-font-smoothing: antialiased;
  transform: ${props => props.transform};
  transition: ${props => props.transition};
  ${images.center("22px", "auto")}
  ${icons.invertColors()}
`;

export default Icon;
