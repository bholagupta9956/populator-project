// here we are storing the poi checked item as an stores ;
const initialState = {
    poiCheckedItems : [],
    poiSelectedItems : [] ,
    servicesCheckedItems : [] ,
    servicesSelectedItemss : [] ,
    checkedSubCategoriess : {} ,
    categoryChecked : [],
    allcheckedd : false ,
    calculatedPoints : 0
}

const poiCheckedItem = (state = initialState , action) =>{
    if(action.type === "UPDATE_CHECKED_DATA"){
        return {
           ...state, poiCheckedItems : action.payload.poi ,
           servicesCheckedItems : action.payload.services 
        }

    }
    else if(action.type === "UPDATE_SELECTED_DATA"){
        return {
            ...state , poiSelectedItems : action.payload.poi ,
            servicesSelectedItemss : action.payload.services 
        }
    }
    else if (action.type === "CLEAR_All_CHECKED_ITEMS"){
        return {
            ...state , poiCheckedItems : [],
            poiSelectedItems : [] ,
            servicesCheckedItems : [] ,
            servicesSelectedItemss : [] ,
            checkedSubCategoriess : {} ,
            categoryChecked : [] ,
            calculatedPoints : 0 ,
            allcheckedd  : false
        }
    }
    else if(action.type === "UPDATE_SUBCATEGORIES"){
        return {
            ...state , checkedSubCategoriess : action.payload ,
        }
    }
    else if(action.type === "UPDATE_CHECKED_CATEGORY"){
        return {
            ...state , categoryChecked : action.payload ,
        }
    }
    else if(action.type === "FULL_CHECKED"){
        return {
            ...state , allcheckedd : action.payload
        }
    }
    else if(action.type === "UPDATE_CALCULATED_POINTS"){
        return {...state , calculatedPoints : action.payload}
    }
    else {
        return state 
    }
}

export default poiCheckedItem ;