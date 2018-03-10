import styled from "styled-components";

import { withProps } from "../../utils/with-props";

import Theme from "../../enums/theme";

import icons from "../../mixins/icons";
import images from "../../mixins/images";

const checkIcon = require("../../images/Controls/check.svg");

interface IProps {
  transition: string;
  pathAnimation: boolean;
  scaleAnimation: boolean;
  theme: Theme;
}

const Icon = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${checkIcon});
  clip-path: inset(${props =>
    props.pathAnimation ? "0 0 0 0" : "100% 50% 0 50%"});
  -webkit-font-smoothing: antialiased;
  transform: scale(${props => (!props.scaleAnimation ? 1 : 0)});
  transition: ${props => props.transition};
  ${images.center("22px", "auto")}
  ${props => (props.theme === Theme.Light ? icons.invertColors() : "")}
`;

export default Icon;
