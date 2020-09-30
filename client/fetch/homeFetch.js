const url = 'http://ecampus-mobile.herokuapp.com';

export function getHomeData(payload) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': payload
    },
  }
  return fetch(`${url}/`, options)
  .then(res => res.json())
  .then(data => {
    return data;
  })
  .catch(err => console.log(err, "< err"))
}