import React, {useState} from 'react'
import styles from './CSS Modules/FileInputButtons-style.module.css';

///////Global Variables//////
const PROJECT_ID = '1z2zKzXJSnmfHxjLo8APH4Ljxhl';
const PROJECT_SECRET = '796b649fad2aac594c4767a8abcd7be4';
var Cid = '';


function UploadFile() 
{
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isSubmitted, setSubmission] = useState(false);

   const changeHandler = (event) => {
	 setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
     
  async function handleSubmission() {
	const formData = new FormData();
	await formData.append('Submitted File', selectedFile);
  console.log(formData);
  
  const xhr =  new XMLHttpRequest();
  await xhr.open(
    "POST",
    "https://ipfs.infura.io:5001/api/v0/add"
  );

  await xhr.setRequestHeader(
    "Authorization", 
    "Basic" + btoa(PROJECT_ID + ":" + PROJECT_SECRET)
  );

  await xhr.send(formData); 
  
   xhr.onload = () => {
    Cid = JSON.parse(`${xhr.response}`);
    setSelectedFile(Cid.Hash);
    if (Cid.Hash =! null)
      {
        setSubmission(true);
      }
    }  
  }

    

  return (
  <div className = {styles.componentheaders}>
    <div className = {styles.componentspacing}>
      <h2>1. Upload An Audio Track:</h2>
      <input type="file" accept=".mp3,.wav,.aiff,.FLAC" name="file" onChange={changeHandler} className={styles.customfileinput}/>
      {isFilePicked ? (
        <div>
				  <h5 className={styles.FileinputText}> File Name: {selectedFile.name} </h5>
			  </div>
      ) : (
      <p className={styles.uploadFile}></p>)}<br/>
        <div>
          <button className={styles.SubmitButton} onClick={handleSubmission} > Submit File</button> 
          {isSubmitted ? 
            (<div className={styles.URLallignment}>
              <h5 className={styles.URLallignment}>Address: {'https://ipfs.io/ipfs/' + selectedFile} </h5>
              <h5 className={styles.FileinputText}>SUCCESFULLY UPLOADED</h5>
            </div> 
            ) : (
            <p className={styles.uploadFile}></p>
            ) 
          }
        </div>
    </div>
  </div>
);
}
export default UploadFile