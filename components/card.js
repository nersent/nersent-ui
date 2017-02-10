'use babel';
import React from 'react';

export default class Card extends React.Component {
    constructor() {
        super();
        //binds

        //global properties

    }
    componentDidMount() {

    }
    render() {
        var canDisplayHeader = (this.props.header == "") ? '' :
        <div style={{backgroundColor: this.props.headerBackgroundColor}} className="card-header">
            <div className="card-header-content">
                {this.props.header}
            </div>
            <div style={{backgroundColor: this.props.headerLineColor}} className="card-header-line"></div>
        </div>;
        return (
            <div style={this.props.style}>
                <div className="card-shadow">
                    <div className="card" style={{backgroundColor: this.props.backgroundColor, color: this.props.color}}>
                        {canDisplayHeader}
                        <div className="card-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Card.defaultProps = {
    header: "",
    headerLineColor: "#eee",
    headerBackgroundColor: '#fff',
    backgroundColor: '#fff',
    color: '#212121'
};
