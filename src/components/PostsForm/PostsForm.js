import './PostsForm.scss';
import { useState } from 'react';
import { API_URL } from './../../utils/config';
import { fetchData, getTimeStamp, getDataType, getDataTypeVideoId } from './../../utils/functions';
import { v4 as uuid } from 'uuid';

const PostsForm = ({onUpdatedPostsHandler}) => {
  const [inputData, setInputData] = useState('');
  const [inputDataType, setInputDataType] = useState('');
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

    setInputDataType(getDataType(value));
  };

  const onSubmitFormHandler = async event => {
    event.preventDefault();

    const data = { 
      key: uuid(),
      type: inputDataType,
      content: inputData,
      createdDate: getTimeStamp(),
      userId: 1,
    };

    if (inputDataType === 'youtube' || inputDataType === 'vimeo') {
      data.additionalData = getDataTypeVideoId(inputData);
    }

    if (inputDataType === 'link' && !inputData.match(/^http:|^https:/)) {
      data.content = 'https://' + inputData;
    }

    const newPost = await fetchData(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data)
    });

    if (newPost) {
      onUpdatedPostsHandler(newPost, 'create');

      setInputData('');
      setInputDataType('');
      setInputCenterClass('');
    }
  }


  return (
    <form className="new-post-form" onSubmit={onSubmitFormHandler} noValidate>
      <div className="left">
        <div className={`icon ${inputDataType}`}></div>
      </div>
      <div className={`center${inputCenterClass}`}>
        <div className="textarea-wrapper">
          <textarea 
            name="input-data" 
            placeholder="Enter link, video link or text..."
            className="error"
            value={inputData}
            onChange={onInputDataChange}
          ></textarea>
        </div>
      </div>
      <div className="right">
        <button className="button">Drop</button>
      </div>
    </form>
  )
}

export default PostsForm