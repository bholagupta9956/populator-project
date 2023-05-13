// here we are going define the function which will handle the  panel ;

const initialstate = {
    showPanel : "FirstPanel",
}


const findOpportunities = (state = initialstate , action) => {

    if(action.type === "FIRST_PANEL"){
        return {
            ...state , showPanel : "FirstPanel"
        }
    }
    else if(action.type === "SECOND_PANEL"){
        return {
            ...state , showPanel : "SecondPanel"
        }
    }
    else if(action.type ===  "THIRD_PANEL"){
        return {
            ...state , showPanel : "ThirdPanel"
        }
    }
   
    else {
        return state ;
    }
}




export default findOpportunities ;