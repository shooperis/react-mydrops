const PostItem = (props) => {
  const {content} = props;
  console.log(content)

  return (
    <div className="post">
      {content}
    </div>
  )
}

export default PostItem