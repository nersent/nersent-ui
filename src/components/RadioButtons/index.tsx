import React from "react";

import colors from "../../defaults/colors";

import RadioButton from "../RadioButton";
import StyledRadioButtons from "./StyledRadioButtons";

interface IProps {
  className?: string;
  style?: {};
  onToggle?: (index: number, radioButton?: RadioButton, component?: RadioButtons, fromProps?: boolean) => void;
}

export default class RadioButtons extends React.Component<IProps, {}> {
  private radioButtons = [];
  private latest: RadioButton;

  public componentDidMount() {
    setTimeout(() => {
      for (const radioButton in this.radioButtons) {
        if (this.radioButtons[radioButton].props.toggled) {
          this.toggle(this.radioButtons[radioButton], true);
        }
      }
    });
  }

  public onClick = (e, component) => {
    this.toggle(component);
  }

  public toggle(radiobutton: RadioButton, fromProps = false) {
    if (this.latest === radiobutton || radiobutton.props.disabled && !fromProps) { return; }

    if (this.latest != null) { this.latest.toggle(false); }
    radiobutton.toggle(true);

    this.latest = radiobutton;

    const onToggle = this.props.onToggle;

    if (typeof onToggle === "function") {
      onToggle(this.radioButtons.indexOf(radiobutton), radiobutton, this, fromProps);
    }
  }

  public render() {
    const {
      className,
      style,
      children,
    } = this.props;

    this.radioButtons = [];

    return (
      <StyledRadioButtons
        className={className}
        style={style}
      >
        {
          React.Children.map(children, (child?: any) => {
            return React.cloneElement(child, {
              ref: (r) => { this.radioButtons.push(r); },
              onClick: this.onClick,
            });
          })
        }
      </StyledRadioButtons>
    );
  }
}
