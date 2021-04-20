import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled, { StyledComponentProps } from "styled-components/macro";
import { ThemeType } from "../../../styles/theme";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type PropsType = DefaultButtonPropsType;

export const Button: React.FC<PropsType> = React.memo(({ ...restProps }) => {
    return <StyledButton {...restProps} />;
});

// Styles
const StyledButton = styled.button<StyledComponentProps<any, ThemeType, any, any>>`
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.primary.main};
  color: ${({ theme }) => theme.color.white};
  padding: 0.5rem 1rem;

  font-family: ${({ theme }) => theme.font.family.default}; // Make a default font actually default
  font-size: ${({ theme }) => theme.font.size.default}; // Default font size
  box-shadow: ${({ theme }) => theme.shadow[3]};
  &:hover {
    background-color: ${({ theme }) => theme.color.primary.light};
  }
`;
