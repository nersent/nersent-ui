import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";

import Border from "./Border";
import Circle from "./Circle";
import Container from "./Container";
import StyledRadioButton from "./StyledRadioButton";
import Text from "./Text";

interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  color?: string;
  theme?: Theme;
  onToggle?: (flag: boolean, component?: any, fromProps?: boolean) => void;
}

interface IState {
  toggled: boolean;
  borderAnimations: boolean;
  fullBorderSize: boolean;
  circleVisible: boolean;
  fullCircleSize: boolean;
  isAnimation: boolean;
}

export default class RadioButton extends React.Component<IProps, IState> {
  public static defaultProps = {
    color: colors.blue["500"],
  };

  public state: IState = {
    toggled: false,
    borderAnimations: true,
    fullBorderSize: false,
    circleVisible: false,
    fullCircleSize: true,
    isAnimation: false,
  };

  private timeouts = [];

  public render() {
    const {
      className,
      children,
      theme,
      disabled,
    } = this.props;

    return (
      <Container>
        <div style={{position: "relative"}}>
          <StyledRadioButton>
            <Border />
            <Circle />
          </StyledRadioButton>
        </div>
        {children != null &&
          <Text theme={theme} disabled={disabled}>
            {children}
          </Text>
        }
      </Container>
    );
  }
}
