import { bindActionCreators } from "redux";

//here we are going to write a function which will manage the profile screen ;
const initialstate = {
  show: null,
};
const manageProfile = (state = initialstate, action) => {
  if (action.type === "PROFILE_SCREEN") {
    return {
      ...state,
      show: "profileScreen",
    };
  } else if (action.type === "REFER_EARN") {
    return {
      ...state,
      show: "referEarn",
    };
  } else if (action.type === "SHARE_LINK") {
    return {
      ...state,
      show: "shareLink",
    };
  } else if (action.type === "PURCHASE_POINTS") {
    return {
      ...state,
      show: "purchasePoints",
    };
  } else if (action.type === "CUT_PROFILE") {
    return {
      ...state,
      show: "cutProfile",
    };
  } else if (action.type === "POINTS_HISTORY") {
    return {
      ...state,
      show: "pointHistory",
    };
  } else if (action.type === "FILE_IMPORTER") {
    return {
      ...state,
      show: "fileImporter",
    };
  } else if (action.type === "SHOW_TOOLS") {
    return {
      ...state,
      show: "toolsScreen",
    };
  } else if (action.type === "SHOW_EMAIL") {
    return {
      ...state,
      show: "emailPopup",
    };
  } else if (action.type === "SHOW_COMPARISON") {
    return {
      ...state,
      show: "showComparison",
    };
    
  }
  else if(action.type === "SHOW_COMPARISON_DETAILS"){
    return {
      ...state , show : "showComparisonDetails"
    }
  }
  else if (action.type === "SHOW_FLYERS_SCREEN") {
    return {
       ...state, show: "showFlyersScreen" }
  } 
  else {
    return state;
  }
};

export default manageProfile;
