import styled from "styled-components";

import { withProps } from "../../utils/with-props";

import Shadows from "../../mixins/shadows";

interface IProps {
  toggled: boolean;
  color: string;
}

const Thumb = withProps<IProps>()(styled.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: 0.2s transform, 0.2s background-color;
  background-color: ${props => !props.toggled ? "#FAFAFA" : props.color};
  box-shadow: ${Shadows[2]}
`;

export default Thumb;
