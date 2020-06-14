import React from 'react';
import { toast } from 'react-toastify';
import { Tabs, Tab } from '@material-ui/core';
import TabPanel from './TabPanel.js';
import AppBar from '@material-ui/core/AppBar';
import Base64ToBin from './Base64ToBin';
import BinToBase64 from './BinToBase64';

class Base64Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 0};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, newValue) {
        this.setState({value: newValue});
    }

    render() {
        return (
            <>
                <AppBar position='static'>
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        <Tab label='b64 to bin'></Tab>
                        <Tab label='bin to b64'></Tab>
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <Base64ToBin/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <BinToBase64/>
                </TabPanel>
            </>
        );
    }

}

export default Base64Panel;