'use babel';
import React from 'react';

export default class ToolbarIcon extends React.Component {
    constructor() {
        super();
        //binds

        //global properties
        this.state = {
            position: 'left',
            image: '',
            inverted: false
        }
    }
    componentDidMount() {
        var t = this;
        this.setState({
            position: (t.props.position == null) ? 'left' : t.props.position,
            inverted: (t.props.inverted == null) ? false : t.props.inverted,
            image: (t.props.image == null) ? '' : t.props.image
        });
    }
    render() {
        return (
            <div style={this.props.style} className={(this.state.position == 'left') ? 'toolbar-icon left' : 'toolbar-icon right'}>
                <div className={(this.state.inverted) ? 'toolbar-image white' : 'toolbar-image'} style={{backgroundImage: 'url(' + this.state.image + ')'}}></div>
            </div>
        );
    }
}
