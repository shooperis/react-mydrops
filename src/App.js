import { Route, Routes, useNavigate } from 'react-router-dom';
import { API_URL } from './utils/config';
import { fetchData } from './utils/functions';
import { useState, useEffect } from 'react';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';

function App() {
  const navigate = useNavigate();
  const loggedUserKey = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({});

  async function initUser(key) {
    const userData = (await fetchData(`${API_URL}/users?key=${key}&_embed=posts`))[0];

    if (userData.id) {
      setUser(userData);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!loggedUserKey) {
      navigate("/login");
    }

    initUser(loggedUserKey);
  }, [])

  return (
    <div className="wrapper">
      <Routes>
        <Route index element={<Posts user={user.id} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:key" element={<Post />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;