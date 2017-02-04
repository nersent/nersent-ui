'use babel';
import React from 'react';
import {TweenMax, CSSPlugin, Power4} from 'gsap';

export default class Checkbox extends React.Component {
    constructor() {
        super();
        //binds
        this.onClick = this.onClick.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        //global properties
        this.checked = false;
        this.state = {
            onColor: '#2196F3',
            offColor: '#757575'
        }
    }
    componentDidMount() {
        var t = this;
        this.setState({
            onColor: (t.props.onColor == null)
                ? '#2196F3'
                : t.props.onColor,
            offColor: (t.props.offColor == null)
                ? '#757575'
                : t.props.offColor
        });
        this.refs.icon.classList.remove('cover-animation');
        this.refs.icon.classList.add('hide');
        TweenMax.set(this.refs.border, {
            css: {
                borderColor: this.state.offColor
            }
        });
    }
    /*
    events
    */
    onClick() {
        var t = this;
        if (!this.checked) {
            TweenMax.to(this.refs.border, 0.15, {
                css: {
                    borderWidth: this.refs.checkbox.offsetWidth / 2,
                    borderColor: this.state.onColor
                },
                onComplete: function() {
                    t.refs.icon.classList.remove('hide');
                    t.refs.icon.classList.add('cover-animation');
                }
            });
            this.checked = true;
        } else {
            this.refs.icon.classList.remove('cover-animation');
            this.refs.icon.classList.add('hide');
            TweenMax.to(this.refs.border, 0.15, {
                css: {
                    borderWidth: 2,
                    borderColor: this.state.offColor
                }
            });
            this.checked = false;
        }
    }
    onMouseDown() {
        var ripple = Ripple.createRipple(this.refs.checkbox, {
            backgroundColor: this.refs.border.style['border-color']
        }, createRippleCenter(this.refs.checkbox));
        Ripple.makeRipple(ripple);
    }

    render() {
        return (
            <div className="cb-root">
                <div onMouseDown={this.onMouseDown} ref="checkbox" style={this.props.style} onClick={this.onClick} className="checkbox ripple-icon">
                    <div ref="border" className="border"></div>
                    <div ref="icon" className="check-icon"></div>
                </div>
                <div className="text">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
