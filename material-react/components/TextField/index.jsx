import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'

export default class TextField extends React.Component {
  constructor () {
    super()

    this.state = {
      focused: false,
      filled: false,
      error: false,
      errorReason: ''
    }
  }

  getValue () {
    return this.input.value
  }

  onFocus = () => {
    this.toggle(true)

    const onFocus = this.props.onFocus
    if (typeof onFocus === 'function') onFocus(this)
  }

  onBlur = () => {
    this.validate()
    this.toggle(false)

    const onBlur = this.props.onBlur
    if (typeof onBlur === 'function') onBlur(this)
  }

  toggle = (flag = !this.state.focused) => {
    const isInputEmpty = this.input.value.length === 0

    this.setState({
      filled: !isInputEmpty,
      focused: flag
    })
  }

  toggleError (flag, text = 'Text explaining the error') {
    if (this.state.error !== flag) {
      this.setState({
        error: flag,
        errorReason: text
      })
    }
  }

  validate () {
    const validate = this.props.validate

    if (typeof validate === 'function') {
      const validation = validate(this) 

      if (typeof validation === 'string') {
        this.setState({
          error: true,
          errorReason: validation
        })

        return
      } else if (this.state.error) {
        this.setState({error: false})
      }
    }

    return true
  }

  onKeyUp = () => {
    if (this.state.error) {
      this.validate()
    }
  }

  getComponentColorsAndTransparency () {
    if (this.props.disabled) {
      // TODO
      return {}
    } else if (this.state.error) {
      return {
        label: {
          color: '#FF1744',
          opacity: 1
        },
        helperText: {
          color: '#FF1744',
          opacity: 0.87
        }
      }
    }

    return {
      label: {
        color: this.state.focused ? this.props.color : '#000',
        opacity: this.state.focused ? 0.89 : 0.54
      },
      helperText: {
        color: '#000',
        opacity: 0.54
      }
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
      label,
      helperText
    } = this.props

    const {
      focused,
      filled,
      error,
      errorReason
    } = this.state

    const colorsAndTransparency = this.getComponentColorsAndTransparency()
    const lineAndCursorColor = !error ? color : colorsAndTransparency.label.color

    const inputStyle = {
      color: lineAndCursorColor
    }

    const focusLineStyle = {
      width: !focused && !error ? '0%' : '100%',
      backgroundColor: lineAndCursorColor
    }

    const labelStyle = {
      color: colorsAndTransparency.label.color,
      opacity: colorsAndTransparency.label.opacity
    }

    const helperTextStyle = {
      color: colorsAndTransparency.helperText.color,
      opacity: colorsAndTransparency.helperText.opacity
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
          onKeyUp={this.onKeyUp}
          ref={(r) => this.input = r} />
        <div className='line' />
        <div className='focus-line' style={focusLineStyle} />
        {(helperText != null || error) &&
          <div className='helper-text' style={helperTextStyle}>
            {!error ? helperText : `Error: ${errorReason}`}
          </div>
        }
      </div>
    )
  }
}

TextField.defaultProps = {
  color: '#2196F3',
  disabled: false,
  darkTheme: false
}