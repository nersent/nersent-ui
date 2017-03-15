'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';
import {FlatButton} from './buttons.js';

export default class Snackbar extends React.Component {
    constructor() {
        super();
        //global properties
        this.state = {
            position: 'center'
        }
    }

    componentDidMount() {
        this.setPosition(this.props.position);
    }

    /*
    * shows the snackbar
    */
    show = () => {
        var t = this;
        this.refs.snackbar.style.display = 'block';
        TweenMax.to(this.refs.snackbar, 0.3, {
            css: {
                bottom: 0
            }
        });
        var _delay = setInterval(function() {
            t.hide();
            clearInterval(_delay);
        }, this.props.hideTime);
    }

    /*
    * hides the snackbar
    */
    hide = () => {
        var t = this;
        TweenMax.to(this.refs.snackbar, 0.7, {
            css: {
                bottom: -200
            },
            onComplete: function() {
                t.refs.snackbar.style.display = 'none';
            }
        });
    }

    /*
    * switches position to left or right of a snackbar
    * @param1 {String} position
    */
    setPosition = (position) => {
        var t = this;
        switch(position) {
            case 'left':
                t.refs.snackbar.style.margin = 0;
                t.refs.snackbar.style.left = t.props.marginLeft;
                t.setState({position: 'left'});
                break;
            case 'right':
                t.refs.snackbar.style.margin = 0;
                t.refs.snackbar.style.right = t.props.marginRight;
                t.setState({position: 'right'});
                break;
            default:
                t.refs.snackbar.style.margin = "0 auto";
                t.refs.snackbar.style.left = 0;
                t.refs.snackbar.style.right = 0;
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <div className="material-snackbar" ref="snackbar" style={{backgroundColor: this.props.backgrondColor, color: this.props.textColor}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

class SnackbarBody extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="text" ref="text">
                {
                    this.props.children
                }
            </div>
        );
    }
}

class SnackbarAction extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <FlatButton onClick={this.onClick} ref="flatbutton" color={this.props.color} textOpacity={this.props.textOpacity} opacity={this.props.opacity} backgroundColor={this.props.backgroundColor} rippleColor={this.props.rippleColor}>
                {this.props.children}
            </FlatButton>
        );
    }
}

SnackbarAction.defaultProps = {
    text: "BUTTON",
    color: '#FFEB3B',
    textOpacity: 1,
    opacity: 1,
    backgroundColor: 'transparent',
    rippleColor: '#FFEB3B'
};

Snackbar.defaultProps = {
    hideTime: 4000,
    position: 'center',
    backgroundColor: '#323232',
    opacity: 1,
    textColor: "#fff"
};

export {Snackbar, SnackbarBody, SnackbarAction};
