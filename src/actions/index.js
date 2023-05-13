// here all the actions will be defined that what to do;

export const getShapeData = (data) => {
    return {
        type : "UPDATE_SHAPE_DATA",
        payload : data
    }
}

export const clearShapeData = () =>{
    return {
        type : "CLEAR_SHAPE_DATA"
    }
}

// here we are updating the marker address ;

export const updateMarkerAddress = (data) =>{
    return {
        type : "UPDATE_MARKER_ADDRESS" ,
        payload : data
    }
}

// here we defining all the functions related to profile component ;

export const showProfile = () =>{
    return {
        type : "PROFILE_SCREEN"
    }
}

export const showReferEarn = () =>{
    return {
        type : "REFER_EARN"
    }
}

export const showShareLink = () =>{
    return {
        type : "SHARE_LINK"
    }
}

export const showPoints = () =>{
    return {
        type : "PURCHASE_POINTS"
    }
}
export const showPointsHistory = () =>{
    return {
        type : "POINTS_HISTORY"
    }
}

export const cutProfileScreen = () =>{
    return {
        type : "CUT_PROFILE"
    }
}

export const showFileImporter = () =>{
    return {
        type :"FILE_IMPORTER"
    }
}

export const showToolsScreen = () =>{
    return {
        type  : "SHOW_TOOLS"
    }
}

export const showEmail = () =>{
    return {
        type : "SHOW_EMAIL"
    }
}

export const showComparison = () =>{
    return {
        type : "SHOW_COMPARISON"
    }
}

export const showComparisonDetails = () =>{
    return {
        type : "SHOW_COMPARISON_DETAILS"
    }
}

export const showFlyersScreen = () =>{
    return {
        type : "SHOW_FLYERS_SCREEN"
    }
}




// here we are defining all the function related to authenication;

export const showLoginPopup = () =>{
    return {
        type : "LOGIN_POPUP"
    }
}

export const showForgotPassword = () =>{
    return {
        type : "FORGOT_PASSWORD"
    }
}

export const showChangePassword = () =>{
    return {
        type : "CHANGE_PASSWORD"
    }
}

export const showVerification = (token) =>{
    return {
        type : "VERIFICATION",
        payload : token
    }
}

export const showLoginByOtp = () =>{
    return {
        type : "LOGIN_BY_OTP"
    }
}

export const cutAuthenication = () =>{
    return {
        type : "CUT_AUTHENICATION"
    }
}
export const showReward = () =>{
    return {
        type : "REWARD_SCREEN"
    }
}

export const removeToken = () =>{
    return {
        type : "REMOVE_TOKEN"
    }
}

export const showLoginByOtpVerification = (data) =>{
    return {
        type : "LOGIN_BY_OTP_VERIFICATION" ,
        payload : data
    }
}

// here we are storing the signup data to the store ;

export const updateSignUpData = (data) =>{
    return {
        type : "UPDATE_SIGNUP_DATA" , 
        payload : data
    }
}

export const clearSignUpData = () =>{
    return {
        type : "CLEAR_SIGNUP_DATA"
    }
}

// here we are writing the function which will show the login or user screen;

export const userLogin = () =>{
    return {
        type : "USER_LOGIN"
    }
}

export const userProfile = (token) =>{
    return {
        type : "USER_PROFILE" ,
        payload : token 
    }
}

// here we defining the function which will keep the record of the all the created shapes ;

export const shapeRecord = (shapesData) =>{
    
    return {
        type : "SHAPE_RECORD",
        payload : shapesData ,
    }
}
export const removeShapeRecord = () =>{
    return {
        type : "REMOVE_SHAPE_RECORD"
    }
}

// here we going to write all the function related to pointshistory ;

export const showTable = () =>{
    return {
        type : "TABLE_VIEW"
    }
}

export const showGraph = () =>{
    return {
        type : "GRAPH_VIEW"
    }
}

 export const showData = () =>{
     return {
         type : 'DATA_VIEW'
     }
 }

//  here we are defining all the functions related to opportunities ;

