import { accordionActionsClasses } from "@mui/material";

// here we will store the catchement data ;
const initialState = {
    data : {type : "Road" , dist : 500},
    radiusDta : {} ,
    startCatchment : false ,
    CatchmentResultScreen : false ,
    circleData : {} ,
    saveFile : false ,
    selectedCatchmentData : {} ,
    showSelectedCatchment : false
}

const catchmentData = (state = initialState , action) =>{
    if(action.type === "UPDATE_CATCHMENT_DATA"){
        return {
            ...state , data : action.payload
        }
    }
    else if(action.type === "CLEAR_CATCHMENT_DATA"){
        return {
            ...state , data : {type : "Road" , dist : 500}
        }
    }
    else if(action.type === "UPDATE_RADIUS_DATA"){
        return {
            ...state , radiusDta : action.payload
        }
    }
    else if(action.type === "CLEAR_RADIUS_DATA"){
        return {
            ...state , radiusDta : {}
        }
    }
    else if(action.type === "ENABLE_CATCHMENT"){
        return {
            ...state , startCatchment : true
        }
    }
    else if(action.type === "DISABLE_CATCHMENT"){
        return {
            ...state , startCatchment : false
        }
    }
    else if(action.type === "SHOW_CATCHMENT_RESULT_SCREEN"){
        return {
            ...state , CatchmentResultScreen : true , circleData : action.payload
        }
    }
    else if(action.type === "HIDE_CATCHMENT_RESULT_SCREEN"){
        return {
            ...state , CatchmentResultScreen : false
        }
    }
    else if(action.type === "SHOW_CATCHMENT_SAVE_FILE"){
        return {
            ...state , saveFile : true ,  circleData : action.payload
        }
    }
    else if(action.type === "HIDE_CATCHMENT_SAVE_FILE"){
        return {
            ...state , saveFile : false
        }
    }
    else if(action.type === "UPDATE_SELECTED_CATCHMENT"){
        return {
            ...state , selectedCatchmentData : action.payload
        }
    }
    else if(action.type === "CLEAR_SELECTED_CATCHMENT"){
        return {
            ...state , selectedCatchmentData : {}
        }
    }
    else if(action.type === "SHOW_SELECTED_CATCHMENT_ONMAP"){
        return {
            ...state , showSelectedCatchment : true
        }
    }
    else if(action.type === "HIDE_SELECTED_CATCHMENT_ONMAP"){
        return {
            ...state , showSelectedCatchment : false
        }
    }
    else {
        return state 
    }
};

export default catchmentData ;