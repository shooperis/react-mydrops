import './Login.scss';
import Logo from '../components/Logo/Logo';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { API_URL } from './../utils/config';
import { fetchData } from './../utils/functions';
import bcrypt from 'bcryptjs-react';

const Login = () => {
  const navigate = useNavigate();
  const loggedUserKey = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (loggedUserKey) {
      navigate("/");
    }
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmitFormHandler = async event => {
    event.preventDefault();

    if (!email && !password) {
      setError('Please enter your email and password');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('This field should have @ and . characters');
      return;
    }

    tryToLogin(email, password);
  };

  async function tryToLogin(email, password) {
    const userData = (await fetchData(`${API_URL}/users?email=${email}`))[0];
    const passwordVerification = bcrypt.compareSync(password, userData.password);

    if (passwordVerification) {
      setError('');
      localStorage.setItem("user", JSON.stringify(userData.key));

      navigate("/");
    } else {
      setError('You enter bad email or password');
      return;
    }
  }

  return (
    <div className="container login-page">
      <header className="header">
        <Logo />

        <Link className="back-button" to="/registration">Registration</Link>
      </header>

      <h1 className="title">Login now and drop your data.</h1>

      <form onSubmit={onSubmitFormHandler} noValidate>
        <div className="form-control">
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email" 
            value={email}
            onChange={event => setEmail(event.target.value)}
            className={error && 'error'} 
          />
        </div>
        <div className="form-control">
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            className={error && 'error'} 
          />
        </div>
    
        {error && (
          <span className="error">{error}</span>
        )}
  
        <button className="btn big-btn third-btn full">Login</button>
      </form>
    </div>
  )
}

export default Login