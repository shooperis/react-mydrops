import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API_URL } from "./../../../utils/config";
import { fetchData, prettyDate, postContentRender } from "./../../../utils/functions";
import UserContext from "./../../../store/user-context";

const PostItem = (props) => {
  const [animationClass, setAnimationClass] = useState("");
  const userCtx = useContext(UserContext);

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
    if (animationClass !== "hidden") {
      setAnimationClass("hidden");

      setTimeout(async () => {
        await fetchData(`${API_URL}/posts/${id}`, { method: "DELETE" });

        userCtx.deletePost(id);
      }, 250);
    }
  };

  useEffect(() => {
    if (userCtx.indicator.status === "POST_CREATED") {
      if (id === userCtx.indicator.data) {
        setAnimationClass("hidden");

        const timer = setTimeout(() => {
          setAnimationClass("");
          userCtx.clearIndicator();
        }, 10);

        return () => {
          clearTimeout(timer);
        };
      }
    }
  }, []);

  return (
    <div className={`post-item ${animationClass}`}>
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
