import { APP_SETTINGS } from './../utils/config';
import { Link } from "react-router-dom";
import './Posts.scss';
import PostsForm from '../components/PostsForm/PostsForm';
import PostsList from '../components/PostsList/PostsList';


const Posts = ({posts}) => {
  
  console.log(posts);


  return (
    <>
      <header className="main-header">
        <Link className="logo" to="/">
          <img src={APP_SETTINGS.logo} alt={APP_SETTINGS.name} />
        </Link>
        
        <PostsForm />
      </header>

      <main>
        <PostsList posts={posts} />
      </main>
    </>
  )
};

export default Posts;