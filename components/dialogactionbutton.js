'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class DialogActionButton extends React.Component {
    constructor() {
        super();
        //binds
        this.ripple = this.ripple.bind(this);
        //global properties
    }

    componentDidMount() {

    }
    ripple(e) {
        var ripple = Ripple.createRipple(this.refs._button, {
            backgroundColor: this.props.rippleColor
        }, createRippleMouse(this.refs._button, e));
        Ripple.makeRipple(ripple);
    }
    render() {
        return (
            <div className="dialog-action-button no-select ripple" ref="_button" onMouseDown={this.ripple} style={{color: this.props.color}}>
                {this.props.children}
            </div>
        );
    }
}

DialogActionButton.defaultProps = {
    color: '#009688',
    backgroundColor: 'transparent',
    rippleColor: '#009688'
};
