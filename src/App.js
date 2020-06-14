import React from 'react';
import Base64Panel from './Base64Panel';
import 'typeface-roboto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div className="App">
      <Base64Panel/>
      <ToastContainer autoClose={2500}/>
    </div>
  );
}

export default App;
