import styled from "styled-components";

import transparency from "../../defaults/transparency";

const OverShade = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${props => props.color};
  opacity: 0;
  transition: 0.25s opacity;

  &:hover {
    opacity: ${props => transparency[props.theme].button.focused};
  }
`;

export default OverShade;
