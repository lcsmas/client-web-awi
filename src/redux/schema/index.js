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
    },
    PROD_API: {
        PROPOSITIONS: [
            { client: 'id', server: 'id' },
            { client: 'title', server: 'titleProp' },
            { client: 'content', server: 'contentProp' },
            { client: 'isAnon', server: 'isAnonymous' },
            { client: 'idLikes', server: 'idLikesProp' },
            { client: 'owner', server: 'ownerProp' },
            { client: 'tags', server: 'tagsProp' },
            { client: 'answers', server: 'idAnswers' },
            { client: 'date', server: 'dateProp' }
        ],
        ANSWERS: [
            { client: 'id', server: 'id' },
            { client: 'content', server: 'contentAnswer' },
            { client: 'isAnon', server: 'isAnonymous' },
            { client: 'idLikes', server: 'idLikesAnswer' },
            { client: 'owner', server: 'ownerAnswer' },
            { client: 'tags', server: 'tagsAnswer' },
            { client: 'proposition', server: 'idProp' }
        ],
        TAGS: [
            { client: 'id', server: 'id' },
            { client: 'title', server: 'label' },
            { client: 'nbOccurrence', server: 'nbOccurence' },
            { client: 'answers', server: 'idAnswers' }
        ],
        USERS: [
            { client: 'id', server: 'id' },
            { client: 'name', server: 'pseudo' },
            { client: 'city', server: 'city' },
            { client: 'isAdmin', server: 'isAdmin' },
            { client: 'isConnected', server: 'isConnected' },
            { client: 'isBanned', server: 'isBanned' },
            { client: 'propositions', server: 'idPropositions' },
            { client: 'answers', server: 'idAnswers' }
        ]
    }

}

export const getMapping = sliceName => {
    const SLICE_NAME = sliceName.toUpperCase();
    if (process.env.NODE_ENV !== 'production') {
        return MAPPING.PROD_API[SLICE_NAME]
    } 
    return MAPPING.PROD_API[SLICE_NAME]
}
