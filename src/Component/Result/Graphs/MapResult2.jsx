// In this file we will desing the map which will be shown on the half part of the result screen ;

import React , {useState , useEffect} from "react";
import {MapContainer , Circle , Polygon , Marker , TileLayer , ZoomControl ,useMap} from "react-leaflet"
import {useSelector} from "react-redux";
import "../Result.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import {useTranslation} from "react-i18next";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";

const MapResult2 = () =>{

    const map = useMap();
    const zoom = map._zoom - 1;
    const urllink =  "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=qXyFgVsh7Jlg17o3rAGi";

    const attribution =   '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributed by skyview';

    // const position = [51.51, -0.12]
    // const [position ,setPosition ] = useState([51.51 , -0.12])

    const mapData = useSelector((state) => state.updateShapeData.rawData);
    const position = mapData.coords.center;
    
    //const [position , setPosition] = useState(mapData.center)

    const [polygon , setPolygon] = useState([]);
    const [circle , setCircle] = useState({
        center : [0,0] ,
        radius : null
    })

    const {t , i18n} = useTranslation();
   
  
    useEffect(() =>{
        if(mapData.shape === "polygon"){
            setPolygon([mapData.coords.coord])
       }
       else if (mapData.shape === "rectangle"){
           setPolygon([mapData.coords.coord])
       }
       else if(mapData.shape === "circle"){
            
            setCircle({
                center : mapData.coords.center ,
                radius : mapData.coords.radius
            })
       }
   
    },[])
   
    return(<>
        <div className = "mapResult2">
            <MapContainer
            className = "mapResultView2"
            center = {position}
            zoom = {zoom}
            zoomControl = {false}>
                 <TileLayer
                url='http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'
                subdomains= {['mt0', 'mt1', 'mt2', 'mt3']}
              />

              {/* here we are adding the shapes which are created at the main map */}

              <Polygon
              showMeasurements={true}
              positions={polygon}
              pathOptions={{ color: "red" }} />

             <Circle center = {circle.center} radius={circle.radius} showMeasurements = {true} pathOptions = {{color : "red"}}/>

            </MapContainer>
        </div>
    </>)
}

// exporting the results ;
export default MapResult2 ;

