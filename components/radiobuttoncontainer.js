'use babel';
import React from 'react';

export default class RadioButtonContainer extends React.Component {
    constructor() {
        super();
        //binds
        this.getRadioButtonContainer = this.getRadioButtonContainer.bind(this);
        this.uncheckOthers = this.uncheckOthers.bind(this);

        //global properties
        this.radiobuttons = [];
    }

    componentDidMount() {
        this.uncheckOthers();
        this.radiobuttons[0].select(false);
    }

    /*
    * returns this
    */
    getRadioButtonContainer() {
        return this;
    }

    /*
    * unchecks other radiobuttons
    */
    uncheckOthers() {
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
