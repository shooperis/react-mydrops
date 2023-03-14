import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from '../../utils/config';
import { fetchData } from '../../utils/functions';
import bcrypt from 'bcryptjs-react';

const AdminUsersManipulate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
    key: '',
    createdDate: '',
    admin: false
  });

  const [userDataErrors, setUserDataErrors] = useState({
    email: '',
    name: '',
    password: '',
    key: '',
    createdDate: '',
    admin: ''
  });

  useEffect(() => {
    async function initUser() {
      const usersData = (await fetchData(`${API_URL}/users/${id}`));

      setUserData({
        email: usersData.email ? usersData.email : '',
        name: usersData.name ? usersData.name : '',
        password: '',
        key: usersData.key ? usersData.key : '',
        createdDate: usersData.createdDate ? usersData.createdDate : '',
        admin: usersData.admin ? true : false,
      });
    }
    
    if (id) {
      initUser();
    }
  }, [])

  const onChangeFormHandler = event => {
    setUserData(prevState => {
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

      if (key !== 'admin' && key !== 'password') {
        if (key === 'email' && (!value.includes('@') || !value.includes('.'))) {
          error = 'This field should have @ and . characters';
          status = false
        }
  
        if (value.length < 5) {
          error = 'This field can not be less than 5 characters';
          status = false
        }
      }

      setUserDataErrors(prevState => {
        const updatedData = {...prevState};
        updatedData[key] = error;
        return updatedData;
      });
    });

    return status;
  }

  const onSubmitFormHandler = async event => {
    event.preventDefault();

    let userResponse;

    if (!formValidation(userData)) {
      return;
    }

    const data = {...userData};

    if (!data.password && id) {
      console.log('nera passs');
      delete data.password;
    } else {
      data.password = bcrypt.hashSync(userData.password, 8);
    }

    data.admin = (userData.admin === 'true');

    if (id) {
      userResponse = await fetchData(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
      });
    } else {
      userResponse = await fetchData(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
      });
    }

    if (userResponse.id) {
      navigate("/admin/users");
    }
  }
  
  return (
    <form onSubmit={onSubmitFormHandler} noValidate>
      <div className="fields">
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={userData.name}
            onChange={onChangeFormHandler}
            className={userDataErrors.name && 'error'} 
          />
          {userDataErrors.name && (
            <span className="error">{userDataErrors.name}</span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={userData.email}
            onChange={onChangeFormHandler}
            className={userDataErrors.email && 'error'} 
          />
          {userDataErrors.email && (
            <span className="error">{userDataErrors.email}</span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input 
            type="text" 
            id="password" 
            name="password" 
            value={userData.password}
            onChange={onChangeFormHandler}
            className={userDataErrors.password && 'error'} 
          />
          {userDataErrors.password && (
            <span className="error">{userDataErrors.password}</span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="key">Key</label>
          <input 
            type="text" 
            id="key" 
            name="key" 
            value={userData.key}
            onChange={onChangeFormHandler}
            className={userDataErrors.key && 'error'} 
          />
          {userDataErrors.key && (
            <span className="error">{userDataErrors.key}</span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="createdDate">Registration Date</label>
          <input 
            type="text" 
            id="createdDate" 
            name="createdDate" 
            value={userData.createdDate}
            onChange={onChangeFormHandler}
            className={userDataErrors.createdDate && 'error'} 
          />
          {userDataErrors.createdDate && (
            <span className="error">{userDataErrors.createdDate}</span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="admin">Is admin</label>
          <select 
            id="admin" 
            name="admin" 
            value={userData.admin}
            onChange={onChangeFormHandler}
            className={userDataErrors.admin && 'error'}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          {userDataErrors.admin && (
            <span className="error">{userDataErrors.admin}</span>
          )}
        </div>
      </div>
        
      <button className="btn big-btn third-btn full">Submit</button>
    </form>
  )
}

export default AdminUsersManipulate