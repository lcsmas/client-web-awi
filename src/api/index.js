let host = ""
let port = "";

if (process.env.NODE_ENV !== 'production') {
  host = process.env.REACT_APP_API_HOST_PROD
} else {
  host = process.env.REACT_APP_API_HOST_PROD;
}

const constructURL = URI => {
  if(port) {
    return `http://${host}:${port}${URI}`;
  } 
  return `http://${host}${URI}`;
  
};
const handleFailure = res => {
  if (!res.ok) {
    return Promise.reject(Error(`${res.status}: ${res.statusText}`));
  } else {
    return res;
  }
};
const authenticate = (pseudo, mdp) => {
  const URL = constructURL("/users/authenticate");
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pseudo: `${pseudo}`, password: `${mdp}` })
  })
    .then(res => handleFailure(res))
    .then(res => res.json());
};
const register = (pseudo, mdp, mail) => {
  const URL = constructURL("/users");
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pseudo: `${pseudo}`, password: `${mdp}`, mail: `${mail}`})
  })
    .then(res => handleFailure(res))
    .then(res => res.json());
};


/* HIGHER-ORDER */
const fetchSlice = slice => {
  const fetchURL = constructURL(`/${slice}`);
  return fetch(fetchURL)
    .then(res => handleFailure(res))
    .then(res => res.json());
};
const postSlice = (slice, data) => {
  const url = constructURL(`/${slice}`);
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => handleFailure(res))
    .then(res => res.json());
};

const updateSliceOfSliceById = (parentSlice, childSlice, data) => {
  const url = constructURL(`/${parentSlice}/${data.id}/${childSlice}`);
  return fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => handleFailure(res))
    //.then(res => res.json()); 
    // res.json() déclenche une exception si la réponse n'a pas de body, ce qui déclenche le catch du thunk ("method"Failure) 
    // c'est pour cela que le catch renvoie res parce qu'un PUT ne renvoie pas forcément un body
};

const API = {
  fetchSlice,
  postSlice,
  updateSliceOfSliceById,
  authenticate,
  register
};

export default API;
