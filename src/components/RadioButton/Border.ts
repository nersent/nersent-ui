import styled from "styled-components";

const Border = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(0,0,0,0.54);
  box-sizing: border-box;
  transition: 0.1s border-color, 0.3s border-width ease-out;
`;

export default Border;
