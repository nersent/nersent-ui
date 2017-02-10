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
                <Toolbar title="Tytuł">
                    <ToolbarIcon inverted={true} rippleColor='#fff' image='app/resources/img/menu.png'></ToolbarIcon>
                    <ToolbarIcon inverted={true} rippleColor='#fff' position="right" image='app/resources/img/menu.png'></ToolbarIcon>
                    <ToolbarItem position="right"><MaterialButton rippleColor='#fff' type={1} style={{color: '#fff'}}>SIEMA</MaterialButton></ToolbarItem>
                </Toolbar>
                <Card header="Header" style={{marginLeft: 16, marginTop: 16}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Card>
            </div>
        );
    }
}
