import * as React from "react";

import { StyledSeparator } from "./styles";

export interface IProps {
  hide?: boolean;
}

export default class MenuSeparator extends React.Component<IProps, {}> {
  public render() {
    const { hide } = this.props;

    return <StyledSeparator hide={hide} />;
  }
}
