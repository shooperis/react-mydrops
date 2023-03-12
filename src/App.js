import { Route, Routes, Link } from 'react-router-dom';
import { API_URL } from './utils/config';
import { fetchData } from './utils/functions';
import { useState, useEffect } from 'react';
import Posts from './pages/Posts';
import Post from './pages/Post';

function App() {

  const userId = 1;

  const [user, setUser] = useState({});

  async function initUser() {
    const userData = await fetchData(`${API_URL}/users/${userId}`);

    if (userData.id) {
      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData.key));
    }
  }

  useEffect(() => {
    initUser();
  }, [])

  return (
    <div className="wrapper">
      <Routes>
        <Route index element={<Posts user={userId} />} />
        <Route path="/post/:key" element={<Post />} />
        <Route path='*' element={
          <div>
            <h1>404 error. Page not found</h1>
            <Link to='/'>Back to Home page</Link>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;