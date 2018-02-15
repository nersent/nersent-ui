import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'

export default class TextField extends React.Component {
  constructor () {
    super()

    this.state = {
      focused: false,
      filled: false
    }
  }

  onFocus = () => {
    this.toggle(true)
  }

  onBlur = () => {
    this.toggle(false)
  }

  toggle = (flag) => {
    const isInputEmpty = this.input.value.length === 0

    if (isInputEmpty) {
      this.setState({
        filled: false,
        focused: flag
      })
    } else {
      this.setState({
        filled: true,
        focused: flag
      })
    }
  }

  render () {
    const {
      color,
      ripple,
      className,
      children,
      disabled,
      darkTheme,
      label
    } = this.props

    const {
      focused,
      filled
    } = this.state

    const inputStyle = {
      color: color
    }

    const focusLineStyle = {
      width: !focused ? '0%' : '100%'
    }

    const labelStyle = {
      color: focused ? color : '#000',
      opacity: focused ? 0.89 : 0.54
    }

    const textFieldClass = ClassManager.get('material-text-field', [
      focused || filled ? 'label-on-top' : ''
    ])

    return (
      <div className={textFieldClass}>
        {label != null &&
          <div className='label' style={labelStyle}>
            Label
          </div>
        }
        <input
          type='text'
          className='input'
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          spellCheck={false}
          style={inputStyle}
          ref={(r) => this.input = r} />
        <div className='line' />
        <div className='focus-line' style={focusLineStyle} />
        <div className='helper-text'>
          Helper text
        </div>
      </div>
    )
  }
}

TextField.defaultProps = {
  color: '#2196F3',
  disabled: false,
  darkTheme: false
}