import Theme from '../enums/theme';

import transparency from '../defaults/transparency';

export const getComponentBackground = (
  color: string,
  toggled: boolean,
  disabled: boolean,
  theme: Theme,
  opacity = {
    disabled: {
      light: transparency.light.selectionControls.disabled,
      dark: transparency.dark.selectionControls.disabled,
    },
    toggledOff: {
      light: transparency.light.selectionControls.off,
      dark: transparency.dark.selectionControls.off,
    },
  },
) => {
  if (disabled) {
    if (theme === Theme.Light) {
      return `rgba(0,0,0,${opacity.disabled.light})`;
    }
    return `rgba(255,255,255,${opacity.disabled.dark})`;
  } else if (toggled != null && !toggled) {
    if (theme === Theme.Light) {
      return `rgba(0,0,0,${opacity.toggledOff.light})`;
    }
    return `rgba(255,255,255,${opacity.toggledOff.dark})`;
  }
  return color;
};

export const getComponentForeground = (
  disabled: boolean,
  theme: Theme,
  opacity = {
    disabled: {
      light: transparency.light.text.disabled,
      dark: transparency.dark.text.disabled,
    },
    enabled: {
      light: transparency.light.text.secondary,
      dark: transparency.dark.text.secondary,
    },
  },
) => {
  if (disabled) {
    if (theme === Theme.Light) {
      return `rgba(0,0,0,${opacity.disabled.light})`;
    }
    return `rgba(255,255,255,${opacity.disabled.dark})`;
  }
  if (theme === Theme.Light) {
    return `rgba(0,0,0,${opacity.enabled.light})`;
  }
  return `rgba(255,255,255,${opacity.enabled.dark})`;
};

export const getComponentRippleColor = (flag, color, theme) => {
  if (flag) {
    return color;
  } else if (theme === Theme.Light) {
    return '#000';
  }
  return '#fff';
};
