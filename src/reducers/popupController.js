// in this we will mention al the function of controlling the popup on the project ;

const initialstate = {
    show : ""
}


const popupController = (state = initialstate , action ) =>{
    if(action.type === "SELECTED_FEATURES"){
        return {
            ...state , show : 'selectedFeatures'
        }
    }else if(action.type === "HIDE_SCREEN_POPUP"){
       
        return {
            ...state , show : ""
        }
    }
    else if(action.type === "SHOW_NOTIFICATION"){
        return {
            ...state , show : 'showNotification'
        }
    }
    

    else {
        return state 
    }

}

export default popupController ;