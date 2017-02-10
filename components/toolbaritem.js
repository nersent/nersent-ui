'use babel';
import React from 'react';

export default class ToolbarItem extends React.Component {
    constructor() {
        super();
        //binds

        //global properties
        this.state = {
            position: 'left'
        }
    }
    componentDidMount() {
        var t = this;
        this.setState({
            position: (t.props.position == null) ? 'left' : t.props.position
        });
    }
    render() {
        return (
            <div style={this.props.style} className={(this.state.position == 'left') ? 'toolbar-item left' : 'toolbar-item right'}>
                {this.props.children}
            </div>
        );
    }
}
