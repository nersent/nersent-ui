import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'

export default class Checkbox extends React.Component {
  constructor () {
    super()

    this.state = {
      checked: false,
      borderColor: false,
      borderWidth: false,
      iconScale: false,
      iconAnimation: false
    }

    this.isAnimating = false
  }

  componentDidMount () {
    const checked = this.props.checked

    if (checked) this.check(true, true)
  }

  check (flag = !this.state.checked, fromProps = false) {
    if (this.isAnimating || this.state.checked === flag) return

    this.isAnimating = true

    const onCheck = this.props.onCheck
    if (typeof onCheck === 'function') onCheck(flag, this, fromProps)

    this.setState({ borderColor: flag, checked: flag })

    if (flag) {
      setTimeout(() => {
        this.setState({ borderWidth: true })

        setTimeout(() => {
          this.setState({ iconAnimation: true })

          this.isAnimating = false
        }, 200)
      }, 100)
    } else {
      this.setState({ iconScale: true })

      setTimeout(() => {
        this.setState({ borderWidth: false })

        setTimeout(() => {
          this.setState({ iconAnimation: false })

          setTimeout(() => {
            this.setState({ iconScale: false })

            this.isAnimating = false
          }, 100)
        }, 100)
      }, 160)
    }
  }

  onClick = () => {
    if (!this.props.disabled) this.check()
  }

  render () {
    const {
      color,
      ripple,
      className,
      disabled,
      darkTheme,
      children
    } = this.props

    const {
      borderWidth,
      borderColor,
      iconScale,
      iconAnimation
    } = this.state

    const checked = this.state.checked

    let offColor = !darkTheme ? 'rgba(0,0,0,0.54)' : 'rgba(255,255,255,0.70)'
    if (disabled) offColor = !darkTheme ? 'rgba(0,0,0,0.26)' : 'rgba(255,255,255,0.30)'

    const borderStyle = {
      borderWidth: borderWidth ? this.refs.checkbox.offsetWidth / 2 : 2,
      borderColor: borderColor && !disabled ? color : offColor
    }

    const rippleColor = checked ? color : offColor

    const iconStyle = {
      transform: `scale(${!iconScale ? 1 : 0})`
    }

    const style = {
      transform: `scale(${borderWidth && !iconAnimation || !borderColor && iconAnimation ? 0.9 : 1})`
    }

    const rootClass = ClassManager.get('material-checkbox-container', [
      className,
      darkTheme ? 'dark-theme' : '',
      disabled ? 'disabled' : ''
    ])

    const checkboxClass = ClassManager.get('material-checkbox', [
      checked ? 'checked' : '',
      iconAnimation ? 'icon-animation' : ''
    ])

    return (
      <div className={rootClass} ref='root' onClick={this.onClick}>
        <div className={checkboxClass} ref='checkbox' style={style}>
          <div className='checkbox-border' style={borderStyle} />
          <div className='checkbox-icon' style={iconStyle} />
          <Ripple
            autoRipple={!disabled}
            color={rippleColor}
            center={true}
            eventElement={() => { return this.refs.root }} />
        </div>
        {children != null && (
          <div className='text'>
            {children}
          </div>
        )}
      </div>
    )
  }
}

Checkbox.defaultProps = {
  color: '#2196F3',
  disabled: false,
  darkTheme: false,
  checked: false
}