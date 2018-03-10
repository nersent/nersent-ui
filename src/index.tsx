import { injectGlobal } from "styled-components";

const robotoLight = require("./fonts/Roboto-Light.woff2");
const robotoMedium = require("./fonts/Roboto-Medium.woff2");
const robotoRegular = require("./fonts/Roboto-Regular.woff2");

import colors from "./defaults/colors";

import Theme from "./enums/theme";

import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import RadioButton from "./components/RadioButton";
import RadioButtons from "./components/RadioButtons";
import Switch from "./components/Switch";
import TextField from "./components/TextField";

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

export {
  colors,
  Theme,
  Button,
  Checkbox,
  RadioButtons,
  RadioButton,
  Switch,
  TextField
}
