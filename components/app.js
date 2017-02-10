'use babel';
import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './toolbar.js';
import ToolbarIcon from './toolbaricon.js';
import ToolbarItem from './toolbaritem.js';
import ToolbarTitle from './toolbartitle.js';

import FlatButton from './flatbutton.js';
import Checkbox from './checkbox.js';
import Card from './card.js';
import {CSSPlugin, TweenMax} from 'gsap';

export default class App extends React.Component {
    constructor() {
        super();
        //binds

        //global properties

    }

    componentDidMount() {

    }

    render() {
        return (
            <Toolbar ref="toolbar">
                <ToolbarIcon image="app/resources/img/menu.png"></ToolbarIcon>
                <ToolbarTitle>Title</ToolbarTitle>
                <ToolbarIcon position="right" image="app/resources/img/menu.png"></ToolbarIcon>
                <ToolbarItem position="right">
                    <FlatButton textOpacity={0.9} rippleColor="#000" color="#000">
                        BUTTON
                    </FlatButton>
                </ToolbarItem>
            </Toolbar>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
