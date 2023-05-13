// here we will store all the data whic will be imported as an file formated ;

const initialState = {
    geoJson : [] ,
    csvData : [] ,
    kmlDatas : [] ,
    flymap : false
}

const fileImporter = (state = initialState , action) => {
    if(action.type === "UPDATE_GEOJSON"){
        return {
            ...state , geoJson : action.payload ,
            flymap : true
        }
    }
    else if(action.type === "UPDATE_KMLDATA"){
        return {
            ...state , kmlDatas : action.payload ,
            flymap : true
        }
    }
    else if(action.type === "CLEAR_GEOJSON_KMLDATA"){
        return {
            ...state , geoJson : [] , kmlDatas : []
        }
    }
    else if(action.type === "DISABLE_MAP_FLYING"){
        return {
            ...state , flymap : false
        }
    }
    else {
        return state 
    }
}

export default fileImporter ;