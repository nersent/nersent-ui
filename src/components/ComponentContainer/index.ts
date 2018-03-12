import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";

// Mixins
import Cursors from "../../mixins/cursors";

export default styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  ${Cursors.pointer()};
`;
