'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class RadioButton extends React.Component {
    constructor() {
        super();
        //binds
        this.onClick = this.onClick.bind(this);
        this.unselect = this.unselect.bind(this);
        this.select = this.select.bind(this);
        //global properties
        this.state = {
            onColor: '#2196F3',
            offColor: '#757575'
        }
    }

    componentDidMount() {
        var t = this;
        this.props.getParent().radiobuttons.push(this);
        this.setState({
            onColor: (t.props.onColor == null) ? '#2196F3' : t.props.onColor,
            offColor: (t.props.offColor == null) ? '#757575' : t.props.offColor
        });

    }

    onClick() {
        this.props.getParent().uncheckOthers(this);
        this.select();
    }

    unselect(makeRipple = true) {
        TweenMax.to(this.refs.circle, 0.1, {css:{borderColor: this.state.offColor}});
        TweenMax.to(this.refs.border, 0.1, {css:{borderColor: this.state.offColor}});
        this.refs.circle.classList.remove('scaleUp');
        this.refs.circle.classList.add('scaleDown');
    }

    select(makeRipple = true) {
        TweenMax.to(this.refs.circle, 0.1, {css:{borderColor: this.state.onColor}});
        TweenMax.to(this.refs.border, 0.1, {css:{borderColor: this.state.onColor}});
        this.refs.circle.classList.remove('scaleDown');
        this.refs.circle.classList.add('scaleUp');
    }

    render() {
        return (
            <div className="rb-root" onClick={this.onClick}>
                <div className="radiobutton" style={this.props.style}>
                    <div ref="border" className="border">
                        <div ref="circle" className="circle">
                        </div>
                    </div>
                </div>
                <div className="text">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
