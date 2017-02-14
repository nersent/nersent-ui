'use babel';
import React from 'react';

export default class Toolbar extends React.Component {
    constructor() {
        super();
        //binds

        //global properties
    }

    componentDidMount() {

    }

    render() {
        var style = this.props.style;
        if (style == null) {
            style = {

            };
        }
        style.height = this.props.height;
        style.backgroundColor = this.props.backgroundColor;
        return (
            <div ref="toolbar" className="toolbar no-select" style={style}>
                <div className="toolbar-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Toolbar.defaultProps = {
    height: 56,
    backgroundColor: '#03A9F4'
};
