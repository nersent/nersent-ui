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
import Snackbar from './snackbar.js';
import {CSSPlugin, TweenMax} from 'gsap';

export default class App extends React.Component {
    constructor() {
        super();
        //binds
        this._snackbar = this._snackbar.bind(this);
        //global properties

    }

    componentDidMount() {

    }
    _snackbar() {
        console.log("XDDDDD co");
    }

    render() {
        return (
            <div>
                <Toolbar ref="toolbar">
                    <ToolbarIcon image="app/resources/img/menu.png"></ToolbarIcon>
                    <ToolbarTitle>Title</ToolbarTitle>
                    <ToolbarIcon position="right" image="app/resources/img/menu.png"></ToolbarIcon>
                    <ToolbarItem position="right">
                        <FlatButton onFlatButtonClick={() => this.refs.snackbar.show()} textOpacity={0.9} rippleColor="#000" color="#000">
                            BUTTON
                        </FlatButton>
                    </ToolbarItem>
                </Toolbar>
                <Card header="Header" style={{marginLeft: 16, marginTop: 16, marginRight: 16, width: 512}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Card>
                <br></br>
                <br></br>
                <Snackbar ref="snackbar" flatButton={true} flatButtonText={"RETRY"} onFlatButtonClick={this._snackbar}>
                    Connection timed out. Showing limited messages.
                </Snackbar>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
