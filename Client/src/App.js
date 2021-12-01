import React from 'react';
/////////////COMPONENTS///////////////
import Header from './components/Header.js';
import UploadFile from './components/UploadFile.js';
import UploadMetadata from './components/UploadMetadata.js';
import './App.css';

function App() {
return (
<div className='Backround'>
  <Header />
  <UploadFile />
  <UploadMetadata />
  <h5>To view transaction history on the blockchain visit:</h5>
  <h5>https://ropsten.etherscan.io</h5> 
   <h5>and enter the contract address to view tranactions</h5>
  <h5>Contract Address: 0x951F5f30F701A02551DcC30a9F8715C831Ec9c51</h5>
</div>
  ) 
}

export default App