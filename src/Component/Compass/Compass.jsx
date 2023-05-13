// here we are adding the compass ;
import React , {useEffect} from "react";
import {useMap} from "react-leaflet"
import L from "leaflet";
import "./compass.css"

import "leaflet-compass/dist/leaflet-compass.min.js"
import "leaflet-compass/dist/leaflet-compass.src.js"
import "leaflet-compass/dist/leaflet-compass.src.css"
import "leaflet-compass/dist/leaflet-compass.min.css"
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";

const Compasses = () =>{
    const map = useMap();
   useEffect(() =>{
    var comp = new L.Control.Compass({autoActive: true, showDigit:true , position : 'bottomright' ,});
	map.addControl(comp);
   },[])
    
    
    return(<>
        
    </>)
}

// exporting the compass ;
export default Compasses ;