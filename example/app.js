'use babel';

import React from 'react';

import {Dialog, DialogContent, DialogTitle, DialogActions, DialogActionButton} from '../src/components/dialog.js';
import {Toolbar, ToolbarIcon, ToolbarItem, ToolbarTitle} from '../src/components/toolbar.js';
import {Snackbar, SnackbarBody, SnackbarAction} from '../src/components/snackbar.js';
import {FlatButton, RaisedButton} from '../src/components/buttons.js';
import {Menu, MenuItem} from '../src/components/menu.js';
import TextField from '../src/components/textfield.js';
import Checkbox from '../src/components/checkbox.js';
import Card from '../src/components/card.js';

export default class App extends React.Component {
    constructor() {
        super();
        //global properties
        this.iserror = true;
    }
    /*
    * toggles textfield error
    */
    error = () => {
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
                    <ToolbarIcon image="../src/resources/img/menu.png"></ToolbarIcon>
                    <ToolbarTitle>Title</ToolbarTitle>
                    <ToolbarIcon position="right" image="../src/resources/img/menu.png"></ToolbarIcon>
                    <Menu>
                        <MenuItem>

                        </MenuItem>
                        <MenuItem>

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
                <TextField onError={()=> console.log("error")} ref="textfield" hint="Hint" counter={true} style={{left: 0, right: 0, margin: '0 auto'}}></TextField>
                <RaisedButton onClick={this.error} rippleColor="#000" color="#000" style={{left: '50%', position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)'}} backgroundColor="#03A9F4">
                    CALL ERROR
                </RaisedButton>
                <br></br>
                <RaisedButton onClick={() => this.refs.dialog_1.show()} rippleColor="#000" color="#000" style={{marginLeft: 16}} backgroundColor="#03A9F4">
                    DIALOG 1
                </RaisedButton>
                <br></br>
                <RaisedButton onClick={() => this.refs.dialog_2.show()} rippleColor="#000" color="#000" style={{marginLeft: 16}} backgroundColor="#03A9F4">
                    DIALOG 2
                </RaisedButton>
                <br></br>
                <Snackbar ref="snackbar">
                    <SnackbarBody>
                        Successfully created snackbar :)
                    </SnackbarBody>
                    <SnackbarAction>
                        OK
                    </SnackbarAction>
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
            </div>
        );
    }
}
