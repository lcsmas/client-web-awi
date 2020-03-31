const host = process.env.REACT_APP_API_HOST ;
const port = process.env.REACT_APP_API_PORT;
const constructURL = URI => `http://${host}:${port}${URI}`;
const handleFailure = res => {
    if (!res.ok) {
        throw Error(`${res.status}: ${res.statusText}`);
    }
    return res;
}

const authenticate = (pseudo, mdp) => {
    const URL = constructURL('/users/authenticate')
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pseudo: `${pseudo}`, mdp: `${mdp}` })
    })
        .then(handleFailure).then(res => res.json());
}

const fetchPropositions = () => {
    const fetchURL = constructURL('/propositions');
    return fetch(fetchURL).then(handleFailure).then(res => res.json())
}
const updatePropositionAnswers = data => {
    const url = constructURL(`/propositions/${data.id}/answers`);
    return fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(handleFailure).then(res => res.json())
}
const postProposition = data => {
    const url = constructURL(`/propositions`);
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(handleFailure).then(res => res.json())
}

const fetchUsers = () => {
    const fetchURL = constructURL('/users');
    return fetch(fetchURL).then(handleFailure).then(res => res.json())
}

/* HIGHER-ORDER */
const fetchSlice = slice => {
    const fetchURL = constructURL(`/${slice}`)
    return fetch(fetchURL).then(handleFailure).then(res => res.json())
}
const postSlice = (slice, data) => {
    const url = constructURL(`/${slice}`)
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(handleFailure).then(res => res.json())
}

const updateSliceOfSliceById = (parentSlice, childSlice, data) => {
    const url = constructURL(`/${parentSlice}/${data.id}/${childSlice}`);
    return fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(handleFailure).then(res => res.json())
}

const API = {
    fetchPropositions,
    updatePropositionAnswers,
    postProposition,
    fetchUsers,
    fetchSlice,
    postSlice,
    updateSliceOfSliceById,
    authenticate
}

export default API