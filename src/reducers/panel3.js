const initialState = {
    withInBoundary : true ,
    withInShape : false
}

const panel3 = (state = initialState ,action) =>{
    if(action.type === "SHOW_WITHIN_BOUNDARY"){
        return {...state , withInBoundary : true , withInShape : false}
    }
    else if(action.type === "SHOW_WITHIN_SHAPES"){
        return {...state , withInBoundary : false , withInShape : true}
    }
    else {
        return state 
    }
}

// exporting the component ;
export default panel3 ;