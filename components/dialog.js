'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class Dialog extends React.Component {
    constructor() {
        super();
        //binds
        this.ripple = this.ripple.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        //global properties
        this.state = {
            active: false
        }
    }

    componentDidMount() {
        if (this.props.actionsList) {
            this.refs.actions_list.className += " dialog-list";
        }
    }
    ripple(element, color, e) {
        var ripple = Ripple.createRipple(element, {
            backgroundColor: color
        }, createRippleMouse(element, e));
        Ripple.makeRipple(ripple);
    }
    show() {
        var t = this;
        if (!this.state.active) {
            this.refs.dark.style.display = 'block';
            TweenMax.to(this.refs.dark, this.props.showAnimationTime, {
                css: {
                    opacity: 0.7
                }
            });
            this.refs.dialog.style.display = 'block';
            TweenMax.to(this.refs.dialog, this.props.showAnimationTime, {
                css: {
                    opacity: 1,
                    marginTop: 0
                }
            });
            this.setState({active: true});
        }
    }
    hide() {
        var t = this;
        if (this.state.active) {
            TweenMax.to(this.refs.dark, this.props.hideAnimationTime, {
                css: {
                    opacity: 0
                },
                onComplete: function() {
                    t.refs.dark.style.display = 'none';
                }
            });
            this.refs.dialog.style.display = 'block';
            TweenMax.to(this.refs.dialog, this.props.hideAnimationTime, {
                css: {
                    opacity: 0,
                    marginTop: "-100%"
                },
                onComplete: function() {
                    t.refs.dialog.style.display = 'none';
                }
            });
            this.setState({active: false});
        }
    }
    render() {
        var _title, _content, _actions;
        React.Children.forEach(this.props.children, function (child) {
            if (child.type == "title") {
                _title = child.props.children;
            } else if (child.type == "content") {
                _content = child.props.children;
            } else if (child.type == "actions") {
                _actions = child.props.children
            }
        });
        return (
            <div>
                <div className="dialog-dark" ref="dark" onClick={this.hide}></div>
                <div className="dialog" ref="dialog">
                    <div className="dialog-title no-select" ref="title">{_title}</div>
                    <div className="dialog-content" ref="content">
                        {_content}
                    </div>
                    <div className="dialog-actions" ref="actions_list">
                        {_actions}
                        <div className="clear-both"></div>
                    </div>
                </div>
            </div>
        );
    }
}

Dialog.defaultProps = {
    showAnimationTime: 0.4,
    hideAnimationTime: 0.3
};
