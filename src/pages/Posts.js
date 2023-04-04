import './Posts.scss';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../store/user-context';
import PostsForm from '../components/PostsForm/PostsForm';
import PostsList from '../components/PostsList/PostsList';
import Logo from '../components/Logo/Logo';

const Posts = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  if (!userCtx.user.key) {
    navigate("/login");
  }
  
  return (
    <>
      <header className="list-header">
        <Logo />
        
        <PostsForm />
      </header>

      <main>
        <PostsList />
      </main>
    </>
  )
};

export default Posts;