'use babel';
import React from 'react';

export default class Toolbar extends React.Component {
    constructor() {
        super();
        //binds
        this.setBackgroundColor = this.setBackgroundColor.bind(this);

        //global properties

        this.state = {
            height: 56,
            backgroundColor: '#2196F3',
            expandable: false,
            title: '',
            color: '#fff'
        }
    }

    componentDidMount() {
        var t = this,
            leftIcons = this.refs.toolbar.getElementsByClassName('left-icon'),
            rightIcons = this.refs.toolbar.getElementsByClassName('right-icon'),
            titles = this.refs.toolbar.getElementsByClassName('title');

        this.setState({
            height: (t.props.height == null) ? 56 : t.props.height,
            backgroundColor: (t.props.backgroundColor == null) ? '#2196F3' : t.props.backgroundColor,
            expandable: (t.props.expandable == null) ? false : t.props.expandable,
            title: (t.props.title == null) ? '' : t.props.title,
            color: (t.props.color == null) ? '#fff' : t.props.color
        });

        if (this.props.expandable) {
            for (var i = 0; i < leftIcons.length; i++) {
                var node = leftIcons[i];
                if (node) {
                    node.style.top = '16px';
                    node.style['transform'] = 'translateY(0px)';
                }
            }
            for (var i = 0; i < rightIcons.length; i++) {
                var node = rightIcons[i];
                if (node) {
                    node.style.top = '16px';
                    node.style['transform'] = 'translateY(0px)';
                }
            }
            for (var i = 0; i < titles.length; i++) {
                var node = titles[i];
                if (node) {
                    node.style['position'] = 'absolute';
                    node.style['top'] = 'auto';
                    node.style['bottom'] = '16px';
                    node.style['left'] = '32px';
                    node.style['transform'] = 'translateY(0px)';
                }
            }
        }
    }

    /*
    * sets background color
    * bg - String
    */
    setBackgroundColor(bg) {
        this.setState({backgroundColor: bg});
    }

    render() {
        return (
            <div ref="toolbar" className="toolbar no-select" style={{height: this.state.height, backgroundColor: this.state.backgroundColor}}>
                {this.props.children}
                <div style={{color: this.state.color}} className="title">{this.state.title}</div>
            </div>
        );
    }
}
