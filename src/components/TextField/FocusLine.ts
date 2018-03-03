import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  x?: boolean;
}

const FocusLine = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 2px;
  margin-top: -1.5px;
  margin-left: auto;
  margin-right: auto;
  transition: 0.2s width ease-out, 0.2s background-color;
`;

export default FocusLine;
