import React from "react";

import colors from "../../defaults/colors";

import RadioButton from "../RadioButton";
import StyledRadioButtons from "./StyledRadioButtons";

interface IProps {
  className?: string;
  style?: {};
}

export default class RadioButtons extends React.Component<IProps, {}> {
  private radioButtons = [];

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
              ref: (r) => { this.radioButtons.push(r);  },
            });
          })
        }
      </StyledRadioButtons>
    );
  }
}
