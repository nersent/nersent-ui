import styled from "styled-components";

import Theme from "../../enums/theme";
import { withProps } from "../../utils/with-props";

interface IProps {
  theme: Theme;
}

const getBackgroundColor = (props) => {
  return props.theme === Theme.Light ? "rgba(0,0,0,0.42)" : "rgba(255,255,255,0.70)";
};

const Line = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 1px;
  background-color: ${props => getBackgroundColor(props)};
`;

export default Line;
