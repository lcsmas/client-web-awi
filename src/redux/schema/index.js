export const ENTITIES = {
    USERS: 'users',
    PROPOSITIONS: 'propositions',
    TAGS: 'tags',
    ANSWERS: 'answers'
}

const MAPPING = {
    DEV_API: {
        PROPOSITIONS: [
            { client: 'id', server: 'id' },
            { client: 'title', server: 'title' },
            { client: 'content', server: 'content' },
            { client: 'isAnon', server: 'isAnon' },
            { client: 'nbLikes', server: 'nbLikes' },
            { client: 'owner', server: 'owner' },
            { client: 'tags', server: 'tags' },
            { client: 'answers', server: 'answers' }
        ],
        ANSWERS: [
            { client: 'id', server: 'id' },
            { client: 'content', server: 'content' },
            { client: 'isAnon', server: 'isAnon' },
            { client: 'nbLikes', server: 'nbLikes' },
            { client: 'owner', server: 'owner' },
            { client: 'tags', server: 'tags' },
        ],
        TAGS: [
            { client: 'id', server: 'id' },
            { client: 'title', server: 'title' }
        ],
        USERS: [
            { client: 'id', server: 'id' },
            { client: 'name', server: 'pseudo' },
        ]
    }

}

export const getMapping = sliceName => {
    const SLICE_NAME = sliceName.toUpperCase();
    if (process.env.NODE_ENV !== 'production') {
        return MAPPING.DEV_API[SLICE_NAME]
    } 
    return MAPPING.PROD_API[SLICE_NAME]
}
