import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  x?: boolean;
}

const Label = withProps<IProps>()(styled.div)`
  font-size: 16px;
  color: #000;
  opacity: 0.54;
  position: absolute;
  top: 20px;
  transition: 0.2s top ease-out, 0.2s font-size, 0.2s opacity, 0.2s color;
`;

export default Label;
