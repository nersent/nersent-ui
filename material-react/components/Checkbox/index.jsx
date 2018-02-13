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
      checkboxBorderTransition: '0.1s border-color',
      checkboxIconTransition: '2s clip-path cubic-bezier(0.19, 1, 0.22, 1), 1s transform cubic-bezier(0.19, 1, 0.22, 1)'
    }

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
        checkboxBorderTransition: '0.1s border-color, 0.2s border-width cubic-bezier(0.19, 1, 0.22, 1)',
        checkboxIconTransition: 'none',
        iconAnimation: false
      })

      for (var i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i])
      }

      setTimeout(() => {
        this.setState({
          checkboxIconTransition: '1s clip-path cubic-bezier(0.19, 1, 0.22, 1)',
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
        checkboxBorderTransition: '0.1s border-color, 0.4s border-width cubic-bezier(0.19, 1, 0.22, 1)',
        checkboxIconTransition: '1s transform cubic-bezier(0.19, 1, 0.22, 1)'
      })

      setTimeout(() => {
        this.setState({iconScale: true})

        for (var i = 0; i < this.timeouts.length; i++) {
          clearTimeout(this.timeouts[i])
        }

        this.timeouts.push(setTimeout(() => {
          this.setState({
            borderWidth: this.refs.checkbox.offsetWidth / 2 - 2
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

    const componentColor = ComponentColor.get(color, checked, darkTheme, disabled, true)

    const borderStyle = {
      borderWidth: borderWidth,
      borderColor: componentColor.component,
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
            color={componentColor.component}
            onClickColor={componentColor.ripple}
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