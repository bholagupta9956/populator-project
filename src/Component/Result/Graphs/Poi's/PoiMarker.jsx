// here we are place a marker which will show whenever the user selects any of the poi from the poiDetails ;

import React, { useEffect } from "react";
import { Tooltip, Popup, Marker, useMap } from "react-leaflet";
import L, { latLng } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector, useDispatch } from "react-redux";
import Direction from "./PoiImages/direction.svg";
import { useTranslation } from "react-i18next";
import { showNotification } from "../../../../actions";

const PoiMarker = () => {
  // adding marker icons css here ;

  const dispatch = useDispatch();
  const map = useMap();
  const zoom = map._zoom
  const poiMarker = useSelector((state) => state.poiMarkerData.data);
  const {t , i18n} = useTranslation();
  const position = poiMarker.center;
  const det = poiMarker.val;

  useEffect(() =>{
    if (position) {
      if (position.lat != 0) {
        map.flyTo(position, zoom);
      }
    }
  },[poiMarker])
  
  let defaultIcon = L.icon({
    iconUrl: det.image,
    // shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = defaultIcon;

  return (
    <>
      {/* here we are going to add the marker which will fly to the map*/}
      <Marker position={position} icon={defaultIcon}
        eventHandlers={{
          mouseover: (e) => {
            e.target.openPopup();
          },
          click : (e) =>{
            e.target.openPopup();
          }
        }} 
      >
        <Popup>
          <div className="tooltips">
            <div className="tooltips_img">
              <img src={det.mapimage} alt="poi image" />
            </div>
            <div className="tooltips_direction">
              <h6>{det.name}</h6>
              <div
                className="direction_img"
                onClick={() =>
                  dispatch(showNotification(t("Development is in progress ! ")))
                }
              >
                <img src={Direction} alt="direction icon" />
              </div>
            </div>
            <h5 className="tool_category_name">{det.category}</h5>
            <div className="tool_num">
              <span className="tools_outlet_name">{det.outlet_name}</span>
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

// exporting the component ;
export default PoiMarker;
