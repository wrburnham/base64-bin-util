import React from 'react';
import { toast } from 'react-toastify';
import { Tabs, Tab } from '@material-ui/core';
import TabPanel from './TabPanel.js';
import AppBar from '@material-ui/core/AppBar';

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
                    Item 1
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    Item 2
                </TabPanel>
            </>
        );
    }

}

export default Base64Panel;