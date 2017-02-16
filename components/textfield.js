'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class Switch extends React.Component {
    constructor() {
        super();
        //binds
        this._keypress = this._keypress.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
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
        if (this.refs.input.value.length < 1) {
            TweenMax.to(this.refs.hint, 0.15, {
                css: {
                    fontSize: 14,
                    top: -8,
                    color: "#03a9f4",
                    opacity: 1
                }
            });
            TweenMax.to(this.refs.focus_divider, 0.15, {
                css: {
                    width: '100%'
                }
            });
        }
    }
    onFocusOut(e) {
        if (this.refs.input.value.length < 1) {
            TweenMax.to(this.refs.hint, 0.2, {
                css: {
                    fontSize: 18,
                    top: 11,
                    color: "#444",
                    opacity: 0.4
                }
            });
            TweenMax.to(this.refs.focus_divider, 0.15, {
                css: {
                    width: '0%'
                }
            });
        }
    }
    getText() {
        return this.refs.input.value;
    }
    render() {
        return (
            <div className="material-textfield" style={this.props.style}>
                <input ref="input" onClick={this.onFocus} onBlur={this.onFocusOut}></input>
                <div className="hint" ref="hint">Hello world!</div>
                <div className="divider" ref="divider"></div>
                <div className="focus_divider" ref="focus_divider"></div>
            </div>
        );
    }
}
/*
    this.refs.textarea.style.height = "auto";
    this.refs.textarea.style.height = this.refs.textarea.scrollHeight + "px";
    console.log(e);
    var text = this.refs.textarea.value;
    var lines = text.split("\n");
    var count = lines.length;
    <textarea ref="textarea" wrap="off" rows="1" onKeyUp={this._keypress}></textarea>*/
