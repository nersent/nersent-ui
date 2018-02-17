import React from 'react'

import './style.scss'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'
import ComponentColor from '../../utils/component-color'

export default class RadioButton extends React.Component {
  constructor () {
    super()

    this.state = {
      toggled: false,
      borderAnimations: true,
      fullBorderSize: false,
      circleVisible: false,
      fullCircleSize: true,
      isAnimation: false
    }

    this.timeouts = []
  }

  onClick = () => {
    const onClick = this.props.onClick

    if (typeof onClick === 'function') onClick(this)
  }

  toggle = (flag = !this.state.toggled) => {
    this.setState({toggled: flag, isAnimation: true})

    if (flag) {
      this.setState({fullBorderSize: true})

      for (var i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i])
      }

      this.timeouts = []

      this.timeouts.push(setTimeout(() => {
        this.setState({
          borderAnimations: false,
          circleVisible: true,
          fullBorderSize: false,
          fullCircleSize: false,
          isAnimation: false
        })
      }, 300))
    } else {
      this.setState({fullCircleSize: true})

      for (var i = 0; i < this.timeouts.length; i++) {
        clearTimeout(this.timeouts[i])
      }

      this.timeouts = []

      this.timeouts.push(setTimeout(() => {
        this.timeouts.push(this.setState({
          circleVisible: false,
          fullBorderSize: true
        }))

        this.timeouts.push(setTimeout(() => {
          this.setState({borderAnimations: true})

          this.timeouts.push(setTimeout(() => {
            this.setState({
              fullBorderSize: false,
              isAnimation: false
            })
          }))
        }))
      }, 200))
    }
  }

  render () {
    const {
      color,
      className,
      darkTheme,
      disabled,
      children,
    } = this.props

    const {
      toggled,
      fullBorderSize,
      borderAnimations,
      circleVisible,
      fullCircleSize,
      isAnimation
    } = this.state

    const componentColors = ComponentColor.get(color, toggled, darkTheme, disabled, true)

    const borderStyle = {
      borderWidth: fullBorderSize ? this.refs.radioButton.offsetWidth / 2 : 2,
      borderColor: componentColors.component
    }

    const circleSize = fullCircleSize ? 14 : 9

    const circleStyle = {
      visibility: circleVisible ? 'visible' : 'hidden',
      width: circleSize,
      height: circleSize,
      backgroundColor: componentColors.component
    }

    const rootClass = ClassManager.get('material-radio-button-container', [
      className,
      darkTheme ? 'dark-theme' : '',
      disabled ? 'disabled' : ''
    ])

    const radioButtonClass = ClassManager.get('material-radio-button', [
      toggled ? 'toggled' : '',
      !borderAnimations ? 'no-border-animations' : '',
      isAnimation ? 'scale' : ''
    ])

    return (
      <div className={rootClass} ref='root' onClick={this.onClick}> 
        <div>
          <div className={radioButtonClass} ref='radioButton'>
            <div className='border' style={borderStyle} />
            <div className='circle' style={circleStyle} />
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

RadioButton.defaultProps = {
  color: "#2196F3",
  disabled: false,
  darkTheme: false,
  toggled: false
}