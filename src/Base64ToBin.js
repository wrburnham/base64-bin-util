import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { toast } from 'react-toastify';

class Base64ToBin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { downloadLink: '', actionEnabled: false };
        this.update = this.update.bind(this);
    }

    update(event) {
        this.setState({actionEnabled: false});
        const input = event.target.value;
        let decoded = '';
        try {
            toast.info('Converting...', { toastId: 'toast-converting-b64tobin' });
            decoded = atob(input);
        } catch (e) {
            toast.error(`Error: ${e.message}`, { toastId: 'toast-error-b64tobin' });
            console.error(e);
            decoded = '';
        }
        if (decoded !== '') {
            const link = this.downloadLink(this.toBin(decoded));
            if (this.state.downloadLink !== '') {
                window.URL.revokeObjectURL(this.state.downloadLink);
            }
            toast.info('Converted', { toastId: 'toast-converted-b64tobin' });
            this.setState({downloadLink: link, actionEnabled: true});
        }
    }

    downloadLink(data) {
        const blob = new Blob(
            [data], 
            {type: 'application/octet-stream'});
        return window.URL.createObjectURL(blob);
    }

    toBin(raw) {
        const bytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
            bytes[i] = raw.charCodeAt(i);
        }
        return bytes;
    }

    render() {
        const marginProps = {
            style: {
                marginBottom: '1rem',
                marginTop: '2rem'
            }
        };
        return (
            <div>
                <Box>
                    <TextField
                        multiline 
                        rows={4}
                        rowsMax={4} 
                        fullWidth
                        size='medium'
                        placeholder='Paste some base 64 text here'
                        onChange={this.update}/>
                </Box>
                <Box {...marginProps}>
                    <Button 
                        color='primary' 
                        variant='contained' 
                        disabled={!this.state.actionEnabled}
                        href={this.state.downloadLink}
                        download='binary'>
                        <Typography>Download</Typography>
                    </Button>
                </Box>
            </div>
        );
    }

}

export default Base64ToBin;