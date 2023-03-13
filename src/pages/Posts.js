import './Posts.scss';
import { API_URL } from './../utils/config';
import { fetchData } from './../utils/functions';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsForm from '../components/PostsForm/PostsForm';
import PostsList from '../components/PostsList/PostsList';
import Logo from '../components/Logo/Logo';

const Posts = ({user}) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);

  async function initPosts() {
    const postsData = await fetchData(`${API_URL}/posts?userId=${user}&_sort=id&_order=desc`);
    setPosts(postsData);
    setApiStatus(true);
  }

  useEffect(() => {
    if (user) {
      initPosts();
    } else {
      navigate("/login");
    }
  }, [])

  const onUpdatedPostsHandler = (data, method) => {
    if (method === 'delete') {
      setPosts(prevState => prevState.filter(post => post.id !== data));
    }

    if (method === 'create') {
      setPosts(prevState => [data, ...prevState]);
    }
  }
  
  return (
    <>
      <header className="list-header">
        <Logo />
        
        {user && <PostsForm user={user} onUpdatedPostsHandler={onUpdatedPostsHandler} />}
      </header>

      <main>
        {(user && apiStatus) && <PostsList posts={posts} onUpdatedPostsHandler={onUpdatedPostsHandler} />}
      </main>
    </>
  )
};

export default Posts;