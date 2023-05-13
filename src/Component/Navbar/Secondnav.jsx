// // This is the second component component of the homepage here all the shapes and control panel will defined ;

// import React, { useState } from 'react';
// import Printer from "./NavbarImages/printer.svg";
// import Refresh from "./NavbarImages/refresh.svg";
// import Plus from "./NavbarImages/plus.svg"
// import Subtract from "./NavbarImages/subtract.svg";
// import World from "./NavbarImages/world.svg";
// import LayerDropDown from "./LayerDropDown";
// import Control from "../ControlPanel/Control"
// import { useSelector , useDispatch } from 'react-redux';
// import { openControlPanel , closeControlpanel } from '../../actions';

// import "./Navbar.css";

// const Secondnav = () =>{

//     const [icon , setIcon] = useState(Plus)
//     const [show , setShow] = useState("none")

//     const dispatch = useDispatch()
//     // here we are defining function of the toogle in homepage;
//     const toogleside = () =>{
//        if(icon === Plus){
//            setIcon(Subtract)
//            setShow("flex")
//        }
//        else if(icon === Subtract){
//            setIcon(Plus)
//            setShow("none")
//        }
//     }
//     const showhide = {
//         display : show 
//     }
//     const Token = useSelector((state) => state.authenication.token)

//     // handling hide and show control panel ;
//     const [showPanel , setShowPanel] = useState(false)
//     const showControlPanel = () =>{
//         if(Token){
//             dispatch(openControlPanel())
           
//         }
//     }

//     const hidePanel = () =>{
//         dispatch(closeControlpanel())
        
//     }
    
//     const printScreen = () =>{
//         window.print();
//     }

//     return(<>
//         <div className="secondnav" >
//            <div className="secondnav_col1" style={showhide} >
//                <div className="secondnav_col1_layers">
//                    <LayerDropDown/>
//                </div>
//                <div className="secondnav_col1_print" onClick={printScreen} >
//                    <img src={Printer} alt="print icon"/>
//                    <span>Print</span>
//                </div>
              
//                <div className="secondnav_col1_refresh">
//                    <img src={Refresh} alt="refresh icons" width
//                    ="15px"/>
//                    <span>Refresh</span>
//                </div>
               
               
//            </div>

//             {/* here we are adding second column */}

//             <div className="secondnav_col2" onClick={toogleside}>
//                 <img src={icon} alt="minus icon" name="subtract" />
//             </div>
//             <div className="secondnav_col3" onClick={showControlPanel}>
//                 <img src={World} alt="world icon" width="19px" />
//                 <span>Find Opportunities</span>
//             </div>
          
//         </div>

//         {/* here we are adding the control panel  which will be controlled by the find opportunities button*/}
//         <Control value = {showPanel} hideControlPanel = {hidePanel} />
//     </>)
// }

// // exporting the second file ;
// export default Secondnav ;



