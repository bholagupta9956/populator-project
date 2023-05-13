// here we are writing all the function related to the loadshapes and the catchmetn of the profect ;

const initialState = {
    showPopup : false
}

const loadShapes = (state = initialState , action) => {
    if(action.type === "SHOW_LOAD_SHAPES"){
        return {
            ...state , showPopup : true
        }
    }
    else if(action.type === "HIDE_LOAD_SHAPES"){
        return {
            ...state , showPopup : false
        }
    }
    else {
        return state 
    }
}

// exporting the component ;
export default loadShapes ;