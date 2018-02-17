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
      iconAnimation: false,
      isAnimation: false,
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

    this.setState({
      checked: flag, 
      isAnimation: true, 
      
    })

    if (flag) {
      this.setState({
        borderWidth: this.refs.checkbox.offsetWidth / 2, 
        scaleAnimation: true,
        checkboxBorderTransition: '0.1s border-color, 0.2s border-width ' + this.easing,
        checkboxIconTransition: 'none',
        iconAnimation: false
      })

      for (var i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i])
      }

      this.timeouts = []

      setTimeout(() => {
        this.setState({
          checkboxIconTransition: '1s clip-path ' + this.easing,
          iconScale: false
        })

        this.timeouts.push(setTimeout(() => {
          this.setState({
            iconAnimation: true
          })
        }, 150))
  
        this.timeouts.push(setTimeout(() => {
          this.setState({scaleAnimation: false})
        }, 200))
      }, 100)
    } else {
      this.setState({
        scaleAnimation: true, 
        iconScale: false, 
        checkboxBorderTransition: '0.1s border-color, 0.4s border-width ' + this.easing,
        checkboxIconTransition: '1s transform ' + this.easing
      })

      setTimeout(() => {
        this.setState({iconScale: true})

        for (var i = 0; i < this.timeouts.length; i++) {
          clearTimeout(this.timeouts[i])
        }

        this.timeouts = []

        this.timeouts.push(setTimeout(() => {
          this.setState({
            borderWidth: this.refs.checkbox.offsetWidth / 2 - 1
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
      iconScale,
      iconAnimation,
      checkboxBorderTransition,
      checkboxIconTransition
    } = this.state

    const componentColors = ComponentColor.get(color, checked, darkTheme, disabled, true)

    const borderStyle = {
      borderWidth: borderWidth,
      borderColor: componentColors.component,
      transition: checkboxBorderTransition
    }

    const iconStyle = {
      transform: `scale(${!iconScale ? 1 : 0})`,
      transition: checkboxIconTransition
    }

    const rootClass = ClassManager.get('material-checkbox-container', [
      className,
      darkTheme ? 'dark-theme' : '',
      disabled ? 'disabled' : ''
    ])

    const checkboxClass = ClassManager.get('material-checkbox', [
      checked ? 'checked' : '',
      iconAnimation ? 'icon-animation' : '',
      this.state.scaleAnimation ? 'scale' : ''
    ])

    return (
      <div className={rootClass} ref='root' onClick={this.onClick}>
        <div>
          <div className={checkboxClass} ref='checkbox'>
            <div className='checkbox-border' style={borderStyle} />
            <div className='checkbox-icon' style={iconStyle} />
          </div>
          <Ripple
            autoRipple={!disabled}
            color={componentColors.component}
            onClickColor={componentColors.ripple}
            center={true}
            eventElement={() => { return this.refs.root }} />
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