// import { Route, Routes, Link } from 'react-router-dom';
import { API_URL } from './utils/config';
import { fetchData } from './utils/functions';
import { useState, useEffect } from 'react';
import Posts from './pages/Posts';

function App() {

  const userId = 1;

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  async function initUser() {
    const userData = await fetchData(`${API_URL}/users/${userId}?_embed=posts`);

    if (userData.id) {
      setUser(userData);
      setPosts(userData.posts);
    }
  }

  useEffect(() => {
    initUser();
  },[])


  return (
    <div className="wrapper">
      <Posts posts={posts} />
    </div>
  );
}

export default App;