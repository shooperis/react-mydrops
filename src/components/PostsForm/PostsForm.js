import './PostsForm.scss';
import { useState } from 'react';
import TRANSLATION from './../../utils/language';

const PostsForm = () => {
  const [inputData, setInputData] = useState('');
  const [inputCenterClass, setInputCenterClass] = useState('');

  const onInputDataChange = (event) => {
    const value = event.target.value;
    setInputData(value);

    const lines = value.split(/\r\n|\r|\n/).length;
    if (lines >= 3) {
      setInputCenterClass(' triple');
    } else if (lines === 2) {
      setInputCenterClass(' double');
    } else {
      setInputCenterClass('');
    }
  };


  return (
    <form className="new-post-form" noValidate>
      <div className="left">
        <div className="input-icon unknown"></div>
      </div>
      <div className={`center${inputCenterClass}`}>
        <div className="textarea-wrapper">
          <textarea 
            name="input-data" 
            placeholder={TRANSLATION.form.input.placeholder} 
            className="error"
            value={inputData}
            onChange={onInputDataChange}
          ></textarea>
        </div>
      </div>
      <div className="right">
        <button className="button">{TRANSLATION.form.submit.text}</button>
      </div>
    </form>
  )
}

export default PostsForm