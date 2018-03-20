import { injectGlobal } from "styled-components";

const robotoLight = require("./fonts/roboto-light.ttf");
const robotoMedium = require("./fonts/roboto-medium.ttf");
const robotoRegular = require("./fonts/roboto-regular.ttf");

import colors from "./defaults/colors";

import PreloaderType from "./enums/preloader";
import Theme from "./enums/theme";

import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Preloader from "./components/Preloader";
import ProgressBar from "./components/ProgressBar";
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
    src: url(${robotoRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${robotoMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url(${robotoLight}) format('truetype');
  }

  @keyframes nersent-ui-preloader-rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes nersent-ui-preloader-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
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
  getRippleEvents,
  ProgressBar,
  PreloaderType,
  Preloader
};
