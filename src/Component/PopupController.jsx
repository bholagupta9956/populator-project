// in this file we will control all the popup related to this project ;
import React from "react";
import Control from "./ControlPanel/Control";
import SelectedFeatures from "./ControlPanel/SelectedFeatures";
import { useSelector } from "react-redux";


const PopupController = () =>{
    const myState = useSelector((state) => state.popupController.show)

    if(myState === "selectedFeatures"){
        return(<SelectedFeatures/>)
    }
    else if(myState === "showControlPanel"){
        return(<Control/>)
    }
    else if(myState === ""){
        return null
    }
    else if(myState === "hideControlPanel"){
        return null
    }
    return (<></>)
        
}

// exporting the popupController ;
export default PopupController ;