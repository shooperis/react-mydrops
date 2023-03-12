import './Post.scss';
import Logo from '../components/Logo/Logo';
import { API_URL, APP_SETTINGS } from './../utils/config';
import { fetchData, prettyDate, postContentRender } from './../utils/functions';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const Post = () => {
  let { key } = useParams();
  const [post, setPost] = useState({});

  async function initPost() {
    const postData = await fetchData(`${API_URL}/posts?key=${key}&_expand=user`);
    setPost(postData[0]);
  }

  useEffect(() => {
    initPost();
  }, [])


  return (
    <div className="container post-page">
      <header className="post-header">
        <Logo />

        <Link className="back-button" to="/">Back to MyDrops</Link>
      </header>

      {postContentRender(post.content, post.type)}

      <div className="content post-detail">
        <div className="title">{post.type}</div>
        <div className="date">Upload date: {prettyDate(post.createdDate)}</div>
        {post.user && (
          <div className="user">Post owner: <span>{post.user.name}</span></div>
        )}
        <div className="share-title">Share this post</div>
        <div className="share-icons">
        {/* <div className="addthis_inline_share_toolbox"></div>
        <script async type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-640e19aff242c3a3"></script> */}
        </div>
        <input className="share-link" value={APP_SETTINGS.address + '/post/' + post.key} readOnly/>
      </div>
    </div>
  )
}

export default Post