import { useContext, createRef } from "react";
import UserContext from "../../store/user-context";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "./PostItem/PostItem";
import NewbieTour from "../NewbieTour/NewbieTour";

import "./PostsList.scss";

const PostsList = () => {
  const userCtx = useContext(UserContext);

  const renderList = () => {
    return userCtx.posts.map((post) => {
      const nodeRef = createRef(null);

      return (
        <CSSTransition
          key={post.id}
          nodeRef={nodeRef}
          appear={true}
          timeout={250}
        >
          <PostItem
            id={post.id}
            keyId={post.key}
            content={
              post.type === "youtube" || post.type === "vimeo"
                ? post.additionalData
                : post.content
            }
            type={post.type}
            createdDate={post.createdDate}
            nodeRef={nodeRef}
          />
        </CSSTransition>
      );
    });
  };

  if (userCtx.posts.length < 1) {
    return <NewbieTour />;
  }

  return (
    <TransitionGroup className="posts-list">{renderList()}</TransitionGroup>
  );
};

export default PostsList;
