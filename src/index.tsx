import { injectGlobal } from "styled-components";

const robotoLight = require("./fonts/Roboto-Light.woff2");
const robotoMedium = require("./fonts/Roboto-Medium.woff2");
const robotoRegular = require("./fonts/Roboto-Regular.woff2");

injectGlobal`
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

// Defaults
export { default as colors } from "./defaults/colors";

// Enums
export { default as Theme } from "./enums/theme";

// Components
export { default as Button } from "./components/Button";
export { default as Checkbox } from "./components/Checkbox";
export { default as RadioButtons } from "./components/RadioButtons";
export { default as RadioButton } from "./components/RadioButton";
export { default as Switch } from "./components/Switch";
export { default as TextField } from "./components/TextField";
