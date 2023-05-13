// Here we are going to create refer and earn screen ;

import React , {useState} from "react";
import "./refer.css";
import { Modal } from "react-bootstrap";
import Mainimage from "./referImages/refer&earn.svg";
import Cluster from "./referImages/cluster.svg";
import Facebook from "./referImages/facebook.svg";
import Linkedin from "./referImages/linkedin.svg";
import Whatsapp from "./referImages/whatsapp.svg";
import Gmail from "./referImages/email.svg";
import Cut from "./referImages/cut.svg";
import { useTranslation } from "react-i18next";
import { cutProfileScreen } from "../../../../actions";
import { useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareButton,
} from "react-share";
import Twitter from "../UserImages/twitter.svg";
import { useSelector } from "react-redux";

const ReferEarn = ({ cutPanel }) => {
  const userData = useSelector((state) => state.userInfoData.data);
  const secretCode = userData.code;
  
  const [textCopied , setTextCopied] = useState(false);
  const copyLink = () =>{
    setTextCopied(true)
  }

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  return (
    <>
      <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="referearn">
          <div className="referearn_left">
            <h3>{t("Refer & Earn")}</h3>
            <img src={Mainimage} alt="refer and earn icon" />
          </div>
          <div className="referearn_right">
            <div className="referearn_right_img">
              <img src={Cluster} alt="cluster icon" />
            </div>
            <div className="referearn_right_code">
              <h2>{secretCode}</h2>
            </div>
            <div className="referearn_right_text">
              <h6>
                {t("share your code to your friend and get bonus points")}
              </h6>
              <span>{t("or")}</span>
            </div>
            <CopyToClipboard
              text={`https://pop.skyviewhero.com/?code=${secretCode}`}
              onCopy={copyLink}
              title={textCopied ? "Copied" : "Copy"}
            >
              <button>{t("Invite")}</button>
            </CopyToClipboard>
            <div className="referearn_right_socialmedia">
              <FacebookShareButton
                size="23"
                url={`https://pop.skyviewhero.com/?code=${secretCode}`}
              >
                <img
                  src={Facebook}
                  alt="facebook icon"
                  width="56px"
                  height="56px"
                />
              </FacebookShareButton>

              <TwitterShareButton
                url={`https://pop.skyviewhero.com/?code=${secretCode}`}
              >
                <img
                  src={Twitter}
                  alt="Twitter icon"
                  width="44px"
                  height="44px"
                />
              </TwitterShareButton>

              <LinkedinShareButton
                url={`https://pop.skyviewhero.com/?code=${secretCode}`}
              >
                <img
                  src={Linkedin}
                  alt="linkedin icon"
                  width="41px"
                  height="41px"
                />
              </LinkedinShareButton>
              <WhatsappShareButton
                url={`https://pop.skyviewhero.com/?code=${secretCode}`}
              >
                <img
                  src={Whatsapp}
                  alt="linkedin icon"
                  width="48px"
                  height="48px"
                />
              </WhatsappShareButton>
            </div>
          </div>
          {/* here we are adding cut options */}
          <div
            className="referearn_cut"
            onClick={() => dispatch(cutProfileScreen())}
          >
            <img src={Cut} alt="cut icon" />
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the file ;
export default ReferEarn;
