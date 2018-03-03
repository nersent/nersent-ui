import React from "react";

import colors from "../../defaults/colors";

import Theme from "../../enums/theme";

import FocusLine from "./FocusLine";
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
            focused={focused}>
            {label}
          </Label>
        }
        <Input
          type="text"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          spellCheck={false}
          innerRef={r => (this.input = r)} />
        <Line />
        <FocusLine
          color={color}
          focused={focused} />
      </StyledTextField>
    );
  }
}
