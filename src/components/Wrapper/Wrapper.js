function Wrapper({ className, children }) {
  let classes = `wrapper${className ? ` ${className}` : ''}`;

  return (
    <div className={classes}>{children}</div>
  )
}

export default Wrapper;