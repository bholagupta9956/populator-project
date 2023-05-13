// In this file we are going to create layers dropdown ; to select different layers ;

import React, { useContext }  from 'react';
import { Dropdown, } from "react-bootstrap";
import Layers from './NavbarImages/layers.svg';
import "./Navbar.css";
import {Layerdata} from '../Main';

const LayerDropDown = () => {

    const layervalue = useContext(Layerdata);
    const changeLayer = (e) =>{
        layervalue.updateLayerType(e.target.value)
    }
    
    return (<>
    
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <div className="secondnav_col1_layers" >
                    <img src={Layers} alt="layer icons" />
                    <span>Layers</span>
                </div>

            </Dropdown.Toggle>

            <Dropdown.Menu>
               <div style={{background: "white" , marginTop: "5px"}}>
                    <Dropdown.Item href="#/action-1">
                        <input type="radio" name="layers" id="street" defaultChecked  value="street" onChange={changeLayer}/>
                        <label htmlFor="street">Streets View </label>

                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2" >
                        <input type="radio" name="layers" id="satellite" value="satellite" onChange={changeLayer}/>
                        <label htmlFor="satellite">Satellite Hybrid </label>

                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        <input type="radio" name="layers" id="topographique" value="topographique" onChange={changeLayer}/>
                        <label htmlFor="topographique">Topographique </label>

                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-4">
                        <input type="radio" name="layers" id="outdoor" value="outdoor" onChange={changeLayer}/>
                        <label htmlFor="outdoor">Outdoor View </label>

                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-5">
                        <input type="radio" name="layers" id="pastel" value="pastel" onChange={changeLayer}/>
                        <label htmlFor="pastel">Pastel View </label>
                    </Dropdown.Item>
                    </div>
            </Dropdown.Menu>
            
          
        </Dropdown>
       
    </>)
}

export default LayerDropDown;