export const panel1 = () =>{
    return {
        type : "FIRST_PANEL"
    }
}

export const panel2 = () =>{
    return {
        type : "SECOND_PANEL"
    }
}

export const panel3 = () =>{
    return {
        type : "THIRD_PANEL"
    }
}

// here we are writing the function which will toggle the  control panel ;

export const showControl = (data) =>{
    return {
        type : 'SHOW_CONTROL' ,
        payload : data
    }
}

 export const hideControl = (data) =>{
     return {
         type : 'HIDE_CONTROL' ,
         payload : data
     }
 }

//  here we writing the function for the sweet alert ;

export const ShowSweetAlert = (text) =>{
    return {
        type : "SHOW_SWEET_ALERT",
        payload : text 
    }
}

 export const HideSweetAlert = () =>{
     return {
         type : "HIDE_SWEET_ALERT"
     }
 }

// here we writing the function to get api ;

export const api = () =>{
    return {
        type : "PROFILE_API"
    }
}

export const updateCsvData = (data) =>{
    return {
        type : "CSV_DATA",
        payload : data
    }

}   
// here we  defining the ffunction which will help use to show the popup on the main screen and handle it 
    export const selectedFeatures = () =>{
   
        return {
            type : "SELECTED_FEATURES"
        }
    }
    
    export const hideScreenPopup = () =>{
        return {
            type : "HIDE_SCREEN_POPUP"
        }
    }

    // this is the function which will define the record of selected  features by findf opportunities option ;

    export const featureSelected = (data) =>{
        return {
            type : "FEATURE_SELECTED",
            payload : data
        }
    }

    export const clearFeaturesRecord = () =>{
        return {
            type : "CLEAR_FEATURES_RECORD"
        }
    }

    export  const updateGetTemplateDetails = () =>{
        return {
            type : 'UPDATE_GET_TEMPLATE_DETAILS'
        }
    }

    // here we are calling the function which will call the function and store the data of  the cutted pointes to send it into the result api ;

    export const cuttedPoints = (data) =>{
        return {
            type : "CUTTED_POINTS" ,
            payload : data
        }
    }

    // this is the function which will be used for updating and getting the data from the result screen ;

    export const updateResultScreenData = (data) =>{
        return { 
            type : "UPDATE_RESULT_SCREEN_DATA" ,
            payload : data
        }
    } 

    export const clearResultScreenData  = () =>{
        return {
            type : "CLEAR_RESULT_SCREEN_DATA"
        }
    }

    // this is functiont which we are creating for just dealling with the wallet data and points ;

    export const updateWalletData = (data) =>{
        return {
            type : "UPDATE_WALLET_DATA" ,
            payload : data 
        }
    }

    export const clearWalletData = () =>{
        return {
            type : "CLEAR_WALLET_DATA"
        }
    }

    // here we are writing a function which will update the user data after the login ;

    export const updateUserInfo = (data) =>{
        return {
            type : "UPDATE_USER_INFO" ,
            payload : data 
        }
    }

    export const clearUserInfo = () =>{
        return {
            type : "CLEAR_USER_INFO"
        }
    }

    export const updateUserImage = (data) =>{
        return {
            type : "UPDATE_USER_IMAGE" ,
            payload : data 
        }
    }

    export const updateUserBalance = (data) =>{
        return {
            type : 'UPDATE_USER_BALANCE' , 
            payload : data
        }
    }

    // here we are writing all the function related to the find opportunites panel1 ;

export const closePanel1 = (data) =>{
    return {
        type : "CLOSE_PANEL1" ,
        payload : data
    }
}  

// here we are adding the notification popup function ;

export const showNotification = (data) =>{
    return{
        type : "SHOW_NOTIFICATION" ,
        payload : data 
    }
}

export const hideNotification = () =>{
    return {
        type : "HIDE_NOTIFICATION"
    }
}

// here we are writing the function which will hide and show the cluster ;

export const showCluster = () =>{
    return {
        type : 'SHOW_CLUSTER'
    }
}

export const hideCluster = () =>{
    return {
        type : 'HIDE_CLUSTER'
    }
}

export const updateClusterValue = (data) =>{
    return {
        type : "UPDATE_CLUSTER_VALUE" ,
        payload : data
    }
}
// here we are writing the function which will hide and show the poiLayersHandlers ;

export const showPoiLayers = () =>{
    return {
        type : "SHOW_POI_LAYERS"
    }
}

export const hidePoiLayers = () =>{
    return {
        type : "HIDE_POI_LAYERS"
    }
}

export const updatePoiLayersValue = (data) =>{
    return {
        type : "UPDATE_POI_LAYERS_VALUE" ,
        payload : data 
    }
}

// here we are defining the function which will hide and show the heatmap ;

export const showHeatMap = () =>{
    return{
        type : "SHOW_HEATMAP"
    }
}

export const hideHeatMap = () =>{
    return {
        type : "HIDE_HEATMAP"
    }
}

export const udpateHeatmapValue = (data) =>{
    return {
        type : "UPDATE_HEATMAP_VALUE" ,
        payload : data
    }
}

export const addHeatmapLayers = (data) =>{
    return {
        type : "ADD_HEATMAP_LAYERS" ,
        payload : data 
    }
}

export const updateHeatmapShapeDetails = (data) =>{
    return {
        type : "UPDATE_HEATMAP_SHAPE_DETAILS" ,
        payload : data 
    }
}

export const updateHeatmapShapeDetailsArray = (data) =>{
    return {
        type : "UPDATE_HEATMAP_SHAPE_DETAILS_ARRAY",
        payload : data
    }
}

export const clearHeatmapShapeDetails = () =>{
    return {
        type : "CLEAR_HEATMAP_SHAPE_DETAILS"
    }
};

// here we are writing the code which will allow us through the getscanresult button to enable heatmap and cluster ;

export const enableCluster = () =>{
    return {
        type : "ENABLE_CLUSTER"
    }
}

export const enableHeatmap = () =>{
    return  {
        type : "ENABLE_HEATMAAP"
    }
}

export const disableCluster = () => {
    return {
        type : "DISABLE_CLUSTER"
    }
}

export const disableHeatmap = () =>{
     return {
         type : "DISABLE_HEATMAP"
     }
}

export const enablePoiLayers = () =>{
    return {
        type : "ENABLE_POI_LAYERS"
    }
}

export const disablePoiLayers = () => {
    return {
        type : "DISABLE_POI_LAYERS"
    }
}

export const refreshHeatmapCluster = (data) =>{
    return {
        type : "REFRESH_HEATMAP_CLUSTER",
        payload : data 
    }
}

export const deleteAllFromMap = (data) => {
    return {
        type : "DELETE_ALL_FROM_MAP" ,
        payload : data
    }
}

// here we are writing the function which will handle the welcome screenf ;j

export const closeWelcome = () =>{
    return {
        type : 'CLOSE_WELCOME'
    }
}

export const openWelcome = () =>{
    return {
        type : "OPEN_WELCOME"
    }
}

// here we are writing the function which will be used for the getting and updating the map location ;

export const updateMapLocation = () =>{
    return {
        type : "UPDATE_MAP_LOCATION"
    }
}

export const saudiLocation = () =>{
    return {
        type : 'SAUDI_LOCATION'
    }
}

// here we are writing the function which will be used for toggling the poiLayer;

export const showPoi = () =>{
    return {
        type : "SHOW_POI"
    }
}

export const hidePoi = () =>{
    return {
        type : 'HIDE_POI'
    }
}

// writing the function which will show the either is user is loged in or loged out ;

export const logedIn = () =>{
    return {
        type : 'LOGED_IN'
    }
}

export const logedOut = () =>{
    return {
        type : 'LOGED_OUT'
    }
}

// here we are writing the function which will handle the pointsNotifcation ;

export const showPointsNotification = (data) =>{
    return {
        type : "SHOW_POINTS_NOTIFICATION" ,
        payload : data
    }
}

export const hidePointsNotification = (data) =>{
    return {
        type : "HIDE_POINTS_NOTIFICATION" ,
        payload : data
    }
}

