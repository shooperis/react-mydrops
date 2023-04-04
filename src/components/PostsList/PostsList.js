import { useContext } from "react";
import UserContext from "../../store/user-context";
import PostItem from "./PostItem/PostItem";
import NewbieTour from "../NewbieTour/NewbieTour";

import "./PostsList.scss";

const PostsList = () => {
  const userCtx = useContext(UserContext);

  const renderList = () => {
    return userCtx.posts.map((post) => (
      <PostItem
        key={post.id}
        id={post.id}
        keyId={post.key}
        content={post.type === "youtube" || post.type === "vimeo" ? post.additionalData : post.content}
        type={post.type}
        createdDate={post.createdDate}
      />
    ));
  };

  if (userCtx.posts.length < 1) {
    return <NewbieTour />;
  }

  return <div className="posts-list">{renderList()}</div>;
};

export default PostsList;
