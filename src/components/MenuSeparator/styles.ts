import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import transparency from "../../defaults/transparency";

export const StyledSeparator = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, ${transparency.light.dividers});
  height: 1px;
  width: 100%;
`;
