import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

class TabPanel extends React.Component {
    constructor(props) {
        super(props);
        const { children, value, index, ...other } = props;
    }

    render() {
        return (
            <div 
                role='tabpanel'
                hidden={this.props.value !== this.props.index}
                id={`panel-${this.props.index}`}
                aria-labelledby={`tab-${this.props.index}`}
                {...this.props.other}>
                    {this.props.value === this.props.index && (
                        <Box p={3}>
                            {this.props.children}
                        </Box>
                    )}
            </div>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

export default TabPanel;