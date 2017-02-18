'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class Menu extends React.Component {
    constructor() {
        super();
        //binds
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        //global properties
        this.state = {
            active: false
        }
    }

    componentDidMount() {

    }
    show() {

    }
    hide() {

    }
    render() {
        return (
            <div className="menu">
                {this.props.children}
            </div>
        );
    }
}

class MenuItem extends React.Component {
    constructor() {
        super();
        //binds
        this.ripple = this.ripple.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        //global properties
    }

    componentDidMount() {

    }
    ripple(e) {
        var ripple = Ripple.createRipple(this.refs.header, {
            backgroundColor: "#444"
        }, createRippleMouse(this.refs.header, e));
        Ripple.makeRipple(ripple);
    }
    onMouseEnter(e) {
        TweenMax.to(this.refs.item, 0.3, {
            css: {
                backgroundColor: "#e4e4e4"
            }
        });
    }
    onMouseLeave(e) {
        TweenMax.to(this.refs.item, 0.3, {
            css: {
                backgroundColor: "#fff"
            }
        });
    }
    render() {
        var _header, _submenu;
        React.Children.forEach(this.props.children, function (child) {
            if (child.type == "header") {
                _header = child.props.children;
            } else if (child.type == "menu") {
                _submenu = child.props.children;
            }
            console.log(child.type);
        });
        return (
            <div className="menu-item" ref="item" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseDown={this.ripple}>
                <div className="header ripple no-select" ref="header">
                    {_header}
                </div>
                <div className="submenu" ref="submenu">
                    {_submenu}
                </div>
            </div>
        );
    }
}

MenuItem.defaultProps = {

};


Menu.defaultProps = {
    showAnimationTime: 0.4,
    hideAnimationTime: 0.3
};

export {Menu, MenuItem};