// here we are writing the function which will handle the resultPanel ;

export const openResultPanel = () =>{
    return {
        type : "OPEN_RESULT_PANEL"
    }
}

export const closeResultPanel = () =>{
    return {
        type : 'CLOSE_RESULT_PANEL'
    }
}

export const showGraphicalDatas = () =>{
    return {
        type : "SHOW_GRAPHICAL_DATAS"
    }
}

export const showPoiData = () =>{
    return {
        type : "SHOW_POI_DATA"
    }
}

export const showSavedShapes  = () =>{
    return {
        type : "SHOW_SAVED_SHAPES"
    }
}

// here we are writting function which vwill handl;e poi notification when the user has not selected any poi or services ;

export const showPoiNotification = () => {
    return {
        type : "SHOW_POI_NOTIFICATION"
    }
}

export const hidePoiNotification = () => {
    return {
        type : "HIDE_POI_NOTIFICATION"
    }
}

// here we are writing the function which will be used update the shpae details and will be used to save it with the name ;

export const updateShapeDetails = (data) => {
    return {
        type : 'UPDATE_SHAPE_DETAILS' ,
        payload : data
    }
}

export const clearShapeDetails = () =>{
    return {
        type : "CLEAR_SHAPE_DETAILS"
    }
}

// map function 

export const saveMap = (data) =>{
    return {
        type : "SAVE_MAP" ,
        payload : data
    }
}

// here we are defining the function which will be used for showing and hididng the country code popup ;

export const showCountryCode = () =>{
    return {
        type : "SHOW_COUNTRY_CODE"
    }
}

export const updateCountryCode = (data) =>{
    return {
        type : "UPDATE_COUNTRY_CODE" ,
        payload : data 
    }
}

export const closeCountryCode = () =>{
    return {
        type : "CLOSE_COUNTRY_CODE"
    }
}

// here we are creating languge handler function ;

export const changeLanguage = (data) =>{
    return {
        type : "CHANGE_LANGUAGE" ,
        payload : data
    }
}

export const defualtLanguage = () =>{
    return {
        type : "DEFAULT_LANGUAGE"
    }
}

export const updateUserNumber = (data) =>{
    return {
        type : "UPDATE_USER_NUMBER" ,
        payload : data
    }
}

// here we are defining the function which will be used to update the geoJson and the kml data ;

export const updateGeoJson = (data) =>{
    return {
        type : 'UPDATE_GEOJSON' , 
        payload : data 
    }
}

export const updateKmlData = (data) =>{
    return {
        type : "UPDATE_KMLDATA" ,
        payload  : data
    }
}

export const clearGeojsonKmlData = () =>{
    return {
        type : "CLEAR_GEOJSON_KMLDATA"
    }
}

export const disableMapFlying = () =>{
    return {
        type : "DISABLE_MAP_FLYING"
    }
}

export const unableMapFly = () =>{
    return {
        type : "UNABLE_MAP_FLY"
    }
}

// here we are writing function for selected and the checked items ;

export const updateCheckedData = (data) =>{
    return {
        type : "UPDATE_CHECKED_DATA" ,
        payload : data
    }
}

export const updateSelectedData = (data)  => {
    return {
        type : "UPDATE_SELECTED_DATA" ,
        payload : data 
    }
}

export const clearAllCheckedItems = () =>{
    return {
        type : "CLEAR_All_CHECKED_ITEMS"
    }
}

export const updateSubcategories = (data) =>{
    return {
        type : "UPDATE_SUBCATEGORIES" ,
        payload : data
    }
}

export const updateCheckedCategory = (data) =>{
    return {
        type  : "UPDATE_CHECKED_CATEGORY",
        payload : data
    }
}

export const fullChecked = (data) =>{
    return {
        type : "FULL_CHECKED",
        payload : data
    }
}

export const updateCalculatedPoints = (data) =>{
    return {
        type : "UPDATE_CALCULATED_POINTS" ,
        payload : data 
    }
}

// here we are defining a function for guided tour ;

export const showGuidedTour = () =>{
    return {
        type : "SHOW_GUIDED_TOUR"
    }
}

export const hideGuidedTour = () =>{
    return {
        type : "HIDE_GUIDED_TOUR"
    }
}

export const openGuidedTour = () =>{
    return {
        type : "OPEN_GUIDED_TOUR"
    }
}

export const closeGuidedTour = () =>{
    return {
        type : "CLOSE_GUIDED_TOUR"
    }
}

export const openVideoSection = () =>{
    return {
        type : "OPEN_VIDEO_SECTION"
    }
}
             
export const closeVideoSection  = () =>{
    return {
        type : "CLOSE_VIDEO_SECTION"
    }
}

export const playVideo = (data) =>{
    return {
        type : "PLAY_VIDEO" ,
        payload : data
    }
}

export const closeVideo = () =>{
    return {
        type : "CLOSE_VIDEO"
    }
}

// here we are writig the function which will store the user email after the forget password  ;

export const  updateUserEmail = (data) =>{
    return {
        type : "UPDATE_USER_EMAIL",
        payload : data
    }
}

export const clearUserEmail = () =>{
    return {
        type :"CLEAR_USER_EMAIL"
    }
}

// here we are writing the function which will store the selected shape data to the store ;

export const updateSelectedShapeData = (data) =>{
    return {
        type : "UPDATE_SELECTED_SHAPE_DATA",
        payload : data
    }
}

export const clearSelectedShapeData = () =>{
    return {
        type :"CLEAR_SELECTED_SHAPE_DATA"
    }
}

// here we are defining the function which will update the poi marker data ;

export const updatePoiMarkerData = (data) =>{
    return {
        type : "UPDATE_POI_MARKER_DATA" ,
        payload : data
    }
}

export const clearPoiMarkerData  = () =>{
    return {
        type : "CLEAR_POI_MARKER_DATA"
    }
}

// here we are defining the function which will update the comparison screen details ;

export const updateComparisonDetails = (data) =>{
    return {
        type : "UPDATE_COMPARISON_DETAILS" ,
        payload : data
    }
}

export const clearComparisonDetails = () =>{
    return {
        type : "CLEAR_COMPARISON_DETAILS"
    }
}


// here we are writing the function for the cathement part ;

export const updateCatchmentData = (data) =>{
    return {
        type : "UPDATE_CATCHMENT_DATA" ,
        payload : data 
    }
}


export const clearCatchementData = () =>{
    return {
        type : "CLEAR_CATCHMENT_DATA"
    }
}

export const updateRadiusData = (data) =>{
    return {
        type : "UPDATE_RADIUS_DATA",
        payload : data
    }
}

export const clearRadiusData = () =>{
    return {
        type : "CLEAR_RADIUS_DATA"
    }
}

export const enableCatchment = () =>{
    return {
        type : 'ENABLE_CATCHMENT'
    }
}

export const disableCatchment = () =>{
    return {
        type : "DISABLE_CATCHMENT"
    }
}

export const showCatchmentResultScreen = (data) =>{
    return {
        type : "SHOW_CATCHMENT_RESULT_SCREEN",
        payload : data
    }
}

export const hideCatchmentResultScreen = () =>{
    return {
        type : "HIDE_CATCHMENT_RESULT_SCREEN"
    }
}

export const showCatchmentSaveFile = (data) =>{
    return {
        type : "SHOW_CATCHMENT_SAVE_FILE",
        payload : data
    }
}

export const hideCatchmentSaveFile = () =>{
    return {
        type : "HIDE_CATCHMENT_SAVE_FILE"
    }
}

export const updateSelectedCatchment = (data) =>{
    return {
        type : "UPDATE_SELECTED_CATCHMENT" ,
        payload : data
    }
}

export const clearSelectedCatchment = () =>{
    return {
        type : "CLEAR_SELECTED_CATCHMENT"
    }
}

export const showSelectedCatchmentOnmap = () =>{
    return {
        type : "SHOW_SELECTED_CATCHMENT_ONMAP"
    }
}

