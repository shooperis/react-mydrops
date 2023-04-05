import React from "react";

const UserContext = React.createContext({
  user: {},
  posts: [],
  indicator: {},
  clearIndicator: () => {},
  createPost: () => {},
  deletePost: () => {},
  editPost: () => {}
});

export default UserContext;
