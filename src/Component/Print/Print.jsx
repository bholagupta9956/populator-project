// here we are going to add the print option to thee map ;
import React , {useEffect, useRef ,} from "react";
import L from "leaflet"
import  {useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "./print.css"
import "leaflet-measure-path/leaflet-measure-path.css";
import "leaflet.browser.print/dist/leaflet.browser.print.js";
import "leaflet.browser.print/dist/leaflet.browser.print.min.js";



const Print = () => {
    const map = useMap();
    useEffect(() =>{
      var comp = new  L.control.browserPrint({position : "bottomright"});
      comp.addTo(map)
    },[])
    
  return (
    <>
      <div className="print">
        
      </div>
    </>
  );
};

// exporting the component ;
export default Print;
