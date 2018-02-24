import styled, { StyledFunction } from "styled-components";

import transparency from "../../defaults/transparency";
import Theme from "../../enums/theme";

import typography from "../../mixins/typography";

interface IProps {
  disabled: boolean;
  theme: Theme;
}

const div: StyledFunction<IProps & React.HTMLProps<HTMLDivElement>> =
  styled.div;

const Text = div`
  opacity: ${props =>
    (props.disabled
      ? transparency[props.theme].button.text.disabled
      : transparency[props.theme].text.primary)};
  ${typography.button()};
`;

export default Text;
