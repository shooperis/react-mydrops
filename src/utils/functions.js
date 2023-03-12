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