import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  focused: boolean;
  error: boolean;
  errorColor: string;
  color: string;
  disabled: boolean;
}

const getWidth = (props) => {
  return !props.focused && !props.error || props.disabled ? 0 : 100;
};

const getBackgroundColor = (props) => {
  return props.error ? props.errorColor : props.color;
};

const FocusLine = withProps<IProps>()(styled.div)`
  width: ${props => getWidth(props)}%;
  height: 2px;
  margin-top: -1.5px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${props => getBackgroundColor(props)};
  transition: 0.2s width ease-out, 0.2s background-color;
`;

export default FocusLine;
