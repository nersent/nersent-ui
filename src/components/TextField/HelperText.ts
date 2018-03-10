import styled from "styled-components";

import transparency from "../../defaults/transparency";
import Theme from "../../enums/theme";
import { withProps } from "../../utils/with-props";

interface IProps {
  theme: Theme;
  error: boolean;
  errorColor: string;
  disabled: boolean;
}

const getColor = props => {
  if (props.error) {
    return props.errorColor;
  }

  return props.theme === Theme.Light ? "#000" : "#fff";
};

const getOpacity = props => {
  if (props.disabled) {
    return props.theme === Theme.Light
      ? transparency.light.text.disabled
      : transparency.dark.text.disabled;
  } else if (props.error) {
    return transparency.light.text.primary;
  }

  return props.theme === Theme.Light
    ? transparency.light.text.secondary
    : transparency.dark.text.secondary;
};

const HelperText = withProps<IProps>()(styled.div)`
  margin-top: 8px;
  font-size: 12px;
  color: ${props => getColor(props)};
  opacity: ${props => getOpacity(props)};
  transition: 0.2s opacity, 0.2s color;
`;

export default HelperText;
