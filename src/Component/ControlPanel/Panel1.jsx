// In this page the first component of the control panel will be desinged ;

import React, { useState } from "react";
import L from "leaflet";
import Location from "./ControlImages/location.svg";
import Search from "./ControlImages/search.svg";
import Area from "./ControlImages/area.svg";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Advance from "./ControlImages/advance.svg";
import axios from "axios";
import "./ControlPanel.css";
import { useDispatch } from "react-redux";
import { hideControl, panel1, panel2, showControl, showNotification ,panel3} from "../../actions";
import { useMap, Marker, Tooltip } from "react-leaflet";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { useTranslation } from "react-i18next";
import { StaticRouter } from "react-router";
import { useSelector } from "react-redux";

const Panel1 = (props) => {
  // here we are writing all of function of the search options ;
  const {t , i18n} = useTranslation();
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [location, setLocation] = useState("");
  const map = useMap();
  const api = useSelector((state) => state.apiStore.url);
  const [demoData, setDemoData] = useState([]);

  const data = useSelector((state) => state.toggleAllPanel.text);
  console.log(data)

  // here we using the autocomplete library ;

  
  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
     setAddress(address)
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) =>
       {map.flyTo(latLng , 14);
        setCoordinates(latLng)
      })
      .catch((error) => console.error("Error", error));
  };

 
  let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = defaultIcon;

  const dispatch = useDispatch();

  // here we are defining the function which will be used to draw shpeas and place marker on the map ;
  const panel1Data = useSelector((state) => state.toggleAllPanel.data)

  const drawShapes = () => {
    dispatch(hideControl(1));
  };

  return (
    <>
      <div className="panel1">
        <div className="control_items">
          <div className="panel_row1">
            <h5>{t("Finding opportunities in as easy as 1-2-3")}</h5>
            <span>{t("Let's Explore")}</span>
          </div>
          <div className="panel_row2">
            <div className="panel_row2_col1" >
              <input type="text" value="1" name="1" readOnly={true} />
              <h6>{t("WHERE")}</h6>
            </div>
            <div className="panel_row2_col2" onClick={() =>dispatch(panel2())}>
              <input type="text" value="2" name="2" readOnly={true} />
              <h6>{t("WHAT")}</h6>
            </div>
            <div className="panel_row2_col3" onClick={() => dispatch(panel3())}>
              <input type="text" value="3" name="3" readOnly={true} />
              <h6>{t('HOW')}</h6>
            </div>
          </div>
        </div>

        <div className="panel1_row3">
          <span>{t("Choose a district / pre-defined area")}</span>
          <div className="panel1_row3_col">

              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <div className="panel1_row3_col1">
                     <img src={Search} alt="location icon" width="21px" />
                    <input
                   
                      {...getInputProps({
                        placeholder: t("Search Places ..."),
                        className: "location-search-input",
                      })}
                    />
                    <div className="panel1_row3_col2">
                <img src={Location} alt="search icon" width="32px" />
              </div>
              </div>
                    <div className="autocomplete-dropdown-container" style={{background : "white" , marginTop : "-2px"}}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                            style = {{borderBottom : "1px solid #bfc7c1" , padding : "7px 15px"}}
                          >
                            <span >{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>

              
            
          </div>
        </div>
        <div className="panel1_row4">
          <div className="panel1_row4_col1" onClick={drawShapes} style={{cursor : "pointer"}}>
            <img src={Location} alt="marker icon" />
            <span>{t("Place Marker")}</span>
          </div>
          <div className="panel1_row4_col2" onClick={drawShapes} style={{cursor : "pointer"}}>
            <img src={Area} alt="area selector icon" />
            <span>{t("Draw Area On Map")}</span>
          </div>
          <div className="panel1_row4_col3" onClick = {() => dispatch(showNotification("Currently work in progress !"))}>
            <img src={Advance} alt="advance icon" />
            <span>{t("Advance")}</span>
          </div>
        </div>

        <div className="control_btn">
          <button onClick={() => dispatch(hideControl(0))}>{t("Back")}</button>
          <button onClick={() => dispatch(panel2())}>{t("Next")}</button>
        </div>
      </div>
    </>
  );
};

// exporting the panel1 component ;
export default Panel1;

// onClick={handleSelect(suggestion)}0
