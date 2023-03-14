import './PostsList.scss';
import PostItem from "./PostItem/PostItem";
import NewbieTour from '../NewbieTour/NewbieTour';

const PostsList = ({posts, onUpdatedPostsHandler}) => {
  const renderList = () => {
    return posts.map((post, index) => 
      <PostItem 
        key={index} 
        id={post.id}
        keyId={post.key} 
        content={post.type === 'youtube' || post.type === 'vimeo' ? post.additionalData : post.content} 
        type={post.type} 
        createdDate={post.createdDate}
        onUpdatedPostsHandler={onUpdatedPostsHandler}
      />
    );
  }

  if (posts.length < 1) {
    return <NewbieTour />;
  }

  return (
    <div className="posts-list">
      {renderList()}
    </div>
  )
}

export default PostsList