import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { apiUrl } from '../constants';
import { styles } from './style';


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
  }, [cookieValue, navigate])

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

      await axios.post(`${apiUrl}api/v1/uploads`, formData, {
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

  return (
    <>
      {cookieValue ? (
        <div style={isMobile ?  styles.containerMobile : styles.container}>
          <div style={isMobile ? styles.uploadBoxMobile : styles.uploadBox}>
            <h4>Click on choose file to upload an image</h4>
            <div style={styles.inputContainer}>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={isMobile ? styles.fileInputMobile : styles.fileInput}
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
