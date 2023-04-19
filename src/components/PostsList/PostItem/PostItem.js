import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { API_URL } from "./../../../utils/config";
import { prettyDate, postContentRender } from "./../../../utils/functions";
import UserContext from "./../../../store/user-context";
import useHttp from "../../../hooks/use-http";

const PostItem = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useHttp();

  const id = props.id;
  const type = props.type;
  let postTypeClass = "";

  if (type === "text") {
    postTypeClass = "text";
  } else if (type === "link") {
    postTypeClass = "link";
  } else if (type === "image") {
    postTypeClass = "image";
  } else if (type === "youtube" || type === "vimeo" || type === "soundcloud") {
    postTypeClass = "video";
  } else {
    postTypeClass = "unknown";
  }

  const onDeletePost = async () => {
    await fetchData({
      url: `${API_URL}/posts/${id}`,
      method: "DELETE",
      actionOrigin: "DeletingPost",
    });
    userCtx.deletePost(id);
  };

  return (
    <div className="post-item" ref={props.nodeRef}>
      <div className="detail">
        <div className="type">{type}</div>
        <div className="date">{prettyDate(props.createdDate)}</div>
      </div>
      <div className="control-wrapper">
        <div className={"control" + (postTypeClass ? ` ${postTypeClass}` : "")}>
          <NavLink
            className="open-post"
            to={`post/${props.keyId}`}
            title="Open this post"
          >
            Open this post
          </NavLink>
          <button
            className="delete-post"
            title="Delete this post"
            onClick={onDeletePost}
          >
            Delete this post
          </button>
          <i className="icon"></i>
        </div>
      </div>
      {postContentRender(props.content, type)}
    </div>
  );
};

export default PostItem;
