import React from 'react'

import ClassManager from '../../utils/class'
import ComponentColor from '../../utils/component-color'

export default class Switch extends React.Component {
  constructor () {
    super()

    this.state = {
      thumbLeft: -11,
      toggled: false,
      scaleThumb: false,
      isAnimation: false
    }

    this.toggled = false
  }

  componentDidMount () {
    const toggled = this.props.toggled

    if (toggled) {
      setTimeout(() => {
        this.toggle(true, true)
      })
    }
  }

  onClick = (e) => {
    this.toggle()
  }

  toggle (flag = !this.state.toggled, fromProps = false) {
    if (this.state.isAnimation) return

    const onToggle = this.props.onToggle
    if (typeof onToggle === 'function') onCheck(flag, this, fromProps)

    this.setState({
      toggled: flag,
      scaleThumb: true,
      isAnimation: true,
      thumbLeft: flag ? this.track.offsetWidth - this.thumb.offsetWidth / 2 : -this.thumb.offsetWidth / 2
    })
    
    setTimeout(() => {
      this.setState({
        scaleThumb: false,
        isAnimation: false
      })
    }, 100)

    this.toggled = flag

    this.triggerEvent()
  }

  triggerEvent () {
    const onToggle = this.props.onToggle

    const e = {
      switch: this,
      toggled: this.toggled
    }

    if (typeof onToggle === 'function') onToggle(e)
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
      thumbLeft,
      toggled,
      scaleThumb
    } = this.state

    const colorCondition = this.track != null && thumbLeft >= this.track.offsetWidth / 2

    const trackStyle = {
      backgroundColor: colorCondition ? color : '#000',
      opacity: toggled ? 0.5 : 0.38
    }

    const thumbSize = !scaleThumb ? 22 : 18

    const thumbStyle = {
      left: thumbLeft,
      backgroundColor: colorCondition ? color : '#FAFAFA',
      width: thumbSize,
      height: thumbSize
    }

    const switchClass = ClassManager.get('material-switch', [
      className,
      darkTheme ? 'dark-theme' : '',
      disabled ? 'disabled' : '',
      toggled ? 'toggled' : ''
    ])

    return (
      <div className={switchClass} onClick={this.onClick}>
        <div className='track' ref={(r) => this.track = r} style={trackStyle} />
        <div className='thumb' ref={(r) => this.thumb = r} style={thumbStyle} />
      </div>
    )
  }
}

Switch.defaultProps = {
  color: '#009688',
  disabled: false,
  darkTheme: false,
  toggled: false
}