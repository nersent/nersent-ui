import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  toggled: boolean;
  color: string;
}

const Track = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: 0.2s opacity, 0.2s background-color;
  opacity: ${props => !props.toggled ? 0.38 : 0.50};
  background-color: ${props => !props.toggled ? "#000" : props.color};
`;

export default Track;
