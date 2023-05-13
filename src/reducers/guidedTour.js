// here we are writing the function which will be used to toggle the guided tour ;

const initialState = {
    show : false ,
    tour : false ,
    video : false ,
    play : false ,
    videoId : ""
}

const guidedTour = (state = initialState , action) =>{
    if(action.type === "SHOW_GUIDED_TOUR"){
        return {
            ...state , show : true 
        }
    }
    else if(action.type === "HIDE_GUIDED_TOUR"){
        return {
            ...state , show : false 
        }
    }
    else if(action.type === "OPEN_GUIDED_TOUR"){
         return {
             ...state , tour : true
         }
    }
     else if(action.type === "CLOSE_GUIDED_TOUR"){
         return {
             ...state , tour : false , 
         }
     }
     else if(action.type === "OPEN_VIDEO_SECTION"){
         return {
             ...state , video : true
         }
     }
     else if(action.type === 'CLOSE_VIDEO_SECTION'){
         return {
             ...state , video : false
         }
     }
     else if(action.type === "PLAY_VIDEO"){
         return {
             ...state , play : true , videoId : action.payload
         }
     }
     else if(action.type === "CLOSE_VIDEO"){
         return {
            ...state , play : false
         }
     }
    else {
        return state 
    }
}

// exporting the comfponent ;
export default guidedTour ;


// muIvEcYeODY ,