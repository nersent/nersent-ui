import styled from "styled-components";

import Theme from "../../enums/theme";

import transparency from "../../defaults/transparency";
import { withProps } from "../../utils/with-props";

interface IProps {
  color: string;
  top: boolean;
  focused: boolean;
  error: boolean;
  errorColor: string;
  theme: Theme;
  disabled: boolean;
}

const getColor = (props) => {
  if (props.error) {
    return props.errorColor;
  } else if (!props.focused || props.disabled) {
    return props.theme === Theme.Light ? "#000" : "#fff";
  }

  return props.color;
};

const getOpacity = (props) => {
  if (props.disabled) {
    return props.theme === Theme.Light ? transparency.light.text.disabled : transparency.dark.text.disabled;
  } else if (props.error || props.focused) {
    return transparency.light.text.primary;
  } else if (props.theme === Theme.Dark) {
    return transparency.dark.text.secondary;
  }

  return transparency.light.text.secondary;
};

const Label = withProps<IProps>()(styled.div)`
  font-size: ${props => !props.top ? 16 : 12}px;
  color: ${props => getColor(props)};
  opacity: ${props => getOpacity(props)};
  position: absolute;
  top: ${props => !props.top ? 20 : 0}px;
  transition: 0.2s top ease-out, 0.2s font-size, 0.2s opacity, 0.2s color;
`;

export default Label;
