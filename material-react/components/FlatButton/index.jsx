import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'

export default class FlatButton extends React.Component {
  render () {
    const {
      color,
      ripple,
      className,
      children,
      disabled,
      darkTheme,
      onClick,
      onMouseEnter,
      onMouseLeave
    } = this.props

    const style = {
      color: color
    }

    const events = {
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }

    const rootClass = ClassManager.get('material-button flat', [
      className,
      disabled ? 'disabled' : '',
      darkTheme ? 'dark-theme' : ''
    ])

    return (
      <div className={rootClass} style={style} {...events}>
        {children}
        <div className='over-shade' />
        <Ripple autoClass={false} autoRipple={!disabled} color={color} time={0.6} options={ripple} />
      </div>
    )
  }
}

FlatButton.defaultProps = {
  color: '#2196F3',
  disabled: false,
  darkTheme: false
}