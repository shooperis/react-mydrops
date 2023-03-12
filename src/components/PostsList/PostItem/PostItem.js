const PostItem = (props) => {
  const {id, content, type, createdDate} = props;

  let postTypeClass = '';

  if (type === 'text') {
    postTypeClass = 'text';
  } else if (type === 'link') {
    postTypeClass = 'link';
  } else if (type === 'youtube' || type === 'vimeo') {
    postTypeClass = 'video';
  }


  console.log(content)

  return (
    <div className="post-item">
      <div className="detail">
        <div className="type">
          {type}
        </div>
        <div className="date">
          {createdDate}
        </div>
      </div>
      <div className="control-wrapper">
        <div className={'control ' + postTypeClass}>
          <a className="open-post" href="google.lt" title="Open this post">Open this post</a>
          <button className="delete-post" title="Delete this post">Delete this post</button>
          <i className="icon"></i>
        </div>
      </div>
      <div className="content">
        {content}
      </div>
    </div>
  )
}

export default PostItem