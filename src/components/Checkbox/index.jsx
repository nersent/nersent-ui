import React from 'react'

import './style.scss'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'
import ComponentColor from '../../utils/component-color'

export default class Checkbox extends React.Component {
  constructor () {
    super()

    this.state = {
      checked: false,
      borderWidth: false,
      iconScaleAnimation: false,
      iconPathAnimation: false,
      checkboxBorderTransition: 'none',
      checkboxIconTransition: 'none'
    }

    this.easing = 'cubic-bezier(0.19, 1, 0.22, 1)'

    this.timeouts = []
  }

  componentDidMount () {
    const checked = this.props.checked

    if (checked) this.check(true, true)
  }

  onClick = () => {
    if (!this.props.disabled) this.check()
  }

  check (flag = !this.state.checked, fromProps = false) {
    if (this.isAnimating || this.state.checked === flag) return

    const onCheck = this.props.onCheck
    if (typeof onCheck === 'function') onCheck(flag, this, fromProps)

    this.setState({checked: flag})

    if (flag) {
      this.setState({
        borderWidth: this.checkbox.offsetWidth / 2, 
        scaleAnimation: true,
        checkboxBorderTransition: '0.1s border-color, 0.2s border-width ' + this.easing,
        checkboxIconTransition: 'none',
        iconPathAnimation: false
      })

      for (var i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i])
      }

      this.timeouts = []

      setTimeout(() => {
        this.setState({
          checkboxIconTransition: '1s clip-path ' + this.easing,
          iconScaleAnimation: false
        })

        this.timeouts.push(setTimeout(() => {
          this.setState({
            iconPathAnimation: true
          })
        }, 150))
  
        this.timeouts.push(setTimeout(() => {
          this.setState({scaleAnimation: false})
        }, 200))
      }, 100)
    } else {
      this.setState({
        scaleAnimation: true, 
        iconScaleAnimation: false, 
        checkboxBorderTransition: '0.1s border-color, 0.4s border-width ' + this.easing,
        checkboxIconTransition: '1s transform ' + this.easing
      })

      setTimeout(() => {
        this.setState({iconScaleAnimation: true})

        for (var i = 0; i < this.timeouts.length; i++) {
          clearTimeout(this.timeouts[i])
        }

        this.timeouts = []

        this.timeouts.push(setTimeout(() => {
          this.setState({
            borderWidth: this.checkbox.offsetWidth / 2 - 1
          })
        }, 150))
  
        this.timeouts.push(setTimeout(() => {
          this.setState({
            borderWidth: 2
          })
        }, 300))
  
        setTimeout(() => {
          this.setState({scaleAnimation: false})
        }, 250)
      })
    }
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
      iconScaleAnimation,
      iconPathAnimation,
      checkboxBorderTransition,
      checkboxIconTransition,
      scaleAnimation
    } = this.state

    const componentColors = ComponentColor.get(color, checked, darkTheme, disabled, true)

    const borderStyle = {
      borderWidth: borderWidth,
      borderColor: componentColors.component,
      transition: checkboxBorderTransition
    }

    const iconStyle = {
      transform: `scale(${!iconScaleAnimation ? 1 : 0})`,
      transition: checkboxIconTransition
    }

    const rootClass = ClassManager.get('material-checkbox-container', [
      className,
      darkTheme ? 'dark-theme' : '',
      disabled ? 'disabled' : ''
    ])

    const checkboxClass = ClassManager.get('material-checkbox', [
      checked ? 'checked' : '',
      iconPathAnimation ? 'icon-animation' : '',
      scaleAnimation ? 'scale' : ''
    ])

    return (
      <div className={rootClass} ref={(r) => this.root = r} onClick={this.onClick}>
        <div>
          <div className={checkboxClass} ref={(r) => this.checkbox = r}>
            <div className='checkbox-border' style={borderStyle} />
            <div className='checkbox-icon' style={iconStyle} />
          </div>
          <Ripple
            autoRipple={!disabled}
            color={componentColors.component}
            onClickColor={componentColors.ripple}
            center={true}
            eventElement={() => { return this.root }} />
        </div>
        {children != null &&
          <div className='text'>
            {children}
          </div>
        }
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