const initialData = {
    storeTasks: ['SavedTask-1', 'SavedTask-2']
}

function taskReducer(state = initialData, action) {
    let newState
    switch (action.type) {
        case 'ADD_TASK':
            newState = {
                ...state,
                storeTasks: [...state.storeTasks, action.payload]
            }
            break
        default:
            return state
    }
    return newState
}

export default taskReducer
