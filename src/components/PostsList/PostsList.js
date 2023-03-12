import './PostsList.scss';
import PostItem from "./PostItem/PostItem";

const PostsList = ({posts, onUpdatedPostsHandler}) => {
  const renderList = () => {
    if (!posts || posts.length < 1) {
      return <div className="no-posts">No posts found.</div>;
    }

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

  return (
    <div className="posts-list">
      {renderList()}
    </div>
  )
}

export default PostsList