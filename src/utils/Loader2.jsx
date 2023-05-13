// This is the second loader ;

import React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import "./loader.css"

const Loader2 = () =>{
    return(<>
    <div className="loader2">
     <Backdrop
     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
     open={true}
     
 
>
  {/* <CircularProgress color="inherit" /> */}
  <div class="lds-spinner2">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
</Backdrop>
     </div>
    </>)
}

export default Loader2 ;