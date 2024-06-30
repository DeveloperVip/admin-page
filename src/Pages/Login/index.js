
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';
import loginImage from './1.svg';
import axios from 'axios';
//import jwt_decode from 'jwt-decode';



function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/user/login-admin', {
        userName: userName,
        password: password,
      });

      // Assuming the API returns a JWT token in the response
      const { token } = response.data;

      // Save the token in local storage or a cookie for future use
      localStorage.setItem('token', token);
      

      // Redirect to the dashboard page
      navigate('/dashboard');
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        // Incorrect userName or password
        alert('Vérifiez votre adresse userName et votre mot de passe.');
      } else {
        // Other error
        alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
      }
    }
  };



  return (
    <div className="login-page">
      <div className="image-container">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="login-form-container">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Adresse userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Gửi
          </button>

        </form>
        <div className="signup-link">
          Vous n'avez pas de compte ?{' '}
          <Link to="/Register">Inscrivez-vous ici</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;