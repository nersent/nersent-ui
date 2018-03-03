import styled from "styled-components";

import transparency from "../../defaults/transparency";
import { withProps } from "../../utils/with-props";

interface IProps {
  x?: boolean;
}

const Input = withProps<IProps>()(styled.input)`
  width: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  -webkit-text-fill-color: transparent;
  background-color: transparent;
  text-shadow: 0px 0px 0px rgba(0,0,0,${transparency.light.text.primary});
  padding-top: 8px;
  padding-bottom: 8px;

  &:focus {
    outline: none;
  }
`;

export default Input;
