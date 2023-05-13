const initialState = {
    data : false
}

const userLoged = (state = initialState , action) =>{
    if(action.type === "LOGED_IN"){
        return {
            ...state , data : true
        }
    }
     else if(action.type === "LOGED_OUT"){
         return {
             ...state , data : false
         }
     }
     else {
         return state
     }
}

export default userLoged ;