// it will handle the cuttedPoints notification ;


const initialState = {
    showPopup : false  , 
    points : 0 ,
    userConfirmed : false
}

const pointsNotificationhandler = (state = initialState , action ) =>{
    if(action.type === "SHOW_POINTS_NOTIFICATION"){
         return {
             ...state , showPopup : true , points : action.payload
         }
    }
    else if(action.type === "HIDE_POINTS_NOTIFICATION"){
        return {
            ...state , showPopup : false , userConfirmed : action.payload
        }
    }
    else {
        return state 
    }
}

// exporting the pointsNotificationHandler ;
export default pointsNotificationhandler ;