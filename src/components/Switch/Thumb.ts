import styled from "styled-components";

import { withProps } from "../../utils/with-props";

import Theme from "../../enums/theme";
import Shadows from "../../mixins/shadows";

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
    if (theme === Theme.Light) {
      return "#BDBDBD";
    } else {
      return "#424242";
    }
  } else if (!toggled) {
    if (theme === Theme.Light) {
      return "#FAFAFA";
    } else {
      return "#BDBDBD";
    }
  } else {
    return color;
  }
};

const Thumb = withProps<IProps>()(styled.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: 0.2s transform, 0.2s background-color;
  background-color: ${props => getBackgroundColor(props)};
  box-shadow: ${Shadows[2]}
`;

export default Thumb;
