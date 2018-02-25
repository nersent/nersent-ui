import Theme from "../enums/theme";

import transparency from "../defaults/transparency";

export const componentColor = (color: string, toggled: boolean, disabled: boolean, theme: Theme) => {
  if (disabled) {
    if (theme === Theme.Light) {
      return `rgba(0,0,0,${transparency.light.selectionControls.disabled})`;
    } else {
      return `rgba(255,255,255,${transparency.dark.selectionControls.disabled})`;
    }
  } else if (!toggled) {
    if (theme === Theme.Light) {
      return `rgba(0,0,0,${transparency.light.selectionControls.off})`;
    } else {
      return `rgba(255,255,255,${transparency.dark.selectionControls.off})`;
    }
  } else {
    return color;
  }
};

export const componentForeground = (disabled: boolean, theme: Theme) => {
  if (disabled) {
    if (theme === Theme.Light) {
      return `rgba(0,0,0,${transparency.light.selectionControls.disabled})`;
    } else {
      return `rgba(255,255,255,${transparency.dark.selectionControls.disabled})`;
    }
  } else {
    if (theme === Theme.Light) {
      return `rgba(0,0,0,${transparency.light.selectionControls.off})`;
    } else {
      return `rgba(255,255,255,${transparency.dark.selectionControls.off})`;
    }
  }
};
