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
            rippleColor: '#444',
            backgroundColor: 'transparent'
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
                : t.props.rippleColor,
            backgroundColor: (t.props.backgroundColor == null)
                ? 'transparent'
                : t.props.backgroundColor
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
            <div style={this.props.style}>
                <div style={(this.state.type == 0) ? {padding: 8} : {}}>
                    <div className={(this.state.type == 0) ? "shadow" : ""}>
                        <div ref="button" style={{backgroundColor: this.state.backgroundColor}} onMouseDown={this.onMouseDown} className="button no-select pointer ripple">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
