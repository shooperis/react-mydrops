import React from "react";

const UserContext = React.createContext({
  user: {},
  posts: [],
  indicator: {},
  httpIndicator: {},
  setHttpIndicator: () => {},
  clearIndicator: () => {},
  setUserData: () => {},
  createPost: () => {},
  deletePost: () => {},
  editPost: () => {}
});

export default UserContext;
