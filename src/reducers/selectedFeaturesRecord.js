// this file will keep the record of all the selected features ;

const initialstate = {
    data : [] ,
    totalCuttedPoints : 0,
    template_details_api : 0
}

const selectedFeaturesRecord = (state = initialstate , action) =>{

    if(action.type === "FEATURE_SELECTED"){
        return {
            ...state , data : action.payload , 
        }
        
    }
    else if(action.type === "CUTTED_POINTS"){
        return{
            ...state , totalCuttedPoints : action.payload
        }
    }
    else if(action.type === "CLEAR_FEATURES_RECORD"){
        return {
            ...state , data : [] , totalCuttedPoints : 0
        }
    }
    else if(action.type  === 'UPDATE_GET_TEMPLATE_DETAILS'){
       return {
           ...state , template_details_api : state.totalCuttedPoints++
       }
    }
    else {
        return state 
    }
}

export default selectedFeaturesRecord ;