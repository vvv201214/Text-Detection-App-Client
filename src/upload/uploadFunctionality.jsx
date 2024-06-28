import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { apiUrl } from '../constants';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadedData, setUploadedData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const cookieValue = Cookies.get('jwtoken');
  const [loading, setLoading] = useState({
    isImageUploaded: false,
    button: false,
    data: false
  })

  useEffect(() => {
    if(window.location.pathname !== '/'){
      navigate('/');
    }
    if (!cookieValue) {
      navigate('/login');
    }
  }, [cookieValue])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading((prev)=>({ ...prev, data: true}));
    axios.get(`${apiUrl}api/v1/data`)
      .then((resp) => {
        setUploadedData(resp.data.data);
        setLoading((prev)=>({ ...prev, data: false}));
      }).catch((err) => {
        console.log(err);
        setLoading((prev)=>({ ...prev, data: false}));
      })
  }, [loading.isImageUploaded])

  const handleFileChange = (event) => {
    setFile(event.target.files);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    try {
      setLoading((prev)=>({ ...prev, button: true}));
      const formData = new FormData();
      formData.append("file", file[0]);

      const { data } = await axios.post(`${apiUrl}api/v1/uploads`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      alert("File upload successfully");
      setFile(null);
      setLoading((prev)=>({ ...prev, isImageUploaded: !loading.isImageUploaded}));
      setLoading((prev)=>({ ...prev, button: false}));
    } catch (error) {
      setLoading((prev)=>({ ...prev, button: false}));
      alert('File upload failed');
    }
  };

  const styles = {
    container: !isMobile ? {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '20px',
    }:
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    uploadBox:  !isMobile ?{
      borderRadius: '10px',
      backgroundColor: '#f0f0f0',
      width: '70%',
      padding: '24px',
      textAlign: 'center',
      border: '2px dashed #aaa',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    }:{
      width: '100%',
      borderRadius: '10px',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      textAlign: 'center',
      border: '2px dashed #aaa',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    inputContainer: {
      // width: '100%',
      marginBottom: '20px',
    },
    fileInput: !isMobile ? {
      padding: '10px', // Default padding for mobile
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    } : {
      padding: '10px 10px 10px 98px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
      width: '100%', // Ensures the input fills its container
  
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    dataLoading: {
      display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '35vh'
    },
    imageList: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    imageCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      height: 'auto',
      maxHeight: '400px',
      objectFit: 'cover',
      borderRadius: '5px',
      marginBottom: '20px',
    },
    imageText: {
      width: '100%',
      textAlign: 'center',
    },
    uploadedImageContainer: {
      width: '70%',
      margin: '20px 0',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '20px'
    },
  };

  return (
    <>
      {cookieValue ? (
        <div style={styles.container}>
          <div style={styles.uploadBox}>
            <h4>Click on choose file to upload an image</h4>
            <div style={styles.inputContainer}>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={styles.fileInput}
              />
            </div>
            <div style={styles.buttonContainer}>
              <button onClick={handleUpload} style={styles.submitButton}>
                {loading.button ? `Loading...` : `Submit`}
              </button>
            </div>
          </div>

          
          <div style={{borderBottom: '.4px solid #AAAAAA', width: '90%', marginBottom: '10px'}} ></div>

          <div style={styles.uploadedImageContainer}>
            <span>Uploaded Image's</span>
          </div>

         {
          loading.data ?
          <div style={styles.dataLoading}>
            <h3>Data Loading...</h3> 
          </div>
          :
          uploadedData.length ?
          <div style={styles.imageList}>
            {uploadedData?.map((elem, index) => (
              <div key={elem?._id} style={styles.imageCard}>
                <img src={elem?.image} alt="Uploaded" style={styles.image} />
                <div style={styles.imageText} dangerouslySetInnerHTML={{ __html: elem?.text }} />
                <div style={styles.imageText}>
                <span><b>Bold Words:</b></span> <span dangerouslySetInnerHTML={{ __html: elem?.boldWords }} />
                </div>
              </div>
            ))}
          </div>
        :
        <></>
         }
          
        </div>
      ) : (
        <></>
      )}
    </>
  );
};


export default FileUploader;
