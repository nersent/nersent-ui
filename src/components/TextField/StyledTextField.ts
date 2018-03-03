import styled from "styled-components";

import typography from "../../mixins/typography";

const StyledTextField = styled.div`
  position: relative;
  width: 196px;
  padding-top: 12px;
  user-select: none;
  cursor: text;
  ${typography.robotoRegular()};
`;

export default StyledTextField;
