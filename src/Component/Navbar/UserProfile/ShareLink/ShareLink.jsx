// here we are going to create a drawer which will open from the bottom ;
// And this component will be used to share the populator link ;

import React, { useState, useEffect } from "react";
import "./sharelink.css";
import Facebook from "../refer&earn/referImages/facebook.svg";
import Whatsapp from "../refer&earn/referImages/whatsapp.svg";
import Linkedin from "../refer&earn/referImages/linkedin.svg";
import Twitter from "../UserImages/twitter.svg";
import Cut from "../refer&earn/referImages/cut.svg";
import { useSelector } from "react-redux";
import createShapesRecord from "../../../../reducers/createdShapeRecord";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import {
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from "react-share";
import { useTranslation } from "react-i18next";
import Loader from "../../../../utils/Loader";
import { cutProfileScreen } from "../../../../actions";
import { useDispatch } from "react-redux";

const ShareLink = () => {
  const dispatch = useDispatch();
  // here we are getting the created shape data from the store so that it could send through the link icons on social media ;

  const shapeData = useSelector((state) => state.createShapesRecord);

  const orgData = JSON.stringify(shapeData);
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);

  const [textCopied, setTextCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const copyLink = () => {
    setTextCopied(true);
  };
  const [sentUrl, setSentUrl] = useState();

  useEffect(() => {

    setLoading(true);
    const url = `${api}base-url`;

    axios.post(url, { data: orgData })
    .then((res) => {
      setLoading(false);
      console.log(res, "this is the rs sended by the api");
      if (res.data.success) {
        const secretCode = res.data.data.url_code;
        
        const baseUrl = `https://populator.co/?secretCode=${secretCode}`;
        // const baseUrl = `http://localhost:3000/?secretCode=${secretCode}`;

        setSentUrl(baseUrl);
      }
    })
    .catch((err) =>{
      setLoading(false);
      console.log(err)
      dispatch(cutProfileScreen());
    })

    
  }, [shapeData]);

  return (
    <>
      <div className="sharelink">
        <div className="sharelink_container">
          <h4 className="sharelink_title">{t("Share This Map")}</h4>
          <h3 className="sharelink_text">{t("Choose Where To Share")}</h3>

          <div className="sharelink_icons">
            <FacebookShareButton size="23" url={sentUrl}>
              <img
                src={Facebook}
                alt="facebook icon"
                width="56px"
                height="56px"
              />
            </FacebookShareButton>

            <TwitterShareButton url={sentUrl}>
              <img
                src={Twitter}
                alt="Twitter icon"
                width="44px"
                height="44px"
              />
            </TwitterShareButton>

            <LinkedinShareButton url={sentUrl}>
              <img
                src={Linkedin}
                alt="linkedin icon"
                width="41px"
                height="41px"
              />
            </LinkedinShareButton>
            <WhatsappShareButton url={sentUrl}>
              <img
                src={Whatsapp}
                alt="linkedin icon"
                width="48px"
                height="48px"
              />
            </WhatsappShareButton>
          </div>

          <div className="sharelink_or">
            <span></span>
            <h6>{t("Or")}</h6>
            <span></span>
          </div>

          <div className="sharelink_link">
            <span>{sentUrl}</span>
          </div>

          <CopyToClipboard
            text={`${sentUrl}`}
            onCopy={copyLink}
            title={textCopied ? "Copied" : "Copy"}
          >
            <button className="sharelink_verify">{t("Copy Link")}</button>
          </CopyToClipboard>

          <div
            className="sharelink_cut"
            onClick={() => dispatch(cutProfileScreen())}
          >
            <img src={Cut} alt="cut icon" />
          </div>
        </div>

        {/* here we are adding the loader to the share screen ; */}
        {loading && <Loader />}
      </div>
    </>
  );
};

// exporting  the file ;
export default ShareLink;
