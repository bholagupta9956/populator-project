// In this file we are going to create the layers in a custom way ;

import React , {useState , useRef} from "react";
import "./shapes.css";
import { useTranslation } from "react-i18next";
import L from "leaflet"
import { LayersControl , TileLayer  , useMap } from "react-leaflet";
import { useEffect } from "react";

const random = Math.ceil(Math.random()*23534);

const LayersControler = () =>{

    const basics =
    "https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=qXyFgVsh7Jlg17o3rAGi";

    const new_layer = "https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=qXyFgVsh7Jlg17o3rAGi"

   const openstreet = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributed by skyview';
    const newlayers = "http://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}"

    // taking reference ;
    const key = `AIzaSyBd3k-GLkRUKVg_l-90CAScVYa6n94qXLw&hl=en`;

    const {t ,i18n} = useTranslation();
    const choosedLanguage = i18n.language;

    const [layers , setLayers] = useState({
      street : t("Google Street") ,
      hybrid : t("Google hybrid") ,
      traffic : t("Google traffic") ,
      outdoor : t("OutDoor layers") ,
      openStreet : t("openStreet Layers") ,
      satellite : t("satellite Layers")
    })

  
    return(<>
        <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name={layers.street}>
            <TileLayer
                url='http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'
                subdomains= {['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name={layers.hybrid}>
              <TileLayer
                url='http://{s}.google.com/vt/lyrs=s,h&hl=en&x={x}&y={y}&z={z}'
                subdomains= {['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name={layers.traffic}>
            <TileLayer
                url='https://{s}.google.com/vt/lyrs=m@121,traffic|vm:1&hl=en&opts=r&x={x}&y={y}&z={z}'
                subdomains= {['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name={layers.outdoor}>
            <TileLayer

             attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/outdoor/256/{z}/{x}/{y}.png?key=qXyFgVsh7Jlg17o3rAGi"
               
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name={layers.openStreet}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                 url = "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=qXyFgVsh7Jlg17o3rAGi"
                  /> 
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name={layers.satellite}>
            <TileLayer
                url='http://{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
                subdomains= {['mt0', 'mt1', 'mt2', 'mt3']}
              />
            </LayersControl.BaseLayer>
           
          </LayersControl>
         
    </>)
}

// exporting the layers file ;
export default LayersControler ;

