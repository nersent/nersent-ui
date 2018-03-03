import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {

}

const Line = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 1px;
  background-color: rgba(0,0,0,0.42);
`;

export default Line;
