const url = 'https://ecampus-mobile.herokuapp.com';

export function loginPost(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: payload.email, password: payload.password})
  }
  return fetch(`${url}/users/login`, options)
  .then(res => res.json())
  .then(data => {
    return data;
  })
  .catch(err => console.log(err, "< err"))
}

export function registerPost(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password
    })
  }
  return fetch(`${url}/users/register`, options)
  .then(res => res.json())
  .then(data => {
    console.log(data, "<<< data from server")
    return data;
  })
  .catch(err => console.log(err, "<<< err"));
}