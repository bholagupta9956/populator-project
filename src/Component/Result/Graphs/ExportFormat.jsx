// This is the export format ;
import React from "react" ;
import Pdf from "../ResultImages/pdf.svg";
import PowerPoint from "../ResultImages/powerpoint.svg"
import Image from "../ResultImages/image.svg"
import {  Modal } from 'react-bootstrap';
import Cut from "../ResultImages/cut.svg";
import Pptxfile from "./Pptx/Pptxfile";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../actions";
import { useState } from "react";


const ExportFormat  = (props) =>{

    const  dispatch = useDispatch();
    const [startDownload ,setStartDownload] = useState(false)
   
    return (<>
     
        <div className="exportFormat">
           <div className="exportpdf" onClick = {props.downalodPdf}>
               <img src={Pdf} alt="pdf" />
               <span>PDF</span>
           </div>
           <div className="exportpdf" onClick={props.downloadPptx}>
               <img src={PowerPoint} alt="pdf" />
               <span>PowerPoint</span>
           </div>
           <div className="exportpdf" onClick={props.downloadImage}>
               <img src={Image} alt="pdf" />
               <span>Image</span>
           </div>
           <div className="cutOption" onClick = {props.cut}>
               <img src={Cut} alt="cut option" />
           </div>


          
        </div>
       
    </>)
}

// exporting the component ;
export default ExportFormat ;
