import './PostsForm.scss';
import { useEffect, useRef, useState } from 'react';
import { API_URL } from './../../utils/config';
import { fetchData, getTimeStamp, getDataType, getDataTypeVideoId } from './../../utils/functions';
import { v4 as uuid } from 'uuid';

const PostsForm = ({onUpdatedPostsHandler, postToEditId, postToEditContent}) => {
  const [inputData, setInputData] = useState('');
  const [inputDataType, setInputDataType] = useState('');
  const [inputCenterClass, setInputCenterClass] = useState('');
  const [inputValidationClass, setInputValidationClass] = useState('');
  const inputReference = useRef(null);

  const onInputDataChange = value => {
    setInputData(value);
    setInputValidationClass('');

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
    let data = {};
    let postResponse;

    if (!inputData) {
      setInputValidationClass('error');
      inputReference.current.focus();
      return;
    }

    if (postToEditId) {
      data = { 
        type: inputDataType,
        content: inputData
      };
    } else {
      data = { 
        key: uuid(),
        type: inputDataType,
        content: inputData,
        createdDate: getTimeStamp(),
        userId: 1,
      };
    }

    if (inputDataType === 'youtube' || inputDataType === 'vimeo') {
      data.additionalData = getDataTypeVideoId(inputData);
    }

    if (inputDataType === 'link' && !inputData.match(/^http:|^https:/)) {
      data.content = 'https://' + inputData;
    }

    if (postToEditId) {
      postResponse = await fetchData(`${API_URL}/posts/${postToEditId}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
      });

      onUpdatedPostsHandler(postResponse, 'edit');
    } else {
      postResponse = await fetchData(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
      });

      onUpdatedPostsHandler(postResponse, 'create');
    }

    if (postResponse) {
      setInputData('');
      setInputDataType('');
      setInputCenterClass('');
    }
  }

  useEffect(() => {
    if (postToEditId && postToEditContent) {
      onInputDataChange(postToEditContent);
    }
  }, [])

  return (
    <form className="post-form" onSubmit={onSubmitFormHandler} noValidate>
      <div className="left">
        <div className={`icon ${inputDataType}`}></div>
      </div>
      <div className={`center${inputCenterClass}`}>
        <div className="textarea-wrapper">
          <textarea 
            name="input-data" 
            placeholder="Enter link, video link or text..."
            className={inputValidationClass}
            value={inputData}
            onChange={event => onInputDataChange(event.target.value)}
            ref={inputReference}
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