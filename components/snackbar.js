'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';
import FlatButton from './flatbutton.js';

export default class Snackbar extends React.Component {
    constructor() {
        super();
        //binds
        this.getFlatButton = this.getFlatButton.bind(this);
        this.onClick = this.onClick.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        //global properties
        this.state = {
            flatbutton: 'none'
        }
    }
    componentDidMount() {
        if (this.props.flatButton) {
            this.setState({flatbutton: 'block'});
        }
    }
    getFlatButton() {
        return this.refs.flatbutton;
    }
    onClick(e) {
        var _t = {};
        if(this.props.onFlatButtonClick && _t.toString.call(this.props.onFlatButtonClick) === '[object Function]') {
            this.props.onFlatButtonClick();
        }
    }
    show() {
        var t = this;
        this.refs.snackbar.style.display = 'block';
        TweenMax.to(this.refs.snackbar, 0.3, {
            css: {
                bottom: 0
            }
        });
        var _animationdelay = setInterval(function() {
            TweenMax.to(t.refs.text, 0.2, {
                css: {
                    opacity: 1
                }
            });
            clearInterval(_animationdelay);
        }, 150)
        var _delay = setInterval(function() {
            t.hide();
            clearInterval(_delay);
        }, this.props.hideTime);
    }
    hide() {
        var t = this;
        TweenMax.to(this.refs.text, 0.4, {
            css: {
                opacity: 0
            }
        });
        TweenMax.to(this.refs.snackbar, 0.7, {
            css: {
                bottom: -200
            },
            onComplete: function() {
                t.refs.snackbar.style.display = 'none';
                var _t = {};
                if(t.props.onHide && _t.toString.call(t.props.onHide) === '[object Function]') {
                    t.props.onHide();
                }
            }
        });
    }
    render() {
        return (
            <div style={this.props.style}>
                <div className="material-snackbar" ref="snackbar" style={{backgroundColor: this.props.backgrondColor, color: this.props.textColor}}>
                    <div className="text" ref="text">
                        {
                            this.props.children
                        }
                    </div>
                    <FlatButton onFlatButtonClick={this.onClick} ref="flatbutton" style={{display: this.state.flatbutton, fontFamily: 'Roboto-Regular'}} color={this.props.flatButtonColor} textOpacity={this.props.flatButtonOpacity} opacity={this.props.flatButtonOpacity} backgroundColor={this.props.flatButtonBackgroundColor} rippleColor={this.props.flatButtonRippleColor}>
                        {this.props.flatButtonText}
                    </FlatButton>
                </div>
            </div>
        );
    }
}

Snackbar.defaultProps = {
    hideTime: 4000,
    backgroundColor: '#323232',
    opacity: 1,
    textColor: "#fff",
    flatButton: false,
    flatButtonText: "BUTTON",
    flatButtonColor: '#FFEB3B',
    flatButtonTextOpacity: 1,
    flatButtonOpacity: 1,
    flatButtonBackgroundColor: 'transparent',
    flatButtonRippleColor: '#FFEB3B'
};
