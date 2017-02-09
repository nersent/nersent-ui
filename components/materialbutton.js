'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class MaterialButton extends React.Component {
    constructor() {
        super();
        //binds
        this.onMouseDown = this.onMouseDown.bind(this);

        //global properties
        this.state = {
            type: 0,
            rippleColor: '#444'
        }
    }
    componentDidMount() {
        var t = this;
        this.setState({
            type: (t.props.type == null)
                ? 0
                : t.props.type,
            rippleColor: (t.props.rippleColor == null)
                ? '#444'
                : t.props.rippleColor
        });
    }
    onMouseDown(e) {
        var ripple = Ripple.createRipple(this.refs.button, {
            backgroundColor: this.state.rippleColor
        }, createRippleMouse(this.refs.button, e));
        Ripple.makeRipple(ripple);
    }
    render() {
        return (
            <div>
                <div style={this.props.style} className={(this.state.type == 0) ? "shadow" : ""}>
                    <div ref="button" onMouseDown={this.onMouseDown} className="button no-select pointer ripple">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
