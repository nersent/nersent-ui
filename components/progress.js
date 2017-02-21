'use babel';
import React from 'react';
import {TweenMax, CSSPlugin} from 'gsap';

export default class ProgressBarDeterminate extends React.Component {
    constructor() {
        super();
        //binds
        this.setPercent = this.setPercent.bind(this);
        this.setValue = this.setValue.bind(this);
        //global properties
    }

    componentDidMount() {

    }

    setPercent(per) {
        if (per != undefined && per != null) {
            per = per + '%';
            TweenMax.to(this.refs.divider, this.props.animationTime, {
                css: {
                    width: per
                }
            });
        }
    }

    setValue(max, i) {
        if (max != undefined && max != null && i != undefined && i != null) {
            var per = (i * 100) / max;
            this.setPercent(per);
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <div className="progress-determinate" ref="progress" style={{backgroundColor: this.props.backgroundColor}}>
                    <div className="divider" ref="divider" style={{backgroundColor: this.props.barColor}}></div>
                </div>
            </div>
        );
    }
}

ProgressBarDeterminate.defaultProps = {
    backgroundColor: "#afd1ee",
    dividerColor: "#03a9f4",
    animationTime: 0.7
};

class ProgressBarInDeterminate extends React.Component {
    constructor() {
        super();
        //binds
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        //global properties
        this.state = {
            animate: false
        }
    }

    componentDidMount() {

    }

    start() {
        this.setState({animate: true});
        this.animate();
    }

    stop() {
        this.setState({animate: false});
        this.refs.divider.style.left = "-100%";
        this.refs.divider_fast.style.left = "-100%";
    }

    // TODO: easing functions
    animate() {
        var t = this;
        if (this.state.animate) {
            TweenMax.to(this.refs.divider, 1, {
                css: {
                    left: '100%'
                },
                onComplete: function() {
                    TweenMax.to(t.refs.divider_fast, 0.8, {
                        css: {
                            left: '100%'
                        },
                        onComplete: function() {
                            t.refs.divider.style.left = "-100%";
                            t.refs.divider_fast.style.left = "-100%";
                            t.animate();
                        }
                    });
                }
            });
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <div className="progress-indeterminate" ref="progress" style={{backgroundColor: this.props.backgroundColor}}>
                    <div className="divider" ref="divider" style={{backgroundColor: this.props.barColor}}></div>
                    <div className="divider-fast" ref="divider_fast" style={{backgroundColor: this.props.barColor}}></div>
                </div>
            </div>
        );
    }
}

ProgressBarInDeterminate.defaultProps = {
    backgroundColor: "#afd1ee",
    dividerColor: "#03a9f4"
};

export {ProgressBarDeterminate, ProgressBarInDeterminate};
