import React from 'react'

import Ripple from '../Ripple'

import Foreground from '../../utils/foreground'
import ClassManager from '../../utils/class'

export default class Button extends React.Component {
  render () {
    const {
      background,
      foreground,
      ripple,
      className,
      shadow,
      children
    } = this.props

    const foregroundColor = Foreground.get(foreground)

    const style = {
      backgroundColor: background,
      color: foregroundColor
    }

    const shadowClass = !shadow ? 'no-shadow' : ''
    const rootClass = ClassManager.get('material-button', [className, shadowClass])

    return (
      <div className={rootClass} style={style}>
        {children}
        <Ripple color={foregroundColor} options={ripple} />
      </div>
    )
  }
}