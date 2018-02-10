export default class Foreground {
  static get (foreground) {
    if (typeof foreground === 'boolean') {
      return foreground ? '#fff' : '#000'
    } else {
      return foreground
    }
  }
}