import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'

export default class Checkbox extends React.Component {
  constructor() {
    super()

    this.state = {
      checked: false,
      borderColor: false,
      borderWidth: false,
      iconScale: false,
      iconAnimation: false
    }
  }

  check(flag = !this.state.checked) {
    const onCheck = this.props.onCheck
    if (typeof onCheck === 'function') onCheck(flag, this)

    this.setState({ borderColor: flag, checked: flag })

    if (flag) {
      setTimeout(() => {
        this.setState({ borderWidth: true })

        setTimeout(() => {
          this.setState({ iconAnimation: true })
        }, 200)
      }, 100)
    } else {
      setTimeout(() => {
        this.setState({ iconScale: true })

        setTimeout(() => {
          this.setState({ borderWidth: false })

          setTimeout(() => {
            this.setState({
              iconAnimation: false,
              iconScale: false
            })
          }, 100)
        }, 200)
      }, 100)
    }
  }

  render() {
    const {
      color,
      offColor,
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

    const borderStyle = {
      borderWidth: borderWidth ? this.refs.checkbox.offsetWidth / 2 : 2,
      borderColor: borderColor ? color : offColor
    }

    const rippleColor = checked ? color : offColor

    const iconStyle = {
      transform: `scale(${!iconScale ? 1 : 0.1})`
    }

    const style = {
      transform: `scale(${borderWidth && !checked || !borderColor && checked ? 0.9 : 1})`
    }

    const rootClass = ClassManager.get('material-checkbox-container', [className])
    const checkboxClass = ClassManager.get('material-checkbox', [
      checked ? 'checked' : '',
      iconAnimation ? 'icon-animation' : ''
    ])

    return (
      <div className={rootClass} ref='root' onClick={() => { this.check() }}>
        <div className={checkboxClass} ref='checkbox' style={style}>
          <div className='checkbox-border' style={borderStyle} />
          <div className='checkbox-icon' style={iconStyle} />
          <Ripple color={rippleColor} center={true} eventElement={() => { return this.refs.root }} />
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
  color: '#3F51B5',
  offColor: '#757575',
  disabled: false,
  darkTheme: false
}