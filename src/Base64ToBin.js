import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

class Base64ToBin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { b64: '', downloadLink: '', canConvert: false, canDownload: false };
        this.handleConvert = this.handleConvert.bind(this);
        this.updateBase64 = this.updateBase64.bind(this);
    }

    updateBase64(event) {
        const input = event.target.value;
        const validationResult = this.isValid(input);
        this.setState({b64: input, canConvert: validationResult, canDownload: false});
    }

    isValid(input) {
        const empty = input === null || input === '' || input.trim() === '';
        // todo add more validation
        return !empty;
    }

    handleConvert() {
        try {
            const link = this.downloadLink(this.binOfB64());
            this.setState({downloadLink: link, canDownload: true, canConvert: false});
        } catch (e) {
            // todo toast
            console.log(e);
        }
    }

    downloadLink(data) {
        const blob = new Blob(
            [data], 
            {type: 'application/octet-stream'});
        return window.URL.createObjectURL(blob);
    }

    binOfB64() {
        const raw = atob(this.state.b64);
        const bytes = new Array(raw.length);
        for (let i = 0; i < raw.length; i++) {
            bytes[i] = raw.charCodeAt(i);
        }
        return new Uint8Array(bytes);
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
                        onChange={this.updateBase64}/>
                </Box>
                <Box {...marginProps}>
                    <Button 
                        color='primary' 
                        variant='contained' 
                        disabled={!this.state.canConvert}
                        onClick={this.handleConvert}>
                        <Typography>Convert</Typography>
                    </Button>
                    <Button
                        color='secondary'
                        variant='contained'
                        href={this.state.downloadLink}
                        download='binary'
                        disabled={!this.state.canDownload}>
                        <Typography>Download</Typography>
                    </Button>
                </Box>
            </div>
        );
    }

}

export default Base64ToBin;