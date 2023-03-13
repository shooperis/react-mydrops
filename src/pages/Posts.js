import './Posts.scss';
import { API_URL } from './../utils/config';
import { fetchData } from './../utils/functions';
import { useState, useEffect } from 'react';
import PostsForm from '../components/PostsForm/PostsForm';
import PostsList from '../components/PostsList/PostsList';
import Logo from '../components/Logo/Logo';

const Posts = ({user}) => {
  const [posts, setPosts] = useState([]);

  async function initPosts() {
    const postsData = await fetchData(`${API_URL}/posts?userId=${user}&_sort=id&_order=desc`);
    setPosts(postsData);
  }

  useEffect(() => {
    initPosts();
  }, [user])

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
        
        <PostsForm user={user} onUpdatedPostsHandler={onUpdatedPostsHandler} />
      </header>

      <main>
        <PostsList posts={posts} onUpdatedPostsHandler={onUpdatedPostsHandler} />
      </main>
    </>
  )
};

export default Posts;