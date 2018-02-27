import styled from "styled-components";

import { withProps } from "../../utils/with-props";

import Shadows from "../../mixins/shadows";

interface IProps {
  toggled: boolean;
  disabled: boolean;
  color: string;
}

const getBackgroundColor = (props) => {
  const {
    disabled,
    toggled,
    color,
  } = props;

  if (disabled) {
    return "#BDBDBD";
  } else if (!toggled) {
    return "#FAFAFA";
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
