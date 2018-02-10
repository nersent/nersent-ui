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
      children,
      onClick,
      onMouseEnter,
      onMouseLeave
    } = this.props

    const foregroundColor = Foreground.get(foreground)

    const style = {
      backgroundColor: background,
      color: foregroundColor
    }

    const shadowClass = !shadow ? 'no-shadow' : ''
    const rootClass = ClassManager.get('material-button', [className, shadowClass])

    const events = {
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }

    return (
      <div className={rootClass} style={style} {...events}>
        {children}
        <Ripple color={foregroundColor} options={ripple} />
      </div>
    )
  }
}