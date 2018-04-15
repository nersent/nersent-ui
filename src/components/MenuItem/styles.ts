import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import typography from "../../mixins/typography";
import userSelection from "../../mixins/user-selection";
import transparency from "../../defaults/transparency";

export interface IMenuItemProps {
  visible: boolean;
  hide: boolean;
}

export const StyledMenuItem = styled.div`
  height: 32px;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: 0.2s opacity;

  opacity: ${(props: IMenuItemProps) => (props.visible ? 1 : 0)};
  display: ${props => (props.hide ? "none" : "flex")};

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

export interface ITitleProps {
  disabled: boolean;
}

export const Title = styled.div`
  position: relative;
  left: 24px;
  font-size: 15px;

  ${typography.robotoRegular()};
  ${userSelection.noUserSelect()};
  opacity: ${(props: ITitleProps) =>
    props.disabled
      ? transparency.light.text.disabled
      : transparency.light.text.primary};
`;
