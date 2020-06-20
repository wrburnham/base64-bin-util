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
    }

    handleAccepted(files) {
        if (files.length === 0) {
            toast.error('No file specified.');
        } else if (files.length !== 1) {
            toast.error('Cannot process multiple files.');
        } else {
            const reader = new FileReader();
            const callback = data => {
                this.setState({output: data});
            };
            reader.onload = function() {
                try {
                    const b64 = btoa(String.fromCharCode.apply(
                        null, 
                        new Uint8Array(this.result)));
                    callback(b64);
                } catch (e) {
                    console.log(e);
                    toast.error('Invalid input.');
                }
            }
            reader.readAsArrayBuffer(files[0]);
        }
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
          const dropzoneTextProps = {
              style: {
                  paddingBottom: '1rem',
                  paddingTop: '1rem'
                }
            };
        return (
            <div>
                <Box {...marginProps}>
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
                <Box>
                    <TextField
                        multiline 
                        rows={4}
                        rowsMax={4} 
                        fullWidth
                        size='medium'
                        placeholder='Output'
                        value={this.state.output}
                        InputProps={{readOnly:true}}/>
                </Box>
            </div>
        );
    }

}

export default BinToBase64;