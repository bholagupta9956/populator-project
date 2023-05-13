// here we are  going to add  the youtube video  ;

import React from "react";
import Cut from "./Images/cut.svg"
import { Modal } from "react-bootstrap";
import YouTube from 'react-youtube';
import { useSelector ,useDispatch } from "react-redux";
import { closeVideo , openVideoSection } from "../../actions";
import Arrow from "./Images/whitearow.png";

const Youtube = () => {
    const opts = {
        height: '400',
        width: '660',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const onReady = () =>{

      }

      const myState = useSelector((state) => state.guidedTour.play);
      const dispatch = useDispatch();
      const videoId = useSelector((state) => state.guidedTour.videoId);

      const goBack = () =>{
        dispatch(closeVideo())
        dispatch(openVideoSection())
      }
    
  
  return (
    <>
      <Modal
        show={myState}
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <div className="youtube">
        <YouTube videoId={videoId} opts={opts} onReady={onReady} className="youtube_video" />
        <div className="cut_options" onClick = {() => dispatch(closeVideo())}>
                <img src={Cut} alt="" />
            </div>
            <div className="backbtn" onClick = {goBack}>
           <img src={Arrow} alt="" />
        </div>
        </div>

       
      </Modal>
    </>
  );
};

// exporting the component ;
export default Youtube;
