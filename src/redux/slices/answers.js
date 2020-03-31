import { createFetchableSlice } from 'redux/slices/utilities'

const answers = createFetchableSlice({
    name: 'answers',
})

export const { fetch: fetchAnswers, post: postAnswer } = answers.thunks
export default answers.reducer