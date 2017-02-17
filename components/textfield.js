'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class TextField extends React.Component {
    constructor() {
        super();
        //binds
        this.onKeyUp = this.onKeyUp.bind(this);
        this.characterControler = this.characterControler.bind(this); //unity ( ͡° ͜ʖ ͡°)
        this.setError = this.setError.bind(this);
        this.isError = this.isError.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
        this.onHintClick = this.onHintClick.bind(this);
        this.getText = this.getText.bind(this);
        //global properties
        this.state = {
            active: false,
            length: 0,
            error: false,
            counter: 'none'
        }
    }
    componentDidMount() {
        if (this.props.counter) {
            this.setState({counter: 'block'});
        }
    }
    onKeyUp(e) {
        this.characterControler();
    }
    characterControler() {
        if (this.props.counter) {
            var _length = this.refs.input.value.length;
            this.setState({length: _length});
            if (_length > this.props.maxLength) {
                this.setError(true);
            } else if (this.state.error) {
                this.setError(false);
            }
        }
    }
    setError(er) {
        var t = this;
        if (er) {
            if (!this.state.error) {
                var _t = {};
                if(t.props.onError && _t.toString.call(t.props.onError) === '[object Function]') {
                    t.props.onError();
                }
            }
            TweenMax.to(this.refs.hint, 0.1, {
                css: {
                    color: this.props.errorColor
                }
            });
            TweenMax.to(this.refs.focus_divider, 0.1, {
                css: {
                    backgroundColor: this.props.errorColor
                }
            });
            TweenMax.to(this.refs.counter, 0.1, {
                css: {
                    color: this.props.errorColor,
                    opacity: 1
                }
            });
            TweenMax.to(this.refs.input, 0.1, {
                css: {
                    color: this.props.errorColor
                }
            });
            if (this.props.errorMessage.length > 0) {
                this.refs.error_message.style.display = 'block';
                TweenMax.to(this.refs.error_message, 0.1, {
                    css: {
                        opacity: 1
                    }
                });
            }
            this.setState({error: true});
        } else {
            if (this.state.error) {
                var _t = {};
                if(t.props.onEndError && _t.toString.call(t.props.onEndError) === '[object Function]') {
                    t.props.onEndError();
                }
            }
            TweenMax.to(this.refs.hint, 0.1, {
                css: {
                    color: this.props.focusedHintColor
                }
            });
            TweenMax.to(this.refs.focus_divider, 0.1, {
                css: {
                    backgroundColor: this.props.focusedDividerColor
                }
            });
            TweenMax.to(this.refs.counter, 0.1, {
                css: {
                    color: this.props.counterColor,
                    opacity: this.props.counterOpacity
                }
            });
            TweenMax.to(this.refs.input, 0.1, {
                css: {
                    color: this.props.focusedHintColor
                }
            });
            if (this.props.errorMessage.length > 0) {
                TweenMax.to(this.refs.error_message, 0.1, {
                    css: {
                        opacity: 0
                    },
                    onComplete: function() {
                        t.refs.error_message.style.display = 'none';
                    }
                });
            }
            this.setState({error: false});
        }
    }
    onFocus(e) {
        var t = this;
        this.characterControler();
        if (this.refs.input.value.length < 1) {
            TweenMax.to(this.refs.hint, this.props.focusedHintAnimationTime, {
                css: {
                    fontSize: this.props.focusedHintFontSize,
                    top: this.props.focusedHintMarginTop,
                    color: this.props.focusedHintColor,
                    opacity: this.props.focusedHintOpacity
                }
            });
            TweenMax.to(this.refs.focus_divider, this.props.focusedDividerAnimationTime, {
                css: {
                    width: '100%'
                }
            });
            this.setState({active: true});
            var _t = {};
            if(t.props.onFocus && _t.toString.call(t.props.onFocus) === '[object Function]') {
                t.props.onFocus();
            }
        }
    }
    onFocusOut(e) {
        var t = this;
        this.characterControler();
        if (this.refs.input.value.length < 1) {
            TweenMax.to(this.refs.hint, this.props.hintAnimationTime, {
                css: {
                    fontSize: this.props.hintFontSize,
                    top: this.props.hintMarginTop,
                    color: this.props.hintColor,
                    opacity: this.props.hintOpacity
                }
            });
            TweenMax.to(this.refs.focus_divider, this.props.dividerAnimationTime, {
                css: {
                    width: '0%'
                }
            });
            this.setState({active: false});
            var _t = {};
            if(t.props.onFocusOut && _t.toString.call(t.props.onFocusOut) === '[object Function]') {
                t.props.onFocusOut();
            }
        }
    }
    onHintClick(e) {
        this.refs.input.focus();
        this.onFocus();
    }
    setText(text) {
        if (text.length > 0 && !this.state.active)
            this.onFocus();
        this.refs.input.value = text;
    }
    getText() {
        return this.refs.input.value;
    }
    isError() {
        return this.state.error;
    }
    render() {
        var focus_divider_height = -0.5 * (this.props.focusedDividerHeight - this.props.dividerHeight);
        return (
            <div className="material-textfield" style={this.props.style}>
                <input ref="input" onClick={this.onFocus} onBlur={this.onFocusOut} style={{fontSize: this.props.fontSize, textShadow: '0px 0px 0px ' + this.props.color,color: this.props.focusedHintColor, paddingBottom: this.props.inputPaddingBottom}} onKeyUp={this.onKeyUp}></input>
                <div className="hint no-select" ref="hint" style={{fontSize: this.props.hintFontSize, color: this.props.hintColor, opacity: this.props.hintOpacity, top: this.props.hintMarginTop}} onClick={this.onHintClick}>{this.props.hintText}</div>
                <div className="divider no-select" ref="divider" style={{backgroundColor: this.props.dividerColor, opacity: this.props.dividerOpacity, height: this.props.dividerHeight}}></div>
                <div className="focus_divider no-select" ref="focus_divider" style={{backgroundColor: this.props.focusedDividerColor, height: this.props.focusedDividerHeight, bottom: focus_divider_height}}></div>
                <div className="counter no-select" ref="counter" style={{display: this.state.counter, color: this.props.counterColor, opacity: this.props.counterOpacity, fontSize: this.props.counterFontSize}}>
                    {this.state.length} / {this.props.maxLength}
                </div>
                <div className="error-message no-select" ref="error_message" style={{color: this.props.errorColor}}>
                    {this.props.errorMessage}
                </div>
            </div>
        );
    }
}

