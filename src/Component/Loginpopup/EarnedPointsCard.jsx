// here we will design the earned points card which will be imported into the earnedpoints component ;

import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./Login.css";
import {useTranslation} from "react-i18next"

const EarnedPointsCard = () => {
    const {t,i18n} = useTranslation();
  return (
    <>
      <Carousel itemsToShow={2}  className = "carousel_container" enableAutoPlay>
        <Item>
            <div className="carousel_item">
                <span>{t("How It Works")}</span>
                <p>{t("para1")}</p>
            </div>
        </Item>
        <Item>
            <div className="carousel_item">
                <span>{t("How To Purchase Points")}</span>
                <p>{t('para2')}</p>
            </div>
        </Item>
        <Item>
            <div className="carousel_item">
                <span>{t("How It Works")}</span>
                <p>{t("para1")}</p>
            </div>
        </Item>
        <Item>
        <div className="carousel_item">
                <span>{t("How To Purchase Points")}</span>
                <p>{t("para2")}</p>
            </div>
        </Item>
        <Item>
            <div className="carousel_item">
                <span>{t("How It Works")}</span>
                <p>{t("para1")}</p>
            </div>
        </Item>
        <Item>
        <div className="carousel_item">
                <span>{t("How To Purchase Points")}</span>
                <p>{t("para2")}</p>
            </div>
        </Item>
      </Carousel>
    </>
  );
};

// exporting the card ;
export default EarnedPointsCard;


