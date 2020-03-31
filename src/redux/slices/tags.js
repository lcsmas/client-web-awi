import { createFetchableSlice } from 'redux/slices/utilities'

const tags = createFetchableSlice({
    name: 'tags',
})

export const { post: postTags, fetch: fetchTags } = tags.thunks
export default tags.reducer

