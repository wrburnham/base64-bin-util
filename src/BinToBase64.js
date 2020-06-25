import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';

class BinToBase64 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            output: ''
        };
        this.outputTextId = 'outputTextId';
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }

    handleAccepted(files) {
        if (files.length === 0) {
            toast.error('No file specified.', { toastId: 'toast-error-no-file-bintob64' });
        } else if (files.length !== 1) {
            toast.error('Cannot process multiple files.', { toastId: 'toast-error-multiple-files-bintob64' });
        } else {
            toast.info('Converting...', { toastId: 'toast-converting-bintob64' });
            const file = files[0];
            const reader = new FileReader();
            const callback = data => {
                this.setState({output: data});
                toast.info(`Converted ${file.name} to base64.`, { toastId: 'toast-converted-bintob64' });
            };
            reader.onload = function() {
                try {
                    const bytes = new Uint8Array(this.result);
                    const len = bytes.byteLength;
                    let bin = '';
                    for (let i = 0; i < len; i++) {
                        bin += String.fromCharCode(bytes[i]);
                    }
                    callback(btoa(bin));
                } catch (e) {
                    toast.error(`Error: ${e.message}`, { toastId: 'toast-error-bintob64' });
                    console.error(e);
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    copyToClipboard(event) {
        document.getElementById(this.outputTextId).select();
        document.execCommand('copy');
        event.target.focus();
        toast.info('Copied base64 text to clipboard.', { toastId: 'toast-copy-bintob64' });
    }

    render() {
        const dropzoneProps = {
            bgcolor: 'background.default',
            color: 'primary.light',
            style: {
                fontWeight: 'bold', 
                borderWidth: '2px', 
                borderStyle: 'dashed',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: '1rem'},
          };
          const marginProps = {
              style: {
                  marginBottom: '1rem',
                  marginTop: '2rem'
                }
          };
          const dropzoneBoxMarginProps = {
              style: {
                  marginBottom: '1rem',
                  marginTop: '1rem'
              }
          }
          const dropzoneTextProps = {
              style: {
                  paddingBottom: '1rem',
                  paddingTop: '1rem'
                }
            };
        return (
            <div>
                <Box {...dropzoneBoxMarginProps}>
                    <Dropzone onDrop={files => this.handleAccepted(files)}>
                        {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Box {...dropzoneProps}>
                                    <p {...dropzoneTextProps}>
                                        Drop a file here or click to select.
                                    </p>
                                </Box>
                            </div>
                        </section>
                        )}
                    </Dropzone>
                </Box>
                <Box {...marginProps}>
                    <TextField
                        id={this.outputTextId}
                        multiline 
                        rows={4}
                        rowsMax={4} 
                        fullWidth
                        size='medium'
                        placeholder='Output'
                        value={this.state.output}
                        InputProps={{readOnly:true}}/>
                </Box>
                <Box {...marginProps}>
                    <Button 
                        color='primary' 
                        variant='contained'
                        disabled={this.state.output === ''} 
                        onClick={this.copyToClipboard}>
                            <Typography>Copy</Typography>
                    </Button>
                </Box>
            </div>
        );
    }

}

export default BinToBase64;