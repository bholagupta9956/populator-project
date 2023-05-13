// This is the wallet  ;

const initialState = {
    points : ""
}


const walletData = (state = initialState , action ) =>{
    if(action.type === "UPDATE_WALLET_DATA"){ 
        return {
            ...state , points : action.payload
        }
    }
    else if(action.type === "CLEAR_WALLER_DATA"){
        return {
            ...state , points : 0
        }
    }
    else {
        return state;
    }
    
}

export default walletData ;