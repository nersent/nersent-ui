import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'

export default class RadioButton extends React.Component {
  constructor () {
    super()

    this.state = {
      toggled: false,
      fullBorderSize: false,
      circleVisible: false,
      fullCircleSize: true
    }
  }

  onClick = () => {
    const onClick = this.props.onClick

    if (typeof onClick === 'function') onClick(this)
  }

  toggle = (flag = !this.state.toggled) => {
    this.setState({toggled: flag})

    if (flag) {
      this.setState({fullBorderSize: true})

      setTimeout(() => {
        this.setState({
          circleVisible: true,
          fullBorderSize: false,
          fullCircleSize: false
        })
      }, 200)
    } else {
      this.setState({fullCircleSize: true})

      setTimeout(() => {
        this.setState({fullBorderSize: true})

        setTimeout(() => {
          this.setState({
            circleVisible: false,
            fullBorderSize: false
          })
        }, 100)
      }, 150)
    }
  }

  render () {
    const {
      color,
      colors,
      darkTheme,
      disabled,
      children,
    } = this.props

    const {
      toggled,
      fullBorderSize,
      circleVisible,
      fullCircleSize
    } = this.state

    const radioButtonClass = ClassManager.get('radio-button', [
      toggled ? 'toggled' : ''
    ])

    const radioButtonColors = {
      offColor: !darkTheme ? colors.offLight : colors.offDark,
      disabled: !darkTheme ? colors.disabledLight : colors.disabledDark,
    }

    let radioButtonColor = toggled ? color : radioButtonColors.offColor
    if (disabled) radioButtonColor = radioButtonColors.disabled

    const borderStyle = {
      borderWidth: fullBorderSize ? this.refs.radioButton.offsetWidth / 2 : 2,
      borderColor: radioButtonColor
    }

    const circleSize = fullCircleSize ? '100%' : 10

    const circleStyle = {
      visibility: circleVisible ? 'visible' : 'hidden',
      width: circleSize,
      height: circleSize,
      backgroundColor: radioButtonColor
    }

    return (
      <div className='material-radio-button-container' ref='root' onClick={this.onClick}>
        <div className={radioButtonClass} ref='radioButton'>
          <div className='border' style={borderStyle}>
          <Ripple
            autoRipple={!disabled}
            color={radioButtonColor}
            center={true}
            eventElement={() => { return this.refs.root }} />
          </div>
          <div className='circle' style={circleStyle} />
        </div>
        <div className='text'>
          {children}
        </div>
      </div>
    )
  }
}

RadioButton.defaultProps = {
  color: "#2196F3",
  colors: {
    offLight: '#707070',
    offDark: '#c2c2c2',
    disabledLight: '#b6b6b6',
    disabledDark: '#717171'
  },
  disabled: false,
  darkTheme: false,
  toggled: false
}