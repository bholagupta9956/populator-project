// here we are going to import all the popup of the related to the user profile popup ; and will be maintained from this component ;

import React, { useState } from "react";
import UserProfile from "../UserProfile";
import EmailPopup from "../Email/EmailPopup";
import PurchasePoints from "../PurchasePoints/PurchasePoins";
import ReferEarn from "../refer&earn/ReferEarn";
import ShareLink from "../ShareLink/ShareLink";
import { useSelector } from "react-redux";
import FileImporter from "../FileImporter/FileImporter";
import PointsHistory from "../../../PointsHistory/PointsHistory"
import Flyers from "../../../Flyers/Flyers";
import ToolsScreen from "../../../Tools/ToolsScreen";
import CompareMain from "../../../Comparison/CompareMain";
// here we are import the function from the reducer file ;
import ComparisonDetails from '../../../Comparison/ComparisonDetails';
import manageProfile from "../../../../reducers/profileUpdate"

const ProfilePopupController = () =>{
   
    const data = useSelector((state) => state.manageProfile.show)


    if(data === "referEarn"){
        return <ReferEarn />
    }
    else if(data === "profileScreen"){
        return <UserProfile />
    }
    else if(data === "purchasePoints"){
        return <PurchasePoints  />
    }
    else if(data === "shareLink"){
        return <ShareLink />
    }
    else if(data === "pointHistory"){
        return <PointsHistory />
    }
    else if(data === "fileImporter"){
        return <FileImporter/>
    }
    else if(data === "toolsScreen"){
        return <ToolsScreen/>
    }
    else if(data === "emailPopup"){
        return <EmailPopup/>
    }
    else if(data === "showComparison"){
        return <CompareMain/>
    }
    else if(data === "showComparisonDetails"){
        return <ComparisonDetails/>
    }
    
    else if(data === "showFlyersScreen"){
        return <Flyers/>
    }
    else if(data === null){
        return null ;
    }

    return(<>
    </>)

}

// exporting the component ;
export default ProfilePopupController;