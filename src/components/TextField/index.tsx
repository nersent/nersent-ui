import * as React from "react";

// Defaults
import colors from "../../defaults/colors";

/// Enums
import Theme from "../../enums/theme";

// Styles
import {
  FocusLine,
  HelperText,
  Input,
  Label,
  Line,
  StyledTextField
} from "./styles";

export interface IProps {
  className?: string;
  style?: {};
  disabled?: boolean;
  theme?: Theme;
  color?: string;
  label?: string;
  helperText?: string;
  errorColor?: string;
  errorReason?: string;
  value?: string;
  validate?: (value: string, submit: boolean) => void;
  type?: string;
  fontSize?: number;
}

export interface IState {
  focused: boolean;
  filled: boolean;
  error: boolean;
}

export default class TextField extends React.Component<IProps, IState> {
  public static defaultProps = {
    disabled: false,
    color: colors.blue["500"],
    theme: Theme.Light,
    errorColor: "#FF1744",
    type: "text",
    fontSize: 16
  };

  public state: IState = {
    focused: false,
    filled: false,
    error: false
  };

  private input: HTMLInputElement;

  public componentDidMount() {
    setTimeout(() => {
      const { value } = this.props;

      if (this.props.value != null) {
        this.input.value = value;
        this.toggle(true);
      }
    });
  };

  public onFocus = () => {
    if (this.props.disabled) {
      return;
    }
    this.toggle(true);
  };

  public onBlur = () => {
    if (this.props.disabled) {
      return;
    }
    this.validate(true);

    this.toggle(false);
  };

  public onLabelClick = () => {
    const {
      focused,
      filled
    } = this.state;

    if (!focused && !filled) {
      this.input.focus();
    }
  };

  public toggle = (flag: boolean) => {
    const isInputEmpty = this.input.value.length === 0;

    this.setState({
      filled: !isInputEmpty,
      focused: flag
    });
  };

  /**
   * @param submit - if false then its from typing.
   */
  public validate(submit: boolean) {
    const { validate } = this.props;

    if (typeof validate === "function") {
      setTimeout(() => {
        const isCorrect = validate(this.input.value, submit);

        this.setState({ error: !isCorrect });
      });
    }
  };

  public onKeyDown = e => {
    this.validate(e.key === "Enter");
  };

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
      errorReason,
      type,
      fontSize
    } = this.props;

    const { focused, filled, error } = this.state;

    return (
      <StyledTextField hint={label.length > 0} className={className} style={style}>
        {label != null && (
          <Label
            color={color}
            top={focused || filled}
            focused={focused}
            error={error}
            errorColor={errorColor}
            theme={theme}
            disabled={disabled}
            onClick={this.onLabelClick}
          >
            {label}
          </Label>
        )}
        <Input
          type={type}
          disabled={disabled}
          color={color}
          theme={theme}
          error={error}
          errorColor={errorColor}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          spellCheck={false}
          isDisabled={disabled}
          style={{ fontSize }}
          innerRef={r => (this.input = r)}
        />
        <Line theme={theme} disabled={disabled} />
        <FocusLine
          color={color}
          focused={focused}
          error={error}
          errorColor={errorColor}
          disabled={disabled}
        />
        {((helperText != null || error) && !disabled) && (
          <HelperText
            theme={theme}
            error={error}
            errorColor={errorColor}
            disabled={disabled}
          >
            {!error ? helperText : errorReason}
          </HelperText>
        )}
      </StyledTextField>
    );
  }
}
