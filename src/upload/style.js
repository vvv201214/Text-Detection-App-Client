
export const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '20px',
    },
    containerMobile: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    uploadBox: {
      borderRadius: '10px',
      backgroundColor: '#f0f0f0',
      width: '70%',
      padding: '24px',
      textAlign: 'center',
      border: '2px dashed #aaa',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    uploadBoxMobile: {
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
    fileInput: {
      padding: '10px', // Default padding for mobile
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box',
    },
    fileInputMobile: {
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