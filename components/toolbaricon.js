'use babel';
import React from 'react';

export default class ToolbarIcon extends React.Component {
    constructor() {
        super();
        //binds
        this.onMouseDown = this.onMouseDown.bind(this);
        //global properties
        this.state = {
            position: 'left',
            image: '',
            inverted: false,
            rippleColor: '#444'
        }
    }
    componentDidMount() {
        var t = this;
        this.setState({
            position: (t.props.position == null) ? 'left' : t.props.position,
            inverted: (t.props.inverted == null) ? false : t.props.inverted,
            image: (t.props.image == null) ? '' : t.props.image,
            rippleColor: (t.props.rippleColor == null) ? '#444' : t.props.rippleColor
        });
    }
    onMouseDown() {
        var ripple = Ripple.createRipple(this.refs.root, {
            backgroundColor: this.state.rippleColor
        }, createRippleCenter(this.refs.root, 14));
        Ripple.makeRipple(ripple);
    }
    render() {
        return (
            <div ref="root" onMouseDown={this.onMouseDown} style={this.props.style} className={(this.state.position == 'left') ? 'toolbar-icon pointer left' : 'toolbar-icon pointer right'}>
                <div className={(this.state.inverted) ? 'toolbar-image white' : 'toolbar-image'} style={{backgroundImage: 'url(' + this.state.image + ')'}}></div>
            </div>
        );
    }
}
