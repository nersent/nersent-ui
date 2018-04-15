import * as React from 'react';

// Mixins
import Cursors from '../../mixins/cursors';

const styled = require('styled-components').default;

export interface IContainerProps {
  disabled?: boolean;
}

export default styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  -webkit-font-smoothing: antialiased;

  ${(props: IContainerProps) => props.disabled && 'pointer-events: none;'};
  ${Cursors.pointer()};
`;
