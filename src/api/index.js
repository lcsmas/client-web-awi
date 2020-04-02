let host = "";
let port = "";

if (process.env.NODE_ENV !== "production") {
  host = process.env.REACT_APP_API_HOST_PROD;
} else {
  host = process.env.REACT_APP_API_HOST_PROD;
}

const constructURL = URI => {
  if (port) {
    return `http://${host}:${port}${URI}`;
  }
  return `http://${host}${URI}`;
};
const handleFailure = res => {
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  } else {
    return res;
  }
};
const authenticate = (pseudo, mdp, resolve, reject) => {
  const URL = constructURL("/users/authenticate");
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pseudo: `${pseudo}`, password: `${mdp}` })
  })
  .then(handleFailure)
  .then(res => res.json());
};
const register = (pseudo, mdp, mail, resolve, reject) => {
  const URL = constructURL("/users");
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pseudo: `${pseudo}`,
      password: `${mdp}`,
      mail: `${mail}`
    })
  })
  .then(handleFailure)
  .then(res => res.json());
};

/* HIGHER-ORDER */
const fetchSlice = (slice) => {
  const fetchURL = constructURL(`/${slice}`);
  return fetch(fetchURL)
    .then(handleFailure)
    .then(res => res.json());
};
const fetchReported = (slice, token) => {
  const fetchURL = constructURL(`/admin/${slice}/reported`);
  const authorizationValue = token ? `Bearer ${token}` : "";
  return fetch(fetchURL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorizationValue
    },
  })
    .then(handleFailure)
    .then(res => res.json());
}
const postSlice = (slice, data, token = "", reject) => {
  const url = constructURL(`/${slice}`);
  const authorizationValue = token ? `Bearer ${token}` : "";
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorizationValue
    },
    body: JSON.stringify(data)
  })
    .then(handleFailure)
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
  }).then(res => handleFailure(res));
  //.then(res => res.json());
  // res.json() déclenche une exception si la réponse n'a pas de body, ce qui déclenche le catch du thunk ("method"Failure)
  // c'est pour cela que le catch renvoie res parce qu'un PUT ne renvoie pas forcément un body
};

const likeSlice = (slice, token = "", id) => {
  const url = constructURL(`/${slice}/like`);
  const authorizationValue = token ? `Bearer ${token}` : "";
  return fetch(url, {
    method: 'PUT',
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorizationValue
    },
    body: JSON.stringify({id})
  }).then(handleFailure).then(res=>res.json())
}

const dislikeSlice = (slice, token = "", id) => {
  const url = constructURL(`/${slice}/dislike`);
  const authorizationValue = token ? `Bearer ${token}` : "";
  return fetch(url, {
    method: 'PUT',
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorizationValue
    },
    body: JSON.stringify({id})
  }).then(handleFailure).then(res=>res.json())
}

const API = {
  fetchSlice,
  postSlice,
  updateSliceOfSliceById,
  authenticate,
  register,
  likeSlice,
  dislikeSlice,
  fetchReported
};

export default API;
