import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import typography from "../../mixins/typography";
import userSelection from "../../mixins/user-selection";
import transparency from "../../defaults/transparency";

export interface IMenuItemProps {
  visible: boolean;
}

export const StyledMenuItem = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: 0.2s opacity;

  opacity: ${(props: IMenuItemProps) => (props.visible ? 1 : 0)};

  &:hover {
    background-color: #eee;
  }

  &:first-child {
    margin-top: 8px;
  }

  &:last-child {
    margin-bottom: 8px;
  }
`;

export const Title = styled.div`
  position: relative;
  left: 24px;
  ${typography.body1()};
  ${userSelection.noUserSelect()};
  font-size: 15px;
  opacity: ${transparency.light.text.primary};
`;
