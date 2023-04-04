import './Post.scss';
import Logo from '../components/Logo/Logo';
import { API_URL, APP_SETTINGS } from './../utils/config';
import { fetchData, prettyDate, postContentRender } from './../utils/functions';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import PostsForm from '../components/PostsForm/PostsForm';
import PostComments from '../components/PostComments/PostComments';

const Post = () => {
  const { key } = useParams();
  const loggedUserKey = JSON.parse(localStorage.getItem("user"));
  const [post, setPost] = useState({});
  const [postOwner, setPostOwner] = useState({});
  const [editPost, setEditPost] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);

  async function initPost() {
    const postData = (await fetchData(`${API_URL}/posts?key=${key}&_expand=user&_embed=comments`))[0];
    setApiStatus(true)

    setPost({
      id: postData.id,
      key: postData.key,
      type: postData.type,
      content: postData.content,
      additionalData: postData.additionalData,
      createdDate: postData.createdDate,
      comments: postData.comments
    });

    setPostOwner({
      name: postData.user.name,
      key: postData.user.key
    });
  }

  useEffect(() => {
    initPost();
  }, [])

  const editPostHandler = () => {
    setEditPost(prevState => !prevState);
  }

  const updatedPostsHandler = (data) => {
    setPost(prevState => {
      return {...prevState, content: data.content, type: data.type, additionalData: data.additionalData,}
    });

    setEditPost(false);
  }

  return (
    <div className="container post-page">
      <header className="post-header">
        <Logo />

        <Link className="back-button" to="/">Back to MyDrops</Link>
      </header>

      {editPost && (
        <PostsForm 
          postToEditId={post.id}
          postToEditContent={post.content}
          onUpdatedPost={updatedPostsHandler}
        />
      )}

      {postContentRender((post.type === 'youtube' || post.type === 'vimeo') ? post.additionalData : post.content, post.type)}

      <div className="content post-detail">
        <h1 className="title">{post.type}</h1>
        {postOwner.key === loggedUserKey && (
          <div className="edit-button-wrapper">
            <button 
              className={`btn small-btn ${editPost ? 'secondary-btn' : ''}`} 
              onClick={() => {editPostHandler()}}
            >
              {!editPost ? 'Edit this post' : 'Cancel editing'}
            </button>
          </div>
        )}
        <div className="date">Upload date: {prettyDate(post.createdDate)}</div>
        {postOwner.name && (
          <div className="user">Post owner: <span>{postOwner.name}</span>{postOwner.key === loggedUserKey ? ' (you)' : ''}</div>
        )}
        <div className="share-title">Share this post</div>
        <div className="share-icons">
        {/* <div className="addthis_inline_share_toolbox"></div>
        <script async type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-640e19aff242c3a3"></script> */}
        </div>
        <input className="share-link" value={APP_SETTINGS.address + '/post/' + post.key} readOnly/>
      </div>

      {apiStatus && <PostComments commentsData={post.comments} postId={post.id} postOwner={postOwner.key} />}
    </div>
  )
}

export default Post