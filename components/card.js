'use babel';
import React from 'react';

export default class Card extends React.Component {
    constructor() {
        super();
        //binds

        //global properties
        this.state = {
            header: "",
            headerTextColor: "#212121",
            headerBackgroundColor: "#fff",
            backgroundColor: "#fff"
        }
    }
    componentDidMount() {
        var t = this;
        this.setState({
            header: (t.props.header == null) ? "" : t.props.header,
            headerTextColor: (t.props.headerTextColor == null) ? "#212121" : t.props.headerTextColor,
            headerBackgroundColor: (t.props.headerBackgroundColor == null) ? "#fff" : t.props.headerBackgroundColor,
            backgroundColor: (t.props.backgroundColor == null) ? "#fff" : t.props.backgroundColor
        });
    }
    render() {
        var header = (this.state.header == "") ?
        null :
        <div style={{color: this.state.headerTextColor, backgroundColor: this.state.headerBackgroundColor}} className="header">
            <div style={{padding: 16}}>{this.state.header}</div>
            <div className="line"></div>
        </div>;
        return (
            <div style={this.props.style}>
                <div className="card-shadow"  style={{backgroundColor: this.state.backgroundColor}}>
                    <div ref="root" className="card">
                        {header}
                        <div className="content">{this.props.children}</div>
                    </div>
                </div>
            </div>
        );
    }
}
