
// here we are storing the api ;
const initialState = {
    // url : "http://populator.co/admin/public/api/v1/" ,
    url : "/admin/public/api/v1/"
}

const apiStore = (state = initialState , action) =>{
    if(action.type === "UPDATE_URL"){
        return {
            ...state , 
            // url : "http://populator.co/admin/public/api/v1/" ,
            url : "/admin/public/api/v1/"
        }
    }
    else {
        return state 
    }
};

export default apiStore ;

