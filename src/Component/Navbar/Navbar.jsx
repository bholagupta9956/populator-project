// In this file we are going to desing the navbar of the project ;

import React, { useContext, useState } from 'react';
import "./Navbar.css";
import Loginicon from "./NavbarImages/login.svg";
import Logo from './NavbarImages/Logo.svg';
import Doublearrow from "./NavbarImages/doublearrow.png"
import WelcomeDrop from "../Welcome/WelcomeDrop"
import SearchBar from "./SearchBar";
import User from "./UserProfile/User";
import { useDispatch } from 'react-redux';
import { showLoginPopup, updateUrl } from '../../actions';
import { useMap } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


const Navbar = (props) => { 

    const {t ,i18n} = useTranslation();
    const dispatch = useDispatch()
    const mystate = useSelector((state) => state.authenication.showUser);
    const api = useSelector((state) => state.apiStore.url);
    // adding  animation to the navbar so that it can slide up and down 
    
    const [navslide, setNavslide] = useState("0px");
    const [rotation, setRotation] = useState("0deg")
    const closenav = () => {
        if (navslide === "0px") {
            setNavslide("-66px")
            setRotation("180deg")
        }
        else if (navslide === "-66px") {
            setNavslide("0px")
            setRotation("0deg")
        }
        props.sliding()
       
    }
    const navslider = {
        transition: "0.3s",
        marginTop: navslide
    }

    // adding style to the doublearrow of the homepage ;
    
    const arrowrotation = {
        transition: "0.3s",
        transform: `rotate(${rotation})`
    }
    

    return (<>
        <div className="navbars">
            <div className="navbar_container1" style={navslider}>
                <div className="navbar_container_left">
                    <div className="navbar_container_left_col1">
                        <img src={Logo} alt="logo.icons" width="150px" onClick={() => dispatch(updateUrl())}/>
                    </div>
                    <SearchBar/>
                </div>

                <div className="navbar_container_right">

                <div className="navbar_language" style={navslider}>
                    <WelcomeDrop />
                </div>

                    <div className="navbar_right_col3">
                        { mystate  ?
                        <div className="navbar_right_col3_login" onClick={() => dispatch(showLoginPopup())}>
                            <img src={Loginicon} alt="login icon" />
                            <h6>{t("Login/Signup")}</h6>
                        </div> : 
                          <User /> }
                    </div>
                </div>
            </div>

            {/* here we are using doublearrow button for sliding navbar up and down */}

            <div className="openclosenavbar"  style={arrowrotation}  onClick = {closenav}>
                <img src={Doublearrow} alt="double arrow" width="25px" />
            </div>

             
        </div>
    </>)
}


// exporting the navbar file ;
export default Navbar;


