// here we are creating a resultPanel handler which will handle the result panel ; either it will be open or closed ;

const initialState = {
    show : false ,
    dataFormat : "graphicalData"
}

const resultPanelHandler = (state = initialState  , action ) =>{
    if(action.type === "OPEN_RESULT_PANEL"){
        return {
            ...state , show : true
        }
    }
    else if(action.type === "CLOSE_RESULT_PANEL"){
        return {
            ...state , show : false 
        }
    }
    else if(action.type === "SHOW_GRAPHICAL_DATAS"){
        return {
            ...state , dataFormat : "graphicalData"
        }
    }
    else if(action.type === "SHOW_POI_DATA"){
        return {
            ...state , dataFormat : "poiData"
        }
    }
    else if(action.type === "SHOW_SAVED_SHAPES"){
        return {
            ...state , dataFormat : "savedShape"
        }
    }
    else {
        return state 
    }
}

// exporting the resultPanelHandler ;
export default resultPanelHandler ;