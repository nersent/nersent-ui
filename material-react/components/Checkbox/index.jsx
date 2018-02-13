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
      isAnimation: false
    }
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

    this.setState({checked: flag, isAnimation: true})

    if (flag) {
      setTimeout(() => {
        this.setState({borderWidth: true})

        setTimeout(() => {
          this.setState({
            iconAnimation: true,
            isAnimation: false
          })
        }, 200)
      }, 100)
    } else {
      this.setState({iconScale: true})

      setTimeout(() => {
        this.setState({borderWidth: false})

        setTimeout(() => {
          this.setState({iconAnimation: false})

          setTimeout(() => {
            this.setState({
              iconScale: false,
              isAnimation: false
            })
          }, 100)
        }, 100)
      }, 160)
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

    const scaleAnimation = borderWidth && !iconAnimation || !checked && iconAnimation

    const rootClass = ClassManager.get('material-checkbox-container', [
      className,
      darkTheme ? 'dark-theme' : '',
      disabled ? 'disabled' : ''
    ])

    const checkboxClass = ClassManager.get('material-checkbox', [
      checked ? 'checked' : '',
      iconAnimation ? 'icon-animation' : '',
      scaleAnimation ? 'scale' : ''
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