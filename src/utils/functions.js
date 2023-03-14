export async function fetchData(url, params) {
  const res = await fetch(url, params);
  const data = await res.json();
  return data;
}

export function getTimeStamp() {
  const d = new Date();

  let minutes = d.getMinutes();
  let hours = d.getHours();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let year = d.getFullYear();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return `${hours}:${minutes} ${year}-${month}-${day}`;
}

export function prettyDate(receivedDate) {
  let date1 = new Date(receivedDate);  
  let date2 = new Date(getTimeStamp());
  let timeDifference = date2.getTime() - date1.getTime();  
  let hoursDifference = timeDifference / (1000 * 60 * 60);

  if (hoursDifference > 36) {
    return receivedDate;
  }

  if (hoursDifference >= 24) {
    return 'yesterday';
  }

  if (hoursDifference >= 1) {
    return `${Math.round(hoursDifference)} hours ago`;
  }

  return `${Math.round(hoursDifference * 60)} minutes ago`;
}

export function getDataType(value) {
  const valueLowerCase = value.toLowerCase();

  if (valueLowerCase.match(/^http:|^https:|^www./)) {
    if (valueLowerCase.match(/youtube.com|youtu.be/)) {
      return 'youtube';
    }

    if (valueLowerCase.match(/vimeo.com/)) {
      return 'vimeo';
    }

    if (valueLowerCase.match(/soundcloud.com/)) {
      return 'soundcloud';
    }

    if (valueLowerCase.match(/.jpg|.jpeg|.png|.gif|.bmp|.svg/)) {
      return 'image';
    }

    return 'link';
  }

  if (value) {
    return 'text';
  }
  
  return 'unknown';
}

export function getDataTypeVideoId(url) {
  const urlLowerCase = url.toLowerCase();
  if (urlLowerCase.match(/youtube.com|youtu.be/)) {
    if (url.match(/v=/)) {
      return url.split('v=')[1].split('&')[0];
    }

    if (url.match(/embed/)) {
      return url.split('embed/')[1].split('?')[0];
    }

    if (url.match(/.be/)) {
      return url.split('.be/')[1].split('?')[0];
    }
  }

  if (urlLowerCase.match(/vimeo.com/)) {
    if (url.match(/video/)) {
      return url.split('video/')[1].split('?')[0];
    }

    if (url.match(/.com/)) {
      return url.split('.com/')[1].split('?')[0];
    }
  }

  if (urlLowerCase.match(/soundcloud.com/)) {
    return url.split('?')[0];
  }
}

export function postContentRender(content, type) {
  if (type === 'link') {
    return <div className="content link"><a href={content} target="_blank" rel="noreferrer">{content}</a></div>;
  } else if (type === 'image') {
    return <img className="content image" src={content} alt="ph0to" />;
  } else if (type === 'youtube') {
    return <iframe className="content video" title={type} src={`https://www.youtube.com/embed/${content}?wmode=transparent&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;autohide=2&amp;enablejsapi=1&amp;playerapiid=yt_player&amp;autohide=1`}></iframe>;
  } else if (type === 'vimeo') {
    return <iframe className="content video" title={type} src={`https://player.vimeo.com/video/${content}?title=1&amp;byline=0&amp;portrait=0&amp;wmode=transparent`} wmode="transparent"></iframe>;
  } else if (type === 'soundcloud') {
    return <iframe className="content video" title={type} src={`https://w.soundcloud.com/player/?url=${content}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}></iframe>;
  } else {
    return <div className="content text">{content}</div>;
  }
}