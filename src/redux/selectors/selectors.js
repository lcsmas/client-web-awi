/* ANSWERS */
export const getAnswersState = store => store.answers;
export const getAnswersList = store =>
  getAnswersState(store) ? getAnswersState(store).allIds : [];
export const getAnswerById = (store, id) =>
  getAnswersState(store) ? { ...getAnswersState(store).byIds[id], id } : {};
export const getAnswers = store =>
  getAnswersList(store).map(id => getAnswerById(store, id));
export const getAnswersFetchState = store =>
  getSliceFetchState(store, "answers");
export const getAnswerNbLikes = (store, id) =>
  getAnswerById(store, id).idLikes ? getAnswerById(store, id).idLikes.length : 0;
export const getReportedAnswers = (store) =>
  getReportedSlice(store, 'answers')

/* PROPOSITIONS */
export const getPropositionsState = store => store.propositions;
export const getPropositionsList = store =>
  getPropositionsState(store) ? getPropositionsState(store).allIds : [];
export const getPropositionById = (store, id) =>
  getPropositionsState(store)
    ? { ...getPropositionsState(store).byIds[id], id }
    : {};
export const getPropositions = store =>
  getPropositionsList(store).map(id => getPropositionById(store, id));
export const getAnswersOfProposition = (store, idProposition) =>
  getPropositionById(store, idProposition).answers;
export const getSelectedProposition = store => store.propositions.selected;
export const getPropositionsFetchState = store =>
  getSliceFetchState(store, "propositions");
export const getPropositionNbLikes = (store, id) => 
  getPropositionById(store, id).idLikes ? getPropositionById(store, id).idLikes.length : 0;
export const getReportedPropositions = (store) =>
  getReportedSlice(store, 'propositions')

/* USERS */
export const getUsersState = store => store.users;
export const getUserById = (store, id) =>
  getUsersState(store) ? { ...getUsersState(store).byIds[id] } : {};
export const getUsersConnectionState = store =>
  getUsersState(store) ? getUsersState(store).connectionState : undefined;
export const getToken = store =>
  getUsersConnectionState(store).token;
export const getCurrentUserId = store => getUsersConnectionState(store).currentUserId;

/* HIGHER-ORDER */
export const getSliceState = (store, slice) => store[slice];
export const getSliceList = (store, slice) =>
  getSliceState(store, slice) ? getSliceState(store, slice).allIds : [];
export const getSliceById = (store, slice, id) =>
  getSliceState(store, slice)
    ? { ...getSliceState(store, slice).byIds[id], id }
    : {};
export const getSlice = (store, slice) =>
  getSliceList(store, slice).map(id => getSliceById(store, slice, id));
export const getSliceFetchState = (store, slice) =>
  getSliceState(store, slice) ? store[slice].fetchState : {};
export const getReportedSlice = (store, slice) =>
  getSliceState(store, slice).reportedIds 