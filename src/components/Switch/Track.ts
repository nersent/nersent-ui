import styled from "styled-components";

import { withProps } from "../../utils/with-props";

interface IProps {
  toggled: boolean;
  disabled: boolean;
  color: string;
}

const getOpacity = (props) => {
  const {
    toggled,
    disabled,
  } = props;

  if (disabled) {
    return 0.12;
  } else if (!toggled) {
    return 0.38;
  } else {
    return 0.50;
  }
};

const Track = withProps<IProps>()(styled.div)`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  transition: 0.2s opacity, 0.2s background-color;
  opacity: ${props => getOpacity(props)};
  background-color: ${props => !props.toggled ? "#000" : props.color};
`;

export default Track;
