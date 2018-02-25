import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  disabled: boolean;
  color: string;
}

const StyledCheckbox = withProps<IProps>()(styled.div)`
  margin: 64px;
  width: 18px;
  height: 18px;
  position: relative;
  transition: 0.4s transform;
`;

export default StyledCheckbox;
