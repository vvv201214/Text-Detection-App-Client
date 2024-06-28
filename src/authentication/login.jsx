import React, { useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../constants';

export default function Login(){
    const navigate = useNavigate();
    const [credential, setCredential] = useState({
        user_id: '',
        pin: ''
    });

    async function login(){
        try{
            const {user_id, pin} = credential;

            const response = await axios.post(`${apiUrl}api/v1/user/login?user_id=${user_id}&pin=${pin}`, {}, {
              withCredentials: true // Include credentials (cookies)
          });
    
            if(response.status === 200){
                navigate('/');
            }
        }catch(err){
            window.alert(err.response.data.message);
        }
    }
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">User Id</label>
          <input type="text" id="username" name="username" required
            onChange={(e) => {
              setCredential((prev) => ({
                ...prev,
                user_id: e.target.value
              }));
            }}            
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Pin</label>
          <input type="password" id="password" name="password" required
          onChange={(e) => {
            setCredential((prev) => ({
              ...prev,
              pin: e.target.value
            }));
          }}          
          />
        </div>
        <button className="login-button" onClick={login}>Login</button>
      </div>
    </div>
  );
}