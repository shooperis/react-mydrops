import { useContext, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { API_URL } from "./../../../utils/config";
import { prettyDate, postContentRender } from "./../../../utils/functions";
import UserContext from "./../../../store/user-context";
import useHttp from "../../../hooks/use-http";
import { Transition } from "react-transition-group";

const animationDuration = 250;

const animationDefaultStyle = {
  transition: `opacity ${animationDuration}ms ease-in-out, max-height ${animationDuration}ms ease-in-out, margin-bottom ${animationDuration}ms ease-in-out`,
  opacity: 0,
  maxHeight: "0px",
  minHeight: "unset",
  marginBottom: "0px",
};

const animationTransitionStyles = {
  entering: { borderWidth: '0px' },
  entered: {
    opacity: 1,
    maxHeight: "450px",
    minHeight: "55px",
    marginBottom: "40px",
    borderWidth: '1px'
  },
  // exiting:  { opacity: 0 },
  // exited: {
  //   opacity: 0,
  //   maxHeight: "0px",
  //   minHeight: "unset",
  //   marginBottom: "0px",
  // },
};

const PostItem = (props) => {
  const [inProp, setInProp] = useState(true);
  const nodeRef = useRef(null);
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

  const onHidingPost = () => {
    setInProp(false);
  };

  const onDeletePost = async () => {
    await fetchData({
      url: `${API_URL}/posts/${id}`,
      method: "DELETE",
      actionOrigin: "DeletingPost",
    });

    userCtx.deletePost(id);
  };

  return (
    <Transition
      nodeRef={nodeRef}
      in={inProp}
      appear={true}
      timeout={animationDuration}
      onExited={onDeletePost}
    >
      {(state) => (
        <div
          className="post-item"
          ref={nodeRef}
          style={{
            ...animationDefaultStyle,
            ...animationTransitionStyles[state],
          }}
        >
          <div className="detail">
            <div className="type">{type}</div>
            <div className="date">{prettyDate(props.createdDate)}</div>
          </div>
          <div className="control-wrapper">
            <div
              className={"control" + (postTypeClass ? ` ${postTypeClass}` : "")}
            >
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
                onClick={onHidingPost}
              >
                Delete this post
              </button>
              <i className="icon"></i>
            </div>
          </div>
          {postContentRender(props.content, type)}
        </div>
      )}
    </Transition>
  );
};

export default PostItem;
