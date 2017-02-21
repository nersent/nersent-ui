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
            TweenMax.to(this.refs.pbar, this.props.animationTime, {
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
                    <div className="pbar" ref="pbar" style={{backgroundColor: this.props.barColor}}></div>
                </div>
            </div>
        );
    }
}

ProgressBarDeterminate.defaultProps = {
    backgroundColor: "#afd1ee",
    barColor: "#03a9f4",
    animationTime: 0.7
};

class ProgressBarInDeterminate extends React.Component {
    constructor() {
        super();
        //binds

        //global properties
    }

    componentDidMount() {

    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

ProgressBarInDeterminate.defaultProps = {

};

export {ProgressBarDeterminate, ProgressBarInDeterminate};
