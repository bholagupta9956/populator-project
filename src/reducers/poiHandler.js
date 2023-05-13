const initialState = {
    show : false ,
    poiDetails : false
}

const poiHandler = (state = initialState , action) =>{
   if(action.type === "SHOW_POI"){
       return {
           ...state , show : true
       }
   }
   else if(action.type === "HIDE_POI"){
       return {
           ...state , show : false
       }
   }
   else if(action.type === "SHOW_POI_DETAILS"){
       return {
           ...state , poiDetails : true
       }
   }
   else if(action.type === "HIDE_POI_DETAILS"){
       return {
           ...state , poiDetails : false
       }
   }
   else {
      return state 
   }
}

export default poiHandler;