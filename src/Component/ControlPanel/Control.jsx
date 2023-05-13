// The is the control component here all the panel will be controlled ;

import React, { useEffect, useState } from 'react';
import Panel1 from "./Panel1";
import Panel2 from "./Panel2";
import Panel3 from "./Panel3";
import SelectedFeatures from './SelectedFeatures';
import Cut from "./ControlImages/cut.svg";
import { Modal } from "react-bootstrap";
import './ControlPanel.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hideControl } from '../../actions';

const Control = (props) => {

    const myState = useSelector((state) => state.findOpportunities.showPanel)
    const visual = useSelector((state) => state.toggleAllPanel.togglePanel)
    const api = useSelector((state) => state.apiStore.url);

    const dispatch = useDispatch() ;

    
    const [panels , setPanels] = useState(<Panel1/>)
   
    

    // this is the function which is used to show the panel inside the model ;

    useEffect(() =>{
        if(myState === "FirstPanel"){
            setPanels(<Panel1/>)
        }
        else if(myState === "SecondPanel"){
            setPanels(<Panel2/>)
        }
        else if(myState === "ThirdPanel"){
            setPanels(<Panel3/>)
        }
       
    },[myState])
    
    
    
    return (<>
        <Modal
            show={visual}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="control_container">

            <div className="control">
                {panels}
                <div className="cut_option" onClick={() => dispatch(hideControl(0))}>
                    <img src={Cut} alt="Cut icon" />
                </div>
            </div>

        </Modal>
    </>)
}

// exporing the control component ;
export default Control;
