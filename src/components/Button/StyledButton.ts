import styled from "styled-components";

import { withProps } from "../../utils/with-props";

import buttons from "../../defaults/buttons";
import transparency from "../../defaults/transparency";

import shadows from "../../mixins/shadows";
import userSelection from "../../mixins/user-selection";

const getBackgroundColor = props => {
  if (props.disabled) {
    if (props.raised) {
      return `rgba(0, 0, 0, ${transparency[props.theme].button.disabled})`;
    }
  }
  return props.backgroundColor;
};

interface IProps {
  disabled: boolean;
  raised: boolean;
  color: string;
  backgroundColor: string;
  dialog: boolean;
}

const StyledButton = withProps<IProps>()(styled.div)`
  position: relative;
  padding: 0 16px 0 16px;
  text-transform: uppercase;
  float: left;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  color: ${props => (props.disabled ? "#000" : props.color)};
  background-color: ${props => getBackgroundColor(props)};
  box-shadow: ${props =>
    props.raised && !props.disabled ? shadows[buttons.elevation] : "none"};
  border-radius: ${buttons.cornerRadius}px;
  min-width: ${props => (props.dialog ? 0 : buttons.minWidth)}px;
  height: ${buttons.height}px;
  ${userSelection.noUserSelect()}
  ${userSelection.noTapHighlight()}
  overflow: hidden;
  transition: 0.3s box-shadow;

  &:hover {
    box-shadow: ${props => (props.raised ? shadows[buttons.hoveredElevation] : "none")};
  }

  &:active {
    box-shadow: ${props => (props.raised ? shadows[buttons.pressedElevation] : "none")};
  }
`;

export default StyledButton;
