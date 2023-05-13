// here we are creating minimap to use in the original map ;

import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "./Minimap.css";
import L from "leaflet";
import "leaflet-minimap/dist/Control.MiniMap.min.css";
import MiniMap from "leaflet-minimap";

const Minimap = () => {
  const map = useMap();
  
 
  const streetlayer =  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

  const [state , setState] = useState({
    toggleDisplay : true
  })

 
  var minimap ;

  useEffect(() =>{
    minimap = new MiniMap(streetlayer, {  toggleDisplay : true , minimized : true  ,collapsedWidth : 30 , collapsedHeight : 30 ,zoomAnimation : true ,  autoToggleDisplay: false,});
    minimap._addToggleButton()
    minimap.addTo(map)
  },[])
  
 
  
  return null ;
};

//exporting the minimap ;
export default Minimap;
