import { createGlobalStyle } from "styled-components/macro";
import { ThemeType } from "./theme";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  // Import the font link into the project
  @import url('${({ theme }) => theme.font.source}');
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  *:focus {
    outline: none;
  }
  *::selection {
  }
  html,
  body {
    height: 100%;
  }
  html {
    scroll-behavior: smooth;
  }
  h1 {
    padding: 0;
    margin: 0;
  }
  body {
    font-family: ${({ theme }) => theme.font.family.default}; // Make a default font actually default
    font-size: ${({ theme }) => theme.font.size.default}; // Default font size
    font-weight: 500;
    color: #000;
  }
  ul,
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  button,
  input {
    outline: none;
  }
  button {
    cursor: pointer;
  }
  textarea {
    resize: none;
  }
`;

export const MB = styled.div<any>`
    margin-bottom: ${props => props.margin};
`

export const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
  
  @media(max-width: ${({theme}) => theme.mediaQuery.tablet}) {
    padding: 10px;
  }
`;