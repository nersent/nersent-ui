'use babel';
import React from 'react';
import Toolbar from './toolbar.js';
import ToolbarIcon from './toolbaricon.js';
import ToolbarItem from './toolbaritem.js';
import MaterialButton from './materialbutton.js';
import Card from './card.js';

export default class App extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                <Toolbar title="Title">
                    <ToolbarIcon inverted={true} rippleColor='#fff' image='app/resources/img/menu.png'></ToolbarIcon>
                    <ToolbarIcon inverted={true} rippleColor='#fff' position="right" image='app/resources/img/menu.png'></ToolbarIcon>
                    <ToolbarItem position="right"><MaterialButton rippleColor='#fff' type={1} style={{color: '#fff'}}>BUTTON</MaterialButton></ToolbarItem>
                </Toolbar>
                <Card header="Header" style={{marginLeft: 16, marginTop: 16, marginRight: 16}}>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                    <MaterialButton backgroundColor='#2196F3' rippleColor='#fff' type={0} style={{color: '#fff', float: 'right', marginBottom: 4, marginTop: 8, zIndex: 9999}}>BUTTON</MaterialButton>
                </Card>
            </div>
        );
    }
}
