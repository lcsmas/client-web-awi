/* ANSWERS */
export const getAnswersState = store => store.answers;
export const getAnswersList = store =>
    getAnswersState(store) ? getAnswersState(store).allIds : [];
export const getAnswerById = (store, id) =>
    getAnswersState(store) ? { ...getAnswersState(store).byIds[id], id } : {};
export const getAnswers = store =>
    getAnswersList(store).map(id => getAnswerById(store, id));

/* USERS */
export const getUsersState = store => store.users
export const getCurrentUserId = store => 
    getUsersState(store) ? getUsersState(store).currentUserId : undefined;
export const getUserById = (store,id) =>
    getUsersState(store) ? {...getUsersState(store).byIds[id], id} : {};

