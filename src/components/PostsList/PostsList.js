import PostItem from "./PostItem/PostItem";

const PostsList = ({posts}) => {
  const renderList = () => {
    if (!posts && posts.length < 1) {
      return <div className="no-posts">No posts found</div>;
    }

    return posts.map(post => <PostItem key={post.id} content={post.content} createdDate={post.createdDate} />);
  }

  return (
    <div className="posts-list">
      {renderList()}
    </div>
  )
}

export default PostsList