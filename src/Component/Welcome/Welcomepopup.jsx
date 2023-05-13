// In this page the first welcome popup will be designed which will appear on opening the screen ;

import React, { useEffect, useState } from 'react';
import "./WelcomePopup.css";
import { Modal } from 'react-bootstrap';
import Logo from "./WelcomeImages/Logo.svg";
import Cut from './WelcomeImages/cut.svg';
import Mainimg from "./WelcomeImages/welcomeimg.svg";
import WelcomeDrop from "./WelcomeDrop";
import imgHindi from "./WelcomeImages/welcomeHindi.svg"
import imgArabic from "./WelcomeImages/welcomeaArabic.svg";
import { useSelector  , useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation ,  } from 'react-i18next';
import { closeWelcome, showGuidedTour } from '../../actions';


const Welcomepopup = () => {
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    const [btn, setBtn] = useState(true);
    
    const closepopup = () => {
        setBtn(false)
    }
    const choosedLanguage = i18n.language;
    const [mainImg , setMainImg] = useState(Mainimg);

    useEffect(() =>{
         if(choosedLanguage == "ar"){
             setMainImg(imgArabic)
         }
         else if(choosedLanguage== "hn"){
             setMainImg(imgHindi)     
        }
        else if(choosedLanguage == "en"){
            setMainImg(Mainimg)
        }
    },[choosedLanguage])

    

   
    const api = useSelector((state) => state.apiStore.url);
    const state =  useSelector((state) => state.welcomeHandler.show);

    const moveForward = () =>{
        dispatch(showGuidedTour());
        dispatch(closeWelcome());
    }

    return (<>
        <Modal
            show={state}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="welcome">
                <div className="welcome_logo">
                    <img src={Logo} alt="logo icons" width="160px" />
                </div>

                <h6>{t('Opportunites All Around Us')}</h6>
                <div className="welcome_mainimg">
                    <img src={mainImg} alt="main img" />
                </div>
                <div className="welcome_button">
                    <WelcomeDrop />
                    <button className="welcome_btn" onClick={moveForward}>{t('Next')}</button>
                </div>

                <div className="welcome_cutbtn" onClick={() => dispatch(closeWelcome())}>
                    <img src={Cut} alt="cut icon" />
                </div>
            </div>
        </Modal>
    </>)
}

// exporting the file ;
export default Welcomepopup