'use babel';
import React from 'react';

export default class ToolbarTitle extends React.Component {
    constructor() {
        super();
        //binds

        //global properties

    }
    componentDidMount() {}
    render() {
        return (
            <div className='toolbar-title toolbar-left toolbar-item' style={{
                color: this.props.color,
                fontSize: this.props.fontSize,
                fontFamily: this.props.fontFamily,
                opacity: this.props.opacity,
                fontWeight: this.props.fontWeight
            }}>
                {this.props.children}
            </div>
        );
    }
}

ToolbarTitle.defaultProps = {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Roboto',
    opacity: 0.8,
    fontWeight: 'bold'
};
