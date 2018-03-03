import styled from "styled-components";

import transparency from "../../defaults/transparency";
import { withProps } from "../../utils/with-props";

interface IProps {
  error: boolean;
  errorColor: string;
}

const getColor = (props) => {
  return !props.error ? "#000" : props.errorColor;
};

const getOpacity = (props) => {
  return !props.error ? transparency.light.text.secondary : transparency.light.text.primary;
};

const HelperText = withProps<IProps>()(styled.div)`
  margin-top: 8px;
  font-size: 12px;
  color: ${props => getColor(props)};
  opacity: ${props => getOpacity(props)};
  transition: 0.2;s; opacity, 0.2;s; color;
`;

export default HelperText;
