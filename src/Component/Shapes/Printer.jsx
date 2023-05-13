import React from "react";
import L from "leaflet";
import {useMap } from "react-leaflet";
import FileSaver from "file-saver";
import 'leaflet'// import script after leaflet
import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter'
import 'leaflet-simple-map-screenshoter'
import PrinterIcons from "../mainimages/printer.svg";

import 'leaflet'
// import script after leaflet
import 'leaflet-simple-map-screenshoter'

const PrinterComponent = () =>{
   const map = useMap()

   let pluginOptions = {
      cropImageByInnerWH: true, // crop blank opacity from image borders
      hidden: false, // hide screen icon
      preventDownload: false, // prevent download on button click
      domtoimageOptions: {}, // see options for dom-to-image
      position: 'topleft', // position of take screen icon
      screenName: 'screen', // string or function
      iconUrl: PrinterIcons, // screen btn icon base64 or url
      hideElementsWithSelectors: ['.leaflet-control-container'], // by default hide map controls All els must be child of _map._container
      mimeType: 'image/png', // used if format == image,
      caption: null, // string or function, added caption to bottom of screen
      captionFontSize: 15,
      captionFont: 'Arial',
      captionColor: 'black',
      captionBgColor: 'white',
      captionOffset: 5,
      // callback for manually edit map if have warn: "May be map size very big on that zoom level, we have error"
      // and screenshot not created
      onPixelDataFail: async function({ node, plugin, error, mapPane, domtoimageOptions }) {
          // Solutions:
          // decrease size of map
          // or decrease zoom level
          // or remove elements with big distanses
          // and after that return image in Promise - plugin._getPixelDataOfNormalMap
          return plugin._getPixelDataOfNormalMap(domtoimageOptions)
      }
   } 
   
   const takescreenshot = () =>{
      alert("you have done")
    const simpleMapScreenshoter = SimpleMapScreenshoter(pluginOptions).addTo(map)
   let format = 'blob' // 'image' - return base64, 'canvas' - return canvas
   let overridedPluginOptions = {
     mimeType: 'image/jpeg'
   }
   simpleMapScreenshoter.takeScreen(format, overridedPluginOptions).then(blob => {
      alert('done')
     // FileSaver.saveAs(blob, 'screen.png')
   }).catch(e => {
      console.error(e)
   })
   }

return(<>
      {/* <div style={{ position : "absolute" ,zIndex : 1001 , backgroundColor : "red" , top : "123px" , right : "222px"  , width : "100px" }}  onClick = {takescreenshot}>
         <h3>printer</h3>
      </div> */}
</>)
}

export default PrinterComponent ;