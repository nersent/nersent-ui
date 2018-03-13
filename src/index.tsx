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
import Ripple from "./components/Ripple";
import Ripples from "./components/Ripples";
import Switch from "./components/Switch";
import TextField from "./components/TextField";
import buttons from "./defaults/buttons";
import transparency from "./defaults/transparency";
import shadows from "./mixins/shadows";
import typography from "./mixins/typography";
import { getRippleEvents } from "./utils/ripple";

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
  transparency,
  shadows,
  typography,
  buttons,
  Theme,
  Button,
  Checkbox,
  RadioButtons,
  RadioButton,
  Switch,
  TextField,
  Ripple,
  Ripples,
  getRippleEvents
};
