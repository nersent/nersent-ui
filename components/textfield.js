'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class TextField extends React.Component {
    constructor() {
        super();
        //binds
        this._keypress = this._keypress.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
        this.onHintClick = this.onHintClick.bind(this);
        this.getText = this.getText.bind(this);
        //global properties
        this.state = {
            active: false
        }
    }
    componentDidMount() {

    }
    _keypress(e) {
    }
    onFocus(e) {
        var t = this;
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
    getText() {
        return this.refs.input.value;
    }
    render() {
        return (
            <div className="material-textfield" style={this.props.style}>
                <input ref="input" onClick={this.onFocus} onBlur={this.onFocusOut} style={{fontSize: this.props.fontSize, color: this.props.color, paddingBottom: this.props.inputPaddingBottom}}></input>
                <div className="hint" ref="hint" style={{fontSize: this.props.hintFontSize, color: this.props.hintColor, opacity: this.props.hintOpacity, top: this.props.hintMarginTop}} onClick={this.onHintClick}>{this.props.hintText}</div>
                <div className="divider" ref="divider" style={{backgroundColor: this.props.dividerColor, opacity: this.props.dividerOpacity}}></div>
                <div className="focus_divider" ref="focus_divider" style={{backgroundColor: this.props.focusedDividerColor}}></div>
            </div>
        );
    }
}

TextField.defaultProps = {
    fontSize: 18,
    color: "#444",
    hintText: "",
    inputPaddingBottom: 6,
    hintFontSize: 18,
    hintOpacity: 0.4,
    hintColor: "#444",
    hintMarginTop: 0,
    hintAnimationTime: 0.2,
    dividerAnimationTime: 0.15,
    dividerOpacity: 0.2,
    dividerColor: "#000",
    focusedHintFontSize: 14,
    focusedHintOpacity: 1,
    focusedHintColor: "#03a9f4",
    focusedHintMarginTop: -18,
    focusedHintAnimationTime: 0.15,
    focusedDividerAnimationTime: 0.15,
    focusedDividerColor: "#03a9f4"
};
/*
    this.refs.textarea.style.height = "auto";
    this.refs.textarea.style.height = this.refs.textarea.scrollHeight + "px";
    console.log(e);
    var text = this.refs.textarea.value;
    var lines = text.split("\n");
    var count = lines.length;
    <textarea ref="textarea" wrap="off" rows="1" onKeyUp={this._keypress}></textarea>*/
