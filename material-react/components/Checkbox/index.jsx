import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'
import ComponentColor from '../../utils/component-color'

export default class Checkbox extends React.Component {
  constructor () {
    super()

    this.state = {
      checked: false,
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

    this.setState({ checked: flag })

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
      checked,
      borderWidth,
      borderColor,
      iconScale,
      iconAnimation
    } = this.state

    const componentColor = ComponentColor.get(color, checked, darkTheme, disabled, true)

    const borderStyle = {
      borderWidth: borderWidth ? this.refs.checkbox.offsetWidth / 2 : 2,
      borderColor: componentColor.component
    }

    const iconStyle = {
      transform: `scale(${!iconScale ? 1 : 0})`
    }

    const style = {
      transform: `scale(${borderWidth && !iconAnimation || !checked && iconAnimation ? 0.9 : 1})`
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
            color={componentColor.ripple}
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
  colors: {
    offLight: 'rgba(0,0,0,0.54)',
    offDark: 'rgba(255,255,255,0.70)',
    disabledLight: 'rgba(0,0,0,0.26)',
    disabledDark: 'rgba(255,255,255,0.30)'
  },
  disabled: false,
  darkTheme: false,
  checked: false
}