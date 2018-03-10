import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  scaleAnimation: boolean;
}

const StyledRadioButton = withProps<IProps>()(styled.div)`
  width: 18px;
  height: 18px;
  position: relative;
  transform: scale(${props => (!props.scaleAnimation ? 1 : 0.9)});
  transition: 0.2s transform ease-out;
`;

export default StyledRadioButton;
