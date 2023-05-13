// here we are going to store the poiMarker Details ;

const initialState = {
    data : {
        center : {lat : 0 , lng : 0} ,
        val : {
            image : "https://populator.co/admin/public/marker_images/48701.svg",
            mapimage : "https://populator.co/admin/public/map_images/4904.jpg" ,
            name : "",
            category : "" ,
            outlet_name : "" ,
        }
    } ,
}

const poiMarkerData = (state = initialState , action) =>{
    if(action.type === "UPDATE_POI_MARKER_DATA"){
        return {
            ...state , data : action.payload
        }
    }
    else if(action.type === "CLEAR_POI_MARKER_DATA"){
        return {
            ...state , data : { 
                 center : {lat : 0 , lng : 0} , 
                 val : {
                    image : "https://populator.co/admin/public/marker_images/48701.svg",
                    mapimage : "https://populator.co/admin/public/map_images/4904.jpg" ,
                    name : "",
                   category : "" ,
                   outlet_name : "" ,
            }}
        }
    }
    else {
        return state;
    }
}

export default poiMarkerData ;