'use babel';
import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarIcon, ToolbarItem, ToolbarTitle} from './toolbar.js';

import FlatButton from './flatbutton.js';
import RaisedButton from './raisedbutton.js';
import Checkbox from './checkbox.js';
import Card from './card.js';
import Snackbar from './snackbar.js';
import TextField from './textfield.js';
import {Dialog, DialogContent, DialogTitle, DialogActions, DialogActionButton} from './dialog.js';
import {Menu, MenuItem} from './menu.js';
import {ProgressBarDeterminate, ProgressBarInDeterminate} from './progress.js';

import {CSSPlugin, TweenMax} from 'gsap';

export default class App extends React.Component {
    constructor() {
        super();
        //binds
        this.error = this.error.bind(this);
        //global properties
        this.iserror = true;
    }

    componentDidMount() {

    }

    error() {
        if (this.iserror) {
            this.refs.textfield.setError(false);
            this.iserror = false;
        } else {
            this.refs.textfield.setError(true, 'Error message');
            this.iserror = true;
        }
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
                            <header>
                            Test
                            </header>
                        </MenuItem>
                        <MenuItem>
                            <header>
                            XD
                            </header>
                        </MenuItem>
                    </Menu>
                    <ToolbarItem position="right">
                        <FlatButton onClick={() => this.refs.snackbar.show()} textOpacity={0.9} rippleColor="#000" color="#000">
                            BUTTON
                        </FlatButton>
                    </ToolbarItem>
                </Toolbar>
                <Card header="Header" style={{marginLeft: 16, marginTop: 16, marginRight: 16, width: 512}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Card>
                <br></br>
                <br></br>
                <TextField onError={()=> console.log("error")} ref="textfield" hint="XDDD Co" counter={true} style={{left: 0, right: 0, margin: '0 auto'}}></TextField>
                <RaisedButton onClick={this.error} rippleColor="#000" color="#000" style={{left: '50%', position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)'}} backgroundColor="#03A9F4">
                    CALL ERROR
                </RaisedButton>
                <br></br>
                <RaisedButton onClick={() => this.refs.dialog_1.show()} rippleColor="#000" color="#000" style={{marginLeft: 16}} backgroundColor="#03A9F4">
                    DIALOG 1
                </RaisedButton>
                <br></br>
                <RaisedButton onClick={() => this.refs.dbar.start()} rippleColor="#000" color="#000" style={{marginLeft: 16}} backgroundColor="#03A9F4">
                    DIALOG 2
                </RaisedButton>
                <br></br>
                <Snackbar ref="snackbar" flatButton={true} flatButtonText={"WOAH!"} onFlatButtonClick={this._snackbar}>
                    Successfully created snackbar :)
                </Snackbar>
                <Dialog ref="dialog_1">
                    <DialogTitle>
                        Header
                    </DialogTitle>
                    <DialogContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </DialogContent>
                    <DialogActions actionsList={true}>
                        <DialogActionButton>
                            ACTION BUTTON 1
                        </DialogActionButton>
                        <DialogActionButton>
                            ACTION BUTTON 2
                        </DialogActionButton>
                    </DialogActions>
                </Dialog>
                <Dialog ref="dialog_2">
                    <DialogTitle>
                        Header
                    </DialogTitle>
                    <DialogContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </DialogContent>
                    <DialogActions actionsList={false}>
                        <DialogActionButton>
                            CANCEL
                        </DialogActionButton>
                        <DialogActionButton>
                            OK
                        </DialogActionButton>
                    </DialogActions>
                </Dialog>
                <br></br>
                <ProgressBarInDeterminate ref="dbar" style={{left: 0, right: 0, margin: '0 auto', width: 500}}></ProgressBarInDeterminate>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
