import React, {useState} from 'react'
import styles from './CSS Modules/FileInputButtons-style.module.css';
import ContractInteraction from './ContractInteraction';

const PROJECT_ID = '1z2zKzXJSnmfHxjLo8APH4Ljxhl';
const PROJECT_SECRET = '796b649fad2aac594c4767a8abcd7be4';

function UploadMetadata() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFileSubmited, setFileIsSubmitted] = useState(false);
  const [showCID, setShowCID] = useState(null);
      

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
     
  const handleSubmission = () => {
		const formData = new FormData();
		formData.append('Submitted File', selectedFile);
    
    const xhr = new XMLHttpRequest();
    
    xhr.open(
      "POST",
      "https://ipfs.infura.io:5001/api/v0/add"
    );
    
    xhr.setRequestHeader(
      "Authorization", 
      "Basic " + btoa(PROJECT_ID + ":" + PROJECT_SECRET)
    );
    
    xhr.send(formData);
    
    xhr.onload = () => {
    var Cid = JSON.parse(`${xhr.response}`);
    setShowCID(Cid.Hash);
    if (Cid.Hash != null)
      {
      setFileIsSubmitted(true);
      }
    }  
  }

  return (
    <React.Fragment>
      <div>
        <div className = {styles.componentheaders}>
          <div className = {styles.componentspacing}>
          <h2 >2. Upload Your Metadata JSON file: </h2>
          <input type="file" accept=".json" name="file" onChange= {changeHandler} />
          {isFilePicked ? (
           <div>
					   <h5>Filename: {selectedFile.name}</h5>
            </div>
            ) : (<p></p>)}
            <br/>
            <div>
              <button onClick= {() => handleSubmission() }>Submit</button> 
              {isFileSubmited ? (
                <div>
                 <h5>SUCCESFULLY UPLOADED</h5>
                  <h5>You can view File at:</h5>
					        <h5> {'https://ipfs.io/ipfs/' + showCID}</h5>
                </div> 
                ) : (
              <p className={styles.uploadFile}></p>
                )
              }
            </div>
          </div>
        </div>
      <ContractInteraction showCIDs = {showCID} /> 
    </div>
  </React.Fragment> 
  );
}
export default UploadMetadata 