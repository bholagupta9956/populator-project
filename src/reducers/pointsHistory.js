import PointsHistory from "../Component/PointsHistory/PointsHistory"

// here we are going to define the points history function ;
const initialstate = {
    view : "tableView"
}
const PointHistory = (state = initialstate , action ) =>{

    if(action.type === "TABLE_VIEW"){
        return {
            ...state , view : "tableView"
        }
    }
    else if(action.type === "GRAPH_VIEW"){
        return {
            ...state , view : "graphView"
        }
    }
    else if(action.type === 'DATA_VIEW'){
        return {
            ...state , view : 'dataView'
        }
    }
    else return state ;

}

export default PointHistory;