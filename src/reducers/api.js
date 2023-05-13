// HERE WE ARE USING THE FUNCTION GET THE API ;

const initialstate = {
    data : "http://populator.co/admin/public/api/v1/",
    coordinates : undefined  ,
    flymap : false ,
}

const api  = (state = initialstate , action) =>{
   if(action.type === "CSV_DATA"){
        return {
            ...state , 
            coordinates : action.payload ,
            flymap : true
        }
    }
    else if(action.type === "UNABLE_MAP_FLY"){
        return {
            ...state , flymap : false
        }
    }
    else {
      return   state;
    }
}

export default api ;