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
        return (
            <div ref="toolbar" className="toolbar no-select" style={{height: this.props.height, backgroundColor: this.props.backgroundColor}}>
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
