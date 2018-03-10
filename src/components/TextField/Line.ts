import styled from "styled-components";

import Theme from "../../enums/theme";
import { withProps } from "../../utils/with-props";

interface IProps {
  theme: Theme;
  disabled: boolean;
}

const getBackgroundColor = props => {
  return props.theme === Theme.Light
    ? "rgba(0,0,0,0.42)"
    : "rgba(255,255,255,0.70)";
};

const Line = withProps<IProps>()(styled.div)`
  width: 100%;
  height: ${props => (!props.disabled ? 1 : 0)}px;
  ${props =>
    !props.disabled && `background-color: ${getBackgroundColor(props)};`}
  ${props =>
    props.disabled && `border: 1px dashed ${getBackgroundColor(props)};`}
`;

export default Line;
