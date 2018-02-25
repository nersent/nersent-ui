import styled from "styled-components";

import UserSelections from "../../mixins/user-selection";

const Container = styled.div`
  margin: 64px;
  padding: 8px;
  display: flex;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  ${UserSelections.noUserSelect()}
`;

export default Container;
