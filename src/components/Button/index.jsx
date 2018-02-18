import React from 'react'

import './style.scss'

import Ripple from '../Ripple'

import Colors from '../../utils/colors'
import ClassManager from '../../utils/class'

export default class Button extends React.Component {
  render () {
    const {
      color,
      backgroundColor,
      ripple,
      className,
      children,
      disabled,
      darkTheme,
      onClick,
      onMouseEnter,
      onMouseLeave,
      raised
    } = this.props

    const style = {
      backgroundColor: backgroundColor,
      color: color
    }

    const events = {
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }

    const rootClass = ClassManager.get((raised) ? 'button raised' : 'button flat', [
      className,
      disabled ? 'disabled' : '',
      darkTheme ? 'dark-theme' : ''
    ])

    const overShadeStyle = {
      backgroundColor: (raised) ? '#000' : color
    }

    return (
      <div className={rootClass} style={style} {...events}>
        {children}
        <div className='over-shade' style={overShadeStyle} />
        <Ripple autoClass={false} autoRipple={!disabled} color={color} time={0.8} options={ripple} />
      </div>
    )
  }
}

Button.defaultProps = {
  color: '#000',
  backgroundColor: 'transparent',
  disabled: false,
  darkTheme: false,
  raised: false
}