import styled from "styled-components";

import Align from "../../enums/align";
import Positioning from "../../mixins/positioning";

const Border = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  position: relative;
  border-radius: 100%;
  background-color: #2196F3;
  visibility: hidden;
  transition: 0.1s background-color, 0.2s width ease-out, 0.2s height ease-out;
  ${Positioning.center(Align.CenterBoth)}
`;

export default Border;
