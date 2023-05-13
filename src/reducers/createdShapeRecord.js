
// here we will call a function which will keep the record of the shapes data ;

const initialstate = {
    data : {},
}

const createShapesRecord = (state = initialstate , action) =>{
    
    if(action.type === "SHAPE_RECORD"){
        return {
            ...state , 
                data : action.payload,
        }
    }else if(action.type === "REMOVE_SHAPE_RECORD"){
        return {
            ...state , data : {} 
        }
    }
   
    else {
        return state 
    }
}

export default createShapesRecord ;