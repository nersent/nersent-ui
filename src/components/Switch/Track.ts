import styled from "styled-components";

import Theme from "../../enums/theme";
import { withProps } from "../../utils/with-props";

interface IProps {
  toggled: boolean;
  disabled: boolean;
  color: string;
  theme: Theme;
}

const getBackgroundColor = (props) => {
  const {
    disabled,
    toggled,
    color,
    theme,
  } = props;

  if (disabled) {
    if (props.theme === Theme.Light) {
      return "rgba(0,0,0,0.12)";
    } else {
      return "rgba(255,255,255,0.10)";
    }
  } else if (!toggled) {
    if (props.theme === Theme.Light) {
      return "rgba(0,0,0,0.38)";
    } else {
      return "rgba(255,255,255,0.30)";
    }
  } else {
    return color;
  }
};

const Track = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: 0.2s opacity, 0.2s background-color;
  opacity: ${props => props.toggled ? 0.50 : 1};
  background-color: ${props => getBackgroundColor(props)};
`;

export default Track;
