import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'
import ComponentColor from '../../utils/component-color'

export default class Switch extends React.Component {
  constructor () {
    super()

    this.state = {
      thumbLeft: -10,
      toggled: false,
      isAnimation: false
    }
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
    if (!this.props.disabled) this.toggle()
  }

  toggle (flag = !this.state.toggled, fromProps = false) {
    if (this.state.isAnimation) return

    const onToggle = this.props.onToggle
    if (typeof onToggle === 'function') onToggle(flag, this, fromProps)

    this.setState({
      toggled: flag,
      isAnimation: true,
      thumbLeft: flag ? this.track.offsetWidth - this.thumb.offsetWidth / 2 : -this.thumb.offsetWidth / 2
    })
    
    setTimeout(() => {
      this.setState({isAnimation: false})
    }, 150)

    this.toggled = flag
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

    const toggled = this.track != null && this.state.thumbLeft >= this.track.offsetWidth / 2

    const trackColor = ComponentColor.get(color, toggled, darkTheme, disabled, true, {
      offLight: 'rgba(0,0,0,0.38)',
      offDark: 'rgba(255,255,255,0.30)',
      disabledLight: 'rgba(0,0,0,0.12)',
      disabledDark: 'rgba(255,255,255,0.10)'
    })

    const thumbColor = ComponentColor.get(color, toggled, darkTheme, disabled, false, {
      offLight: '#FAFAFA',
      offDark: '#BDBDBD',
      disabledLight: '#BDBDBD',
      disabledDark: '#424242'
    })

    const trackStyle = {
      backgroundColor: trackColor.component,
      opacity: toggled ? 0.5 : 1
    }

    const thumbSize = !this.state.isAnimation ? 20 : 18

    const thumbStyle = {
      backgroundColor: thumbColor,
      transform: `scale(${!this.state.isAnimation ? 1 : 0.9 })`
    }

    const thumbContainerStyle = {
      left: this.state.thumbLeft
    }

    const rootClass = ClassManager.get('material-switch-container', [
      className,
      darkTheme ? 'dark-theme' : '',
      disabled ? 'disabled' : '',
      children != null ? 'has-text' : ''
    ])

    const switchClass = ClassManager.get('material-switch', [
      toggled ? 'toggled' : ''
    ])

    return (
      <div className={rootClass} onClick={this.onClick} ref='root'>
        {children != null &&
          <div className='text'>
            {children}
          </div>
        }
        <div className={switchClass}>
          <div className='track' ref={(r) => this.track = r} style={trackStyle} />
          <div className='thumb-container' style={thumbContainerStyle}>
            <div className='thumb' ref={(r) => this.thumb = r} style={thumbStyle} />
            <Ripple
              autoRipple={!disabled}
              color={trackColor.component}
              onClickColor={trackColor.ripple}
              center={true}
              eventElement={() => { return this.refs.root }} />
          </div>
        </div>
      </div>
    )
  }
}
          
Switch.defaultProps = {
  color: '#2196F3',
  disabled: false,
  darkTheme: false,
  toggled: false
}