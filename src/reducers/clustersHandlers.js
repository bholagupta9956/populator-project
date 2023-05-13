// here we are adding the cluster to the project ;
const initialState = {
    show : false ,
    value : 0
}

const clustersHanlders = (state = initialState , action) =>{
    if(action.type === "SHOW_CLUSTER"){
        return {
            ...state , show : true 
        }
    }
    else if(action.type === "HIDE_CLUSTER"){
        return {
            ...state , show : false 
        }
    }
    else if(action.type === "UPDATE_CLUSTER_VALUE"){
        return {
            ...state , value : action.payload
        }
    }
    else {
        return state 
    }
}

export default clustersHanlders ;