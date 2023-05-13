// here we are going to design  a screen which will show the rewarded points ;

import React from "react";
import { Modal } from "react-bootstrap";
import Trophy from "./LoginImages/trophy.svg";
import EarnedPointsCard from "./EarnedPointsCard";
import Cut from "./LoginImages/cut.svg";
import { useTranslation } from "react-i18next";
import {useDispatch , useSelector} from "react-redux";
import { cutAuthenication } from "../../actions";

const EarnedPoints = () => {
  const dispatch = useDispatch()
  const {t , i18n} = useTranslation();

  const Balance = useSelector((state) => state.userInfoData.userBalance)

  return (
    <>
        <Modal
          show={true}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
            <div className="earnedPoints">
                <div className="earnedPoints_img">
                    <img src={Trophy} alt="trophy icon" />
                </div>
                <h3 className = "earnedPoints_heading">{t("Congratulations")}</h3>
                <h3 className = "earnedPoints_text">{t("You Received")} <span style = {{color : "var(--blue)"}}>{Balance} Points</span></h3>

                 {/* here we are adding scrollable card  */}
            <div className="earnedPoints_card">
                <EarnedPointsCard />
            </div>

            {/* adding cut option to the panel */}
            <div className="earnedPoint_cut" onClick={() =>dispatch(cutAuthenication()) }>
                <img src={Cut} alt="cut icon" />
            </div>

        </div>

           
        </Modal>
      
    </>
  );
};

// exporting the component ;
export default EarnedPoints;
