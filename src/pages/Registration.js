import './Registration.scss';
import Logo from '../components/Logo/Logo';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { API_URL } from './../utils/config';
import { getTimeStamp } from './../utils/functions';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs-react';
import useHttp from "../hooks/use-http";

const Registration = () => {
  const fetchData = useHttp();
  const navigate = useNavigate();

  const [newUserData, setNewUserData] = useState({
    email: '',
    name: '',
    password: '',
    password_confirm: '',
  });

  const [newUserDataErrors, setNewUserDataErrors] = useState({
    email: '',
    name: '',
    password: '',
    password_confirm: '',
  });

  const onSubmitFormHandler = async event => {
    event.preventDefault();

    if (!formValidation(newUserData)) {
      return;
    }

    const data = { 
      key: uuid(),
      email: newUserData.email,
      name: newUserData.name,
      password: bcrypt.hashSync(newUserData.password, 8),
      createdDate: getTimeStamp()
    };

    const userResponse = await fetchData({
      url: `${API_URL}/users`,
      method: "POST",
      body: data,
      actionOrigin: "UserRegistration"
    });

    if (userResponse.id) {
      setNewUserData({
        email: '',
        name: '',
        password: '',
        password_confirm: '',
      });

      navigate("/login");
    }
  }

  const onChangeFormHandler = event => {
    setNewUserData(prevState => {
      const updatedData = {...prevState};
      updatedData[event.target.name] = event.target.value;
      return updatedData;
    });
  }

  const formValidation = (fields) => {
    let status = true;

    Object.keys(fields).forEach(key => {
      const value = fields[key];
      let error = '';

      if (key === 'password_confirm' && value !== fields.password) {
        error = 'Passwords do NOT match';
        status = false
      }

      if (key === 'email' && (!value.includes('@') || !value.includes('.'))) {
        error = 'This field should have @ and . characters';
        status = false
      }

      if (value.length < 5) {
        error = 'This field can not be less than 5 characters';
        status = false
      }

      setNewUserDataErrors(prevState => {
        const updatedData = {...prevState};
        updatedData[key] = error;
        return updatedData;
      });
    });

    return status;
  }
  

  return (
    <div className="container registration-page">
      <header className="header">
        <Logo />

        <Link className="back-button" to="/login">Back to Login</Link>
      </header>

      <h1 className="title">Register now and drop your data.</h1>

      <form onSubmit={onSubmitFormHandler} noValidate>
        <div className="form-control">
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email" 
            value={newUserData.email}
            onChange={onChangeFormHandler}
            className={newUserDataErrors.email && 'error'} 
          />
          {newUserDataErrors.email && (
            <span className="error">{newUserDataErrors.email}</span>
          )}
        </div>
        <div className="form-control">
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Name"
            value={newUserData.name}
            onChange={onChangeFormHandler}
            className={newUserDataErrors.name && 'error'} 
          />
          {newUserDataErrors.name && (
            <span className="error">{newUserDataErrors.name}</span>
          )}
        </div>
        <div className="form-control">
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password"
            value={newUserData.password}
            onChange={onChangeFormHandler}
            className={newUserDataErrors.password && 'error'} 
          />
          {newUserDataErrors.password && (
            <span className="error">{newUserDataErrors.password}</span>
          )}
        </div>
        <div className="form-control">
          <input 
            type="password"
            id="password_confirm"
            name="password_confirm"
            placeholder="Repeat password"
            value={newUserData.password_confirm}
            onChange={onChangeFormHandler}
            className={newUserDataErrors.password_confirm && 'error'}
          />
          {newUserDataErrors.password_confirm && (
            <span className="error">{newUserDataErrors.password_confirm}</span>
          )}
        </div>
        <button className="btn big-btn third-btn full">Submit</button>
      </form>
    </div>
  )
}

export default Registration