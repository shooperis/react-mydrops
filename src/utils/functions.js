export async function fetchData(url, params) {
  const res = await fetch(url, params);
  const data = await res.json();
  return data;
}
