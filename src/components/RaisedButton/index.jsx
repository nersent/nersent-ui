import React from 'react'

import './style.scss'

import Ripple from '../Ripple'

import Colors from '../../utils/colors'
import ClassManager from '../../utils/class'

export default class RaisedButton extends React.Component {
  componentWillMount () {
    this.foreground = Colors.getForegroundColor(this.props.color)
  }

  // Avoid unnecessary operations
  componentWillReceiveProps (nextProps) {
    if (this.props.color !== nextProps.color) {
      this.foreground = Colors.getForegroundColor(nextProps.color)
    }
  }

  render () {
    const {
      color,
      foreground,
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
      backgroundColor: color,
      color: this.foreground
    }

    const events = {
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }

    const rootClass = ClassManager.get('material-button raised', [
      className,
      this.foreground,
      disabled ? 'disabled' : '',
      darkTheme ? 'dark-theme' : ''
    ])

    return (
      <div className={rootClass} style={style} {...events}>
        {children}
        <div className='over-shade' />
        <Ripple autoClass={false} autoRipple={!disabled} color={this.foreground} time={0.8} options={ripple} />
      </div>
    )
  }
}

RaisedButton.defaultProps = {
  color: '#E0E0E0',
  disabled: false,
  darkTheme: false
}