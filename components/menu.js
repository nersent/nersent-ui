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

Menu.defaultProps = {
    showAnimationTime: 0.4,
    hideAnimationTime: 0.3
};