export const hideSelectedCatchmentOnmap = () =>{
    return {
        type : "HIDE_SELECTED_CATCHMENT_ONMAP"
    }
}

// here we are adding the function to the comparison screen ;

export const showCatchment = () =>{
    return {
        type : "SHOW_CATCHMENT"
    }
}

export const showOthers = () =>{
    return {
        type : "SHOW_OTHERS"
    }
}

// here we adding the function which will toggle the poiDetails ;

export const showPoiDetails = () =>{
    return {
        type : "SHOW_POI_DETAILS"
    }
}

export const hidePoiDetails = () =>{
    return {
        type : "HIDE_POI_DETAILS"
    }
}

// here we are writing the function for storing shapes name ;

export const updateShapesName = (data) =>{
    return {
        type : "UPDATE_SHAPES_NAME" ,
        payload : data
    }
}

export const clearShapesName = () =>{
    return {
        type : "CLEAR_SHAPES_NAME"
    }
}

// here we are writing the function for the load shpaes;

export const showLoadShapes = () =>{
    return {
        type : "SHOW_LOAD_SHAPES"
    }
}

export const hideLoadShapes = () =>{
    return {
        type : "HIDE_LOAD_SHAPES"
    }
}

// here we are defining thee function to toggle feedbac screen ;

export const showFeedback = () =>{
    return {
        type : "SHOW_FEEDBACK"
    }
}

export const hideFeedback = () =>{
    return {
        type : "HIDE_FEEDBACK"
    }
}

// updating the url ;

export const updateUrl = () =>{
    return {
        type : "UPDATE_URL"
    }
}

export const showWithInBoundary = () =>{
    return {
        type : "SHOW_WITHIN_BOUNDARY"
    }
}


export const showWithInShape = () =>{
    return {
        type : "SHOW_WITHIN_SHAPES"
    }
}

// all created shapes record function ;

export const updatePolygonArray = (data) =>{
    return {
        type : "UPDATE_POLYGON_ARRAY" ,
        payload : data
    }
}

export const updateRectangleArray = (data) => {
    return  {
        type : "UPDATE_RECTANGLE_ARRAY" ,
        payload : data
    }
}

export const updateCircleArray = (data) =>{
    return {
        type : "UPDATE_CIRCLE_ARRAY" ,
        payload : data
    }
}

export const updateRadiusBasedMarker = (data) =>{
    return {
        type : "UPDATE_RADIUS_BASED_MARKER" ,
        payload : data
    }
}

export const updateRoadBasedMarker = (data) => {
    return {
        type : "UPDATE_ROAD_BASED_MARKER" , 
        payload : data
    }
}

export const updateMarkerArray = (data) =>{
    return {
        type : "UPDATE_MARKER_ARRAY" ,
        payload : data 
    }
}

export const updateRemoveCircleShapeName = (data) =>{
    return {
        type : "UPDATE_REMOVE_CIRCLE_SHAPE_NAME" ,
        payload : data
    }
}

export const updateRemovePolygonShapeName = (data) => {
   
    return {
        type : "UPDATE_REMOVE_POLYGON_SHAPE_NAME" , 
        payload : data
    }
}

export const updateRemoveRectangleShapeName = (data) =>{
    return {
        type : "UPDATE_REMOVE_RECTANGLE_SHAPE_NAME" ,
        payload : data
    }
}

export const updateRemoveRadiusBasedName = (data) =>{
    return {
        type : "UPDATE_REMOVE_RADIUS_BASED_NAME",
        payload : data
    }
}

export const updateRemoveRoadBasedName = (data) =>{
    return {
        type : "UPDATE_REMOVE_ROAD_BASED_NAME" ,
        payload : data
    }
}

export const clearAllShapesRecord = () =>{
    return {
        type : "CLEAR_ALLSHAPES_RECORD"
    }
}

// here we are writing all the functions for removing all the poi's ;

export const removeAllPoiFromMap = () =>{
    return {
        type : "REMOVE_ALL_POI_FROM_MAP"
    }
}