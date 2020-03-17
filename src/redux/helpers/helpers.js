export const deepCloneNormalizedState = state => {
    const allIds = [...state.allIds];
    let byIds = {};
    Object.entries(state.byIds).forEach(prop => {
        const id = prop[0];
        const entity = prop[1];
        const resEntity = {};
        Object.entries(entity).forEach((keyValue)=>{
            const key = keyValue[0];
            const value = keyValue[1];
            Array.isArray(value) ? resEntity[key] = [...value] : resEntity[key] = value;
        })
        byIds[id] = resEntity;
    })
    return {...state, allIds, byIds}
}