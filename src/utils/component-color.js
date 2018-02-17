export default class ComponentColor {
  static get (onColor, toggled, darkTheme = false, disabled = false, returnRipple = false, colors = {
    offLight: 'rgba(0,0,0,0.54)',
    offDark: 'rgba(255,255,255,0.70)',
    disabledLight: 'rgba(0,0,0,0.26)',
    disabledDark: 'rgba(255,255,255,0.30)'
  }) {
    if (disabled) {
      return !darkTheme ? colors.disabledLight : colors.disabledDark
    } else {
      const offColor = !darkTheme ? colors.offLight : colors.offDark
      const color = toggled ? onColor : offColor

      if (returnRipple) {
        return {
          component: color,
          ripple: toggled ? offColor : onColor
        }
      }

      return color
    }
  }
}