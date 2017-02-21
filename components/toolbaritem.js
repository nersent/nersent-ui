'use babel';
import React from 'react';

export default class ToolbarItem extends React.Component {
    constructor() {
        super();
        //binds

        //global properties
    }
    componentDidMount() {
    }
    render() {
        var isLeftOrRight = ((this.props.position == 'left') ? 'toolbar-left' : 'toolbar-right'),
            isInverted = ((this.props.inverted == false) ? '' : 'inverted'),
            className = isLeftOrRight + " toolbar-item " + isInverted;
        return (
            <div className={className} style={
                {
                    color: this.props.color,
                    opacity: this.props.opacity
                }}>
                {this.props.children}
            </div>
        );
    }
}

ToolbarItem.defaultProps = {
    position: 'left',
    color: '#000',
    opacity: 0.9,
    inverted: false
};