TextField.defaultProps = {
    fontSize: 18,
    color: "#444",
    hintText: "",
    maxLength: 100,
    errorColor: "#d50000",
    counter: false,
    errorMessage: "",
    inputPaddingBottom: 6,
    hintFontSize: 18,
    hintOpacity: 0.4,
    hintColor: "#444",
    hintMarginTop: 0,
    hintAnimationTime: 0.2,
    dividerAnimationTime: 0.15,
    dividerOpacity: 0.2,
    dividerColor: "#000",
    dividerHeight: 1,
    focusedHintFontSize: 14,
    focusedHintOpacity: 1,
    focusedHintColor: "#03a9f4",
    focusedHintMarginTop: -18,
    focusedHintAnimationTime: 0.15,
    focusedDividerAnimationTime: 0.15,
    focusedDividerColor: "#03a9f4",
    focusedDividerHeight: 3,
    counterColor: "#000",
    counterOpacity: 0.4,
    counterFontSize: 14,
};
/*
    this.refs.textarea.style.height = "auto";
    this.refs.textarea.style.height = this.refs.textarea.scrollHeight + "px";
    console.log(e);
    var text = this.refs.textarea.value;
    var lines = text.split("\n");
    var count = lines.length;
    <textarea ref="textarea" wrap="off" rows="1" onKeyUp={this._keypress}></textarea>*/
