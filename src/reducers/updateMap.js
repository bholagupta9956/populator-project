// 
const initialState = {
    map : null
}

const updateMap = (state = initialState , action) =>{
    if(action.type === "SAVE_MAP") {
        return {
            ...state , map : action.payload
        }
    }
    else {
        return state
    }
}

export default updateMap ;