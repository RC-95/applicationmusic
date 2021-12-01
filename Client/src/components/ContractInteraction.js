import React, {useState} from 'react';
import MusicOwnership from '../artifacts/MusicOwnership.json';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import styles from './CSS Modules/FileInputButtons-style.module.css';

function ContractInteraction (props) {

  ///////Webpage State components///////
  const [accounts, setAccounts] = useState([]); //state variable for accounts
  const [web3, setWeb3] = useState (undefined); //web3 state
  const [contract, setContract] = useState (undefined); //contract state
  const [uri, setUri] = useState (undefined); //Uri code State
  const [tokenID, setTokenID] = useState (undefined); //Token ID state
  const [tokenExists, setTokenExists] = useState (false); //Triggers Token UI response on and off
  const [reciever,setReciever ] = useState (undefined);
  const [url, setUrl] = useState (undefined); //Metadata URL state
  const [doesntExist, setDoesntExist] = useState(undefined); //switch for Token ID response
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [owner, setOwner] = useState(undefined);
  const [transactionStatus,setTransactionStatus] = useState(false);
  
    
  //Initialise state variables and connect to Smart Contract//
  async function init() {
             
    try {
      const uri = await (props.CIDkey); 
      const tokenID = await (props.tokenIDs);   
      const  web3 = await new Web3(window.ethereum);
      const accounts = await  web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MusicOwnership.networks[networkId];
      const contract = await new web3.eth.Contract(
      MusicOwnership.abi,
      deployedNetwork && deployedNetwork.address
      );
      await setUri(uri);
      await setWeb3(web3);
      await setAccounts(accounts);
      await setContract(contract);
      }

    catch (error) {
      alert(`Failed to load web3, accounts or contract from the abi. Check console For details.`);
      console.error(error);
    }
  }
    
  ///////Configure wallet and connect to Metamask///////

  async function configureAndConnectMetamask() {
    const provider = await detectEthereumProvider({
      mustBeMetaMask: true
      })
    if (provider) {
      try {
        await provider.request({ method: 'eth_requestAccounts'})
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x3', 
            chainName: 'Ropsten',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
              },
            rpcUrls: ['https://ropsten.infura.io/v3/b3b18fff97b6463ca552f9334d7fe15f'],
            blockExplorerUrls: ['https://ropsten.etherscan.io']
            }]
          })
        } 
      catch(e) {
        console.error(e);
        setConnectionStatus(true);
        }  
      } 
    else {
      console.error('Please install MetaMask');
      alert('Please install the MetaMask wallet extension in Chrome or Brave Browser');
    }
    await init();
  }

  ///////Function for submitting a token Id////////
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(props.showCIDs);
    console.log(tokenID);
    RetrieveTokenURL(tokenID);
    }
      
  const handleChange = (e) => {
  setTokenID(e.target.value)
  }


  ////////////Mint a new Token////////////
  async function Mint() {
    if (uri === undefined || tokenID === undefined) {
      alert('please ensure a file first and that you have entered a numerical Identification number');
      throw('please ensure a file is submitted first and that you have entered a numerical Identification number');
    }
             
    let checkID = await contract.methods.tokenURI(tokenID).call();

    if (checkID =! null)
      {
        alert('This ID number has been taken, please try a different number');
        throw('This ID number has been taken, please try a different number');
      }
    try {
        await contract.methods.mint(accounts[0],uri,tokenID).send({from:accounts[0], gas: 1000000});
      }
    catch(error) {
      alert('Transaction Failed');
      throw('Transaction Failed');
    }
    alert('You succesfully minted your token.');
  }

  ///User input for TokenID request///
  const handleRecieverSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting ID: ${reciever}`)
    setReciever(reciever);
    }
  const handleRecieverChange = (e) => {
  setReciever(e.target.value)
  }

  /////////Retrieve a Token's Metadata and source File/////////
  async function RetrieveTokenURL() {
    if (tokenID === undefined)
      {
        alert('please enter a numerical Identification number');
        throw('please enter a numerical Identification number');
      }
            
    try {
      const url = await contract.methods.tokenURI(tokenID).call();
      setUrl(url);
      console.log(JSON.stringify(url));
      const owner = await contract.methods.ownerOf(tokenID).call();
      setOwner(owner);
      setTokenExists(true);
    }
    catch(error){
    setDoesntExist('This Token ID does not exist and is available to be used');
    setTokenExists(false);
    }
  }

              
  async function TransferToken()  {
    console.log(reciever);
    console.log(tokenID);
    console.log(accounts[0]);
    if ({reciever} == null || {tokenID} == null || accounts[0] == null){
      alert('Please ensure an address to send the token to has been submitted.\nPlease also ensure a token identifier has been submitted')
      throw('Please ensure an address to send the token to has been submitted.\nPlease also ensure a token identifier has been submitted')
    }

    try {
      await contract.methods.transferFrom(accounts[0],reciever,tokenID).send({from:accounts[0], gas: 1000000});
      console.log(reciever)
      setTransactionStatus(true);
      }
    catch(error)  {
      alert('Transaction failed. \nPlease ensure the token you wish to transfer exists and that you`re wallet contains the token');
    }
  }

  return (
    <div>
      <div className = {styles.componentheaders}> 
        <div className = {styles.componentspacing}>
        <h2>3. Connect To Your Wallet</h2>
          <button onClick={() => configureAndConnectMetamask() }>Connect to Ropsten </button>
        {connectionStatus ? (
        <div> 
          <h3>Account:</h3>
          <h5> {accounts[0]}</h5>
        </div>) : (<h4>NotConnected</h4>)}
        </div>
      </div>
     
      <div className = {styles.componentheaders}> 
        <div className = {styles.componentspacing}>
          <h2>4. Enter a TokenID</h2>
          <form onSubmit= {handleSubmit}>
          <input type="number" value={tokenID} onChange= {handleChange}/>
          <input type="submit" value="Submit" />
          </form>

          <div className={styles.column}>
          {tokenExists ? (
            <div>
              <h3>Track {tokenID}:</h3> <h5>{url} </h5>
              <h4>Owner of Track {tokenID}:</h4> <h5>{owner}</h5>
            </div>
            ) : (
            <h4>{doesntExist}</h4>
            )}
          </div>
        </div>
      </div>

      <div className = {styles.componentheaders}> 
        <div className = {styles.componentspacing}>
          <h2> 5. Mint Your Token</h2>
          <button onClick = {() => Mint()}> Mint Token </button>
        </div>
      </div>

      <div className = {styles.componentheaders}> 
        <div className = {styles.componentspacing}>
          <h2>Transfer Ownership</h2>
          <form onSubmit= {handleRecieverSubmit}> 
            <input type="text" value={reciever} onChange= {handleRecieverChange}/>
            <input type="submit" value="Submit" />
          </form>
          {transactionStatus ? (
         <h4>Transaction Was Succesfull</h4>
          ) : (<p></p>)}
          <button onClick={TransferToken}>Transfer Token</button>
        </div>
      </div>
    </div>
     
  );
}
export default ContractInteraction