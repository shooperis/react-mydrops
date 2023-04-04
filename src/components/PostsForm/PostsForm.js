import './PostsForm.scss';
import { useEffect, useRef, useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { API_URL } from './../../utils/config';
import { fetchData, getTimeStamp, getDataType, getDataTypeVideoId } from './../../utils/functions';
import UserContext from './../../store/user-context';

const PostsForm = (props) => {
  const userCtx = useContext(UserContext);

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

    if (props.postToEditId) {
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
        userId: userCtx.user.id,
      };
    }

    if (inputDataType === 'youtube' || inputDataType === 'vimeo' || inputDataType === 'soundcloud') {
      data.additionalData = getDataTypeVideoId(inputData);
    }

    if (inputDataType === 'link' && !inputData.match(/^http:|^https:/)) {
      data.content = 'https://' + inputData;
    }

    if (props.postToEditId) {
      postResponse = await fetchData(`${API_URL}/posts/${props.postToEditId}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
      });

      props.onUpdatedPost(postResponse);
      userCtx.editPost(postResponse);
    } else {
      postResponse = await fetchData(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
      });

      userCtx.createPost(postResponse);
    }

    if (postResponse) {
      setInputData('');
      setInputDataType('');
      setInputCenterClass('');
    }
  }

  useEffect(() => {
    if (props.postToEditId && props.postToEditContent) {
      onInputDataChange(props.postToEditContent);
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