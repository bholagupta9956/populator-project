// here We are going to add the videos part to the project ;
import React, { useState, useeffect, useEffect } from "react";
import "./tour.css";
import Video1 from "./Images/video1.png";
import Check from "./Images/check.png";
import Video2 from "./Images/video2.png";
import { Modal } from "react-bootstrap";
import Arrow from "./Images/leftarrow.png"
import { useTranslation } from "react-i18next";
import Video3 from "./Images/video3.png";
import { useSelector, useDispatch } from "react-redux";
import Cut from "./Images/cut.svg";
import { closeVideoSection, playVideo, showGuidedTour } from "../../actions";
import axios from "axios";

const Videos = () => {
  const myState = useSelector((state) => state.guidedTour.video);
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { t, i18n } = useTranslation();
  const choosedLanguage = i18n.language;

  const playvideo = (id) => {
    dispatch(playVideo(id));
    dispatch(closeVideoSection());
  };

  const urlLink = `${api}youTube-video`;
  useEffect(() => {
    axios
      .get(urlLink, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
          "X-localization": choosedLanguage,
        },
      })
      .then((res) => {
        console.log(res)
        setLoading(false);
        
        if (res.data.success) {
          setData(res.data.video);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [choosedLanguage]);


  const goBack = () =>{
    dispatch(closeVideoSection())
    dispatch(showGuidedTour())
  }

  return (
    <>
      <Modal
        show={myState}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="videos">
          <h3>{t("")}</h3>
          <div className="video_parts">
            {data.map((item, index) => {
              return (
                <>
                  <div
                   key={index}
                    className="video_part"
                    onClick={() => playvideo(item.videoId)}
                   
                  >
                    <div className="video_box">
                      <div className="video_box_left">
                        <img src={item.fullimage} alt="video img" />
                      </div>
                      <div className="video_box_right">
                        <h5>{item.heading}</h5>
                        <p>{item.text}</p>
                        <div className="texts">
                          <span>{t("Populator")}</span>
                          <img src={Check} alt="check icons" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>

          {/* here  we are going to add the  cut options */}
          <div
            className="cut_options"
            onClick={() => dispatch(closeVideoSection())}
          >
            <img src={Cut} alt="cut options" />
          </div>

          <div className="backbtn" onClick={goBack}>
            <img src={Arrow} alt="arrrow icon" />
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default Videos;
