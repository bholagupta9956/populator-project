// This is the component which will show you a model by which the user can select the guided tour or the video tutorial options ;

import React from "react";
import { Modal } from "react-bootstrap";
import Guide from "./Images/guide.svg";
import Cut from './Images/cut.svg'
import Video from "./Images/video.svg";
import Arrow from "./Images/whitearow.png"
import { useTranslation } from "react-i18next";
import "./tour.css";
import {useSelector , useDispatch} from "react-redux"
import { hideGuidedTour, openGuidedTour, openVideoSection, showNotification } from "../../actions";

const GuidedTour = () =>{
    const dispatch = useDispatch();
    const myState = useSelector((state) => state.guidedTour.show);

    const openTour = () =>{
        dispatch(openGuidedTour())
        dispatch(hideGuidedTour())
    }

    const openVideo = () =>{
        dispatch(hideGuidedTour())
        dispatch(openVideoSection())
        
    }

    const {t , i18n} = useTranslation();
    
    return (<>
    <Modal
            show={myState}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="control_container">
                <div className="guided_tour">
                    <h4>{t("Populator How it works?")}</h4>
                    <div className="guided_box_container">
                        <div className="guide_box" onClick={openTour}>
                            <div>
                            <img src={Guide} alt="guided img" />
                            </div>
                            <h6>{t("Do a quick tour")}</h6>
                            
                        </div>
                        <div className="guide_box" onClick = {openVideo}>
                            <div>
                            <img src={Video} alt="video img" />
                            </div>
                            <h6>{t("Watch videos")}</h6>
                            
                        </div>
                    </div>
                    <div className="cut_options" onClick = {() => dispatch(hideGuidedTour())}>
                        <img src={Cut} alt="cut options" />
                    </div>

                    
                </div>
            </Modal>
    </>)
}


// exporting the component ;
export default GuidedTour ;
