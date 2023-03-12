import './PostsList.scss';
import PostItem from "./PostItem/PostItem";

const PostsList = ({posts}) => {
  const renderList = () => {
    if (!posts && posts.length < 1) {
      return <div className="no-posts">No posts found.</div>;
    }

    return posts.map(post => <PostItem key={post.id} id={post.key} content={post.content} type={post.type} createdDate={post.createdDate} />);
  }

  return (
    <div className="posts-list">
      {renderList()}
    </div>
  )
}

export default PostsList