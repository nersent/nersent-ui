'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class RadioButton extends React.Component {
    constructor() {
        super();
        //global properties
        this.selected = false;
    }

    componentDidMount() {
        this.props.getParent().radiobuttons.push(this);
    }

    /*
    events
    */
    onClick = () => {
        this.props.getParent().uncheckOthers();
        this.select();
    }
    onMouseDown = () => {
        if (!this.selected) {
            var ripple = Ripple.createRipple(this.refs.radiobutton, null, createRippleCenter(this.refs.radiobutton));
            Ripple.makeRipple(ripple);
        }
    }

    /*
    * unselects the radiobutton
    */
    unselect() {
        TweenMax.to(this.refs.circle, 0.1, {css:{borderColor: this.state.offColor}});
        TweenMax.to(this.refs.border, 0.1, {css:{borderColor: this.state.offColor}});
        this.refs.circle.classList.remove('scaleUp');
        this.refs.circle.classList.add('scaleDown');
        this.selected = false;
    }

    /*
    * checks the radiobutton
    */
    select = () => {
        TweenMax.to(this.refs.circle, 0.1, {css:{borderColor: this.state.onColor}});
        TweenMax.to(this.refs.border, 0.1, {css:{borderColor: this.state.onColor}});
        this.refs.circle.classList.remove('scaleDown');
        this.refs.circle.classList.add('scaleUp');
        this.selected = true;
    }

    render() {
        return (
            <div className="rb-root">
                <div ref="radiobutton" onClick={this.onClick} onMouseDown={this.onMouseDown} className="radiobutton" style={this.props.style}>
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

class RadioButtonContainer extends React.Component {
    constructor() {
        super();
        //global properties
        this.radiobuttons = [];
    }

    componentDidMount() {
        this.uncheckOthers();
        this.radiobuttons[0].select();
    }

    /*
    * gets radio button container
    * @return {RadioButtonContainer}
    */
    getRadioButtonContainer = () => {
        return this;
    }

    /*
    * unchecks other radiobuttons
    */
    uncheckOthers = () => {
        for (var i = 0; i < this.radiobuttons.length; i++) {
            this.radiobuttons[i].unselect(false);
        }
    }

    render() {
        var childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                getParent: this.getRadioButtonContainer
            })
        );
        return (
            <div>
                {childrenWithProps}
            </div>
        );
    }
}

FlatButton.defaultProps = {
    onColor: '#03A9F4',
    offColor: '#757575'
};

export {RadioButton, RadioButtonContainer};
