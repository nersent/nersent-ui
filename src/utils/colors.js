export default class Colors {
  /**
   * Calculates foreground color based on background color.
   * @param {String} color - color in hex
   * @return {String}
   */
  static getForegroundColor (color) {
    var brightness = Colors.colorBrightness(color)
    if (brightness < 130) {
      return 'white'
    } else {
      return 'black'
    }
  }

  /**
   * Extracts brightness from color.
   * @param {String} color
   * @return {Number} - the brightness
   */
  static colorBrightness (color) {
    if (color == null) return null

    var r
    var g
    var b
    var brightness
    var colour = color
    if (colour.match(/^rgb/)) {
      colour = colour.match(/rgba?\(([^)]+)\)/)[1]
      colour = colour.split(/ *, */).map(Number)
      r = colour[0]
      g = colour[1]
      b = colour[2]
    } else if (colour[0] === '#' && colour.length === 7) {
      r = parseInt(colour.slice(1, 3), 16)
      g = parseInt(colour.slice(3, 5), 16)
      b = parseInt(colour.slice(5, 7), 16)
    } else if (colour[0] === '#' && colour.length === 4) {
      r = parseInt(colour[1] + colour[1], 16)
      g = parseInt(colour[2] + colour[2], 16)
      b = parseInt(colour[3] + colour[3], 16)
    }
    brightness = (r * 299 + g * 587 + b * 114) / 1000

    return brightness
  }
}