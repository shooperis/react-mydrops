import { NavLink } from 'react-router-dom';
import { API_URL } from './../../../utils/config';
import { fetchData, prettyDate, postContentRender } from './../../../utils/functions';

const PostItem = (props) => {
  const {id, keyId, content, type, createdDate, onUpdatedPostsHandler} = props;
  let postTypeClass = '';

  if (type === 'text') {
    postTypeClass = 'text';
  } else if (type === 'link') {
    postTypeClass = 'link';
  } else if (type === 'image') {
    postTypeClass = 'image';
  } else if (type === 'youtube' || type === 'vimeo') {
    postTypeClass = 'video';
  } else {
    postTypeClass = 'unknown';
  }

  const onDeletePost = async id => {
    await fetchData(`${API_URL}/posts/${id}`, {
      method: 'DELETE'
    });

    onUpdatedPostsHandler(id, 'delete');
  }
  
  return (
    <div className="post-item">
      <div className="detail">
        <div className="type">
          {type}
        </div>
        <div className="date">
          {prettyDate(createdDate)}
        </div>
      </div>
      <div className="control-wrapper">
        <div className={'control' + (postTypeClass ? ` ${postTypeClass}` : '')}>
          <NavLink className="open-post" to={`post/${keyId}`} title="Open this post">Open this post</NavLink>
          <button className="delete-post" title="Delete this post" onClick={() => onDeletePost(id)}>Delete this post</button>
          <i className="icon"></i>
        </div>
      </div>
      {postContentRender(content, type)}
    </div>
  )
}

export default PostItem