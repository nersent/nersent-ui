'use babel';
import React from 'react';

export default class ToolbarIcon extends React.Component {
    constructor() {
        super();
        //binds
        this.onMouseDown = this.onMouseDown.bind(this);
        //global properties

    }
    componentDidMount() {}
    onMouseDown() {
        var ripple = Ripple.createRipple(this.refs.toolbarIcon, {
            backgroundColor: this.props.rippleColor
        }, createRippleCenter(this.refs.toolbarIcon, 14));
        Ripple.makeRipple(ripple);
    }
    render() {
        var iconClassName = ((this.props.position == 'left') ? 'toolbar-left' : 'toolbar-right') + " toolbar-item toolbar-icon",
            imageClassName = ((this.props.inverted) ? 'inverted' : '') + " toolbar-image";

        return (
            <div ref="toolbarIcon" onMouseDown={this.onMouseDown} className={iconClassName}>
                <div className={imageClassName} style={{
                    backgroundImage: 'url(' + this.props.image + ')',
                    opacity: this.props.opacity
                }}></div>
            </div>
        );
    }
}

ToolbarIcon.defaultProps = {
    inverted: false,
    position: 'left',
    rippleColor: '#212121',
    opacity: 0.7
};
