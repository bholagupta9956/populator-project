// In this file we are going to create a webTour ;
import React, { useState } from 'react';
import Tour from 'reactour';
import { useSelector , useDispatch  } from 'react-redux';
import { closeGuidedTour , showGuidedTour} from '../../actions';
import Flyer from "./Images/guide.png";
import { useTranslation } from 'react-i18next';




const WebTour = () =>{

  const stepStyle = {
    color: '#666',
    background: '#dff9fb'
  };

  const {t,i18n} = useTranslation();

  const steps = [
    {
      selector: '.navbar_container_left_col2',
      content: t("This is the search box where you can easily search  and navigate to a location . Search Box will display automatic suggestions related to your search."),
      style: stepStyle
    },
    {
      selector: '.navbar_language',
      content: t('You can change the language according to your preference through this selector.'),
      style: stepStyle
    },
    {
      selector: '.navbar_right_col3',
      content: t("Here, you can go through your profile , wallet , and many other features ."),
      style: stepStyle
    },
    {
      selector: '.secondnav_col3',
      content: t("From this box , you can search or check important landmarks nearby . It will show total number of landmarks present in the selected area"),
      style: stepStyle
    },
    {
      selector: '.leaflet-control-layers-toggle',
      content: t("This is the layer option by Which you can easily switch your map to another layer of your choice which you want to visualise on the project. "),
      style: stepStyle
    },
    {
      selector: '.location_tracker',
      content: t("By clicking this button , the map will  directly navigate to your location , "),
      style: stepStyle
    },
    {
        selector: '.leaflet-control-minimap.leaflet-container.leaflet-touch.leaflet-fade-anim.leaflet-grab.leaflet-touch-drag.leaflet-touch-zoom.leaflet-control',
        content: t("This is the minimap Controller , which you can use to easily navigate the whole map ."),
        style: stepStyle
      },
      {
        selector: '.chat_feedback',
        content: t("This is the Feedback option by which can  give us a feedback ,or send us a query of errors which you are facing while using this software"),
        style: stepStyle
      },
      {
        selector: '.tools',
        content: t("From this box you can navigate the set of advanced tools such as catchment and many others"),
        style: stepStyle
      }
  ];

  const myState = useSelector((state) => state.guidedTour.tour);
  const dispatch = useDispatch();

    return (<>
         <Tour
      steps={steps}
      isOpen={myState}
      rounded={5}
      stepInteraction={true}
      maskClassName="mask"
      accentColor="#269faf"
      onRequestClose={() => dispatch(closeGuidedTour())} />

      {/* here we are going to add button which will be show on the right bottom side of the map */}
      <div className="guided_tour_icons" onClick = {()  => dispatch(showGuidedTour())}>
        <img src={Flyer} alt="flyer icons" />
        <span style = {{marginRight : "2px"}}>{t("Guide Tour")}</span>
      </div>
  );
    </>)
}

// exporting the default component ;
export default WebTour ;