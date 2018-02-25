import styled, { StyledFunction } from "styled-components";

import transparency from "../../defaults/transparency";
import Align from "../../enums/align";
import Theme from "../../enums/theme";

import positioning from "../../mixins/positioning";
import typography from "../../mixins/typography";

interface IProps {
  disabled: boolean;
  theme: Theme;
}

const div: StyledFunction<IProps & React.HTMLProps<HTMLDivElement>> =
  styled.div;

const Text = div`
  position: relative;
  z-index: 2;
  opacity: ${props =>
    props.disabled
      ? transparency[props.theme].button.text.disabled
      : transparency[props.theme].text.primary};
  ${typography.button()};
  ${positioning.center(Align.CenterHorizontal)}
`;

export default Text;
