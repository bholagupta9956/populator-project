// this is the country code handler ;

const initialState = {
  show: false,
  data: {
    image:
      "https://populator.co/admin/public//country_images/80099.svg",
    phone_code: "+966",
    digits: 9,
  },
};

const countryCodeHandler = (state = initialState, action) => {
  if (action.type === "SHOW_COUNTRY_CODE") {
    return {
      ...state,
      show: true,
    };
  } else if (action.type === "UPDATE_COUNTRY_CODE") {
    return {
      ...state,
      data: action.payload,
      show: false,
    };
  }
   else if(action.type === "CLOSE_COUNTRY_CODE"){
     return {
       ...state , show : false
     }
   }
  else {
    return state;
  }
};

export default countryCodeHandler;
