'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class RaisedButton extends React.Component {
    constructor() {
        super();
    }
    /*
    events
    */
    /*
    * @param1 {Object} e
    */
    onMouseDown = (e) => {
        var ripple = Ripple.createRipple(this.refs.button, {
            backgroundColor: this.props.rippleColor
        }, createRippleMouse(this.refs.button, e));
        Ripple.makeRipple(ripple);
    }

    render() {
        return (
            <div style={this.props.style}>
                <div className="material-button-shadow pointer" onClick={this.props.onClick} onMouseDown={this.onMouseDown} style={{opacity: this.props.opacity}}>
                    <div ref="button" className="material-button ripple" style={{backgroundColor: this.props.backgroundColor}}>
                        <div style={{color: this.props.color, opacity: this.props.textOpacity}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class FlatButton extends React.Component {
    constructor() {
        super();
    }
    /*
    events
    */
    /*
    * @param1 {Object} e
    */
    onMouseDown = (e) => {
        var ripple = Ripple.createRipple(this.refs.button, {
            backgroundColor: this.props.rippleColor
        }, createRippleMouse(this.refs.button, e));
        Ripple.makeRipple(ripple);
    }

    render() {
        return (
            <div style={this.props.style}>
                <div className="pointer" onClick={this.props.onClick} onMouseDown={this.onMouseDown} style={{opacity: this.props.opacity}}>
                    <div ref="button" className={"material-button ripple " + this.props.className} style={{backgroundColor: this.props.backgroundColor}}>
                        <div style={{color: this.props.color, opacity: this.props.textOpacity}}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RaisedButton.defaultProps = {
    color: '#000',
    textOpacity: 0.9,
    opacity: 1,
    backgroundColor: '#03A9F4',
    rippleColor: '#000'
};

FlatButton.defaultProps = {
    color: '#03A9F4',
    textOpacity: 1,
    opacity: 1,
    backgroundColor: 'transparent',
    rippleColor: '#03A9F4'
};

export {FlatButton, RaisedButton};
