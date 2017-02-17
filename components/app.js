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
import TextField from './textfield.js';
import Dialog from './dialog.js';
import DialogActionButton from './dialogactionbutton.js';
import Menu from './menu.js';
import MenuItem from './menuitem.js';

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
        this.refs.textfield.setText("XDD Co");
    }

    render() {
        return (
            <div>
                <Toolbar ref="toolbar">
                    <ToolbarIcon image="app/resources/img/menu.png"></ToolbarIcon>
                    <ToolbarTitle>Title</ToolbarTitle>
                    <ToolbarIcon position="right" image="app/resources/img/menu.png"></ToolbarIcon>
                    <Menu>
                        <MenuItem>

                        </MenuItem>
                        <MenuItem>

                        </MenuItem>
                    </Menu>
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
                <TextField ref="textfield" hintText="XDDD Co" counter={true} maxLength={10} onError={() => console.log("XDDD")} style={{left: 0, right: 0, margin: '0 auto'}} ></TextField>
                <br></br>
                <FlatButton onFlatButtonClick={() => this.refs.dialog_1.show()} rippleColor="#fff" color="#fff" backgroundColor="#ff0000" style={{width: 101}}>
                    DIALOG 1
                </FlatButton>
                <br></br>
                <FlatButton onFlatButtonClick={() => this.refs.dialog_2.show()} rippleColor="#fff" color="#fff" backgroundColor="#ff0000" style={{width: 101}}>
                    DIALOG 2
                </FlatButton>
                <br></br>
                <Snackbar ref="snackbar" flatButton={true} flatButtonText={"RETRY"} onFlatButtonClick={this._snackbar}>
                    Connection timed out. Showing limited messages.
                </Snackbar>
                <Dialog ref="dialog_1">
                    <title>
                        Worth to know ( ͡° ͜ʖ ͡°)
                    </title>
                    <content>
                        <span className="no-select">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                    </content>
                    <actions>
                        <li className="no-select ripple" ref="dialog_1_ok" onMouseDown={(e) => this.refs.dialog_1.ripple(this.refs.dialog_1_ok, "#009688", e)}>OK</li>
                        <li className="no-select ripple" ref="dialog_1_cancel" onMouseDown={(e) => this.refs.dialog_1.ripple(this.refs.dialog_1_cancel, "#009688", e)} onClick={() => this.refs.dialog_1.hide()}>CANCEL</li>
                    </actions>
                </Dialog>
                <Dialog ref="dialog_2" actionsList={true}>
                    <title>
                        Are you batman?
                    </title>
                    <content>
                        <img src="https://media.giphy.com/media/EQnSR0DaGzeEg/giphy.gif" className="no-select" style={{pointerEvent: 'none', width: "100%"}}></img>
                    </content>
                    <actions>
                        <DialogActionButton>MUUU</DialogActionButton>
                        <DialogActionButton>USH ASH ĄSH</DialogActionButton>
                    </actions>
                </Dialog>
            </div>
        );
    }
}
/*
<li className="no-select ripple" ref="dialog_2_ok" onMouseDown={(e) => this.refs.dialog_2.ripple(this.refs.dialog_2_ok, "#009688", e)}>BATMAN IS ONLY ONE AND I AM BATMAN</li>
<li className="no-select ripple" ref="dialog_2_cancel" onMouseDown={(e) => this.refs.dialog_2.ripple(this.refs.dialog_2_cancel, "#009688", e)} onClick={() => this.refs.dialog_2.hide()}>AHA CO</li>
*/

ReactDOM.render(<App/>, document.getElementById('app'));
