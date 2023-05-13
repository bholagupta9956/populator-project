const initialstate = {
    show : false ,
    title : "Good Job !",
    text : ""
}

const handleSweetAlert = (state = initialstate , action) =>{
    if(action.type === "SHOW_SWEET_ALERT"){
        return {
            ...state , show : true , text : action.payload
        }
    }else if(action.type === "HIDE_SWEET_ALERT"){
        return {
            ...state , show :false 
        }
    }else {
        return state ;
    }
}

export default handleSweetAlert ;