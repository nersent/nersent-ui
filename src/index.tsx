import { injectGlobal } from "styled-components";

const robotoLight = require("./fonts/Roboto-Light.woff2");
const robotoMedium = require("./fonts/Roboto-Medium.woff2");
const robotoRegular = require("./fonts/Roboto-Regular.woff2");

injectGlobal`
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: #FAFAFA;
    font-size: 15px;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Roboto-Regular'), url(${robotoRegular}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto Medium'), local('Roboto-Medium'), url(${robotoMedium}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto Light'), local('Roboto-Light'), url(${robotoLight}) format('woff2');
  }
`;

export { default as colors } from "./defaults/colors";

export { default as Button } from "./components/Button";
export { default as Checkbox } from "./components/Checkbox";
