import TRANSLATION from './../../utils/language';

const PostsForm = () => {
  return (
    <form className="new-post-form" noValidate>
      <div className="left_s">
        <div className="input_icon unknown"></div>
      </div>
      <div className="center_s">
        <textarea name="post_data" id="post_data" placeholder={TRANSLATION.form.input.placeholder} className="error"></textarea>
      </div>
      <div className="right_s">
        <input className="button" type="submit" value={TRANSLATION.form.submit.text} />
        <div className="right_bg"></div>
      </div>
    </form>
  )
}

export default PostsForm