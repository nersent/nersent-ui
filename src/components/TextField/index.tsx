import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";

import FocusLine from "./FocusLine";
import HelperText from "./HelperText";
import Input from "./Input";
import Label from "./Label";
import Line from "./Line";
import StyledTextField from "./StyledTextField";

interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  theme?: Theme;
  color?: string;
  label?: string;
  helperText?: string;
  errorColor?: string;
}

interface IState {
  focused: boolean;
  filled: boolean;
  error: boolean;
  errorReason: string;
}

export default class TextField extends React.Component<IProps, IState> {
  public static defaultProps = {
    disabled: false,
    color: colors.blue["500"],
    theme: Theme.Light,
    errorColor: "#FF1744",
  };

  public state: IState = {
    focused: false,
    filled: false,
    error: false,
    errorReason: "",
  };

  private input: HTMLInputElement;

  public onFocus = () => {
    this.toggle(true);
  }

  public onBlur = () => {
    // this.validate();
    this.setState({
     // error: true,
      errorReason: "Error message",
    });

    this.toggle(false);
  }

  public toggle = (flag: boolean) => {
    const isInputEmpty = this.input.value.length === 0;

    this.setState({
      filled: !isInputEmpty,
      focused: flag,
    });
  }

  public render() {
    const {
      className,
      style,
      disabled,
      theme,
      children,
      color,
      label,
      helperText,
      errorColor,
    } = this.props;

    const {
      focused,
      filled,
      error,
      errorReason,
    } = this.state;

    return (
      <StyledTextField className={className} style={style}>
        {label != null &&
          <Label
            color={color}
            top={focused || filled}
            focused={focused}
            error={error}
            errorColor={errorColor}
            theme={theme}>
            {label}
          </Label>
        }
        <Input
          type="text"
          color={color}
          theme={theme}
          error={error}
          errorColor={errorColor}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          spellCheck={false}
          innerRef={r => (this.input = r)} />
        <Line theme={theme} />
        <FocusLine
          color={color}
          focused={focused}
          error={error}
          errorColor={errorColor} />
        {(helperText != null || error) &&
          <HelperText
            theme={theme}
            error={error}
            errorColor={errorColor}>
            {!error ? helperText : errorReason}
          </HelperText>
        }
      </StyledTextField>
    );
  }
}
