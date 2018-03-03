import styled from "styled-components";

import Theme from "../../enums/theme";

import transparency from "../../defaults/transparency";
import { withProps } from "../../utils/with-props";

interface IProps {
  color: string;
  theme: Theme;
  error: boolean;
  errorColor: string;
}

const getTextColor = (props) => {
  const color = props.theme === Theme.Light ? 0 : 255;
  return `0px 0px 0px rgba(${color},${color},${color},${transparency.light.text.primary})`;
};

const getCursorColor = (props) => {
  return !props.error ? props.color : props.errorColor;
};

const Input = withProps<IProps>()(styled.input)`
  width: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  -webkit-text-fill-color: transparent;
  background-color: transparent;
  text-shadow: ${props => getTextColor(props)};
  padding-top: 8px;
  padding-bottom: 8px;
  color: ${props => getCursorColor(props)};

  &:focus {
    outline: none;
  }
`;

export default Input;
