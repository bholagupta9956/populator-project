// here we are going to create a function which will keep all the record of the created shapes ;

const initialState = {
    polygonArray : [] ,
    rectangleArray : [] ,
    circleArray : [] ,
    markerArray : [] ,
    radiusBasedMarker : [] ,
    roadBasedMarker : [] ,
    removeRadiusBasedName : { name : null , id : null} ,
    removeRoadBasedName :  { name : null , id : null} ,
    removeRectangleShapeName : { name : null , id : null} ,
    removeCircleShapeName : { name : null , id : null} ,
    removePolygonShapeName : { name : null , id : null} 
}

const AllCreatedShapes = (state = initialState , action) =>{

    if(action.type === "UPDATE_POLYGON_ARRAY"){
        return {
            ...state , polygonArray : action.payload
        }
    }
    else if(action.type === "UPDATE_RECTANGLE_ARRAY"){
        return {
            ...state , rectangleArray : action.payload
        }
    }
    else if(action.type === "UPDATE_CIRCLE_ARRAY"){
        return {
            ...state , circleArray : action.payload
        }
    }
    else if(action.type === "UPDATE_RADIUS_BASED_MARKER"){
        return {
            ...state , radiusBasedMarker : action.payload
        }
    }
    else if(action.type === "UPDATE_ROAD_BASED_MARKER"){
        return {
            ...state , roadBasedMarker : action.payload
        }
    }
    else if(action.type === "UPDATE_MARKER_ARRAY"){
        return {
            ...state , markerArray : action.payload 
        }
    }
    else if(action.type === "UPDATE_REMOVE_CIRCLE_SHAPE_NAME"){
        return {
            ...state , removeCircleShapeName : action.payload
        }
    }
    else if(action.type === 'UPDATE_REMOVE_POLYGON_SHAPE_NAME'){
        return {
            ...state , removePolygonShapeName : action.payload
        }
    }
    else if(action.type === 'UPDATE_REMOVE_RECTANGLE_SHAPE_NAME'){
        return {
            ...state , removeRectangleShapeName : action.payload 
        }
    }
    else if(action.type === "UPDATE_REMOVE_RADIUS_BASED_NAME"){
        return {
            ...state , removeRadiusBasedName : action.payload
        }
    }
    else if(action.type === "UPDATE_REMOVE_ROAD_BASED_NAME") {
        return {
            ...state , removeRoadBasedName : action.payload
        }
    }
    else if(action.type === "CLEAR_ALLSHAPES_RECORD"){
        return {
            ...state , polygonArray : [] , circleArray : [] , rectangleArray : [] , radiusBasedMarker : [] , roadBasedMarker : [] , removeCircleShapeName : { name : null , id : null} , removePolygonShapeName : {name : null , id : null} , removeRectangleShapeName : { name : null , id : null} , removeRadiusBasedName : { name : null , id : null} , removeRoadBasedName :  { name : null , id : null} ,
        }
    }
    else {
        return state 
    }
}

// exporting the component ;
export default AllCreatedShapes ;