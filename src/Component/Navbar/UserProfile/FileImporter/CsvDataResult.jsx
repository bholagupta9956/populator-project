// in this file we are going to get the csv data and after that we will show the csv data on the map in different format ;

import React, { useEffect } from "react";
import { Marker, Popup, Tooltip, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector , useDispatch } from "react-redux";
import { disableMapFlying, unableMapFly } from "../../../../actions";

const CsvDataResult = () => {
  const data = useSelector((state) => state.api.coordinates);
  const map = useMap();
  const dispatch = useDispatch();
  const api = useSelector((state) => state.apiStore.url);
  // adding css to the marker icon ;

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const flyMapState = useSelector((state) => state.api.flymap)

 

  useEffect(() => {
    if (data && flyMapState === true) {
     
       const dataNumber = data.length / 2;
       const flyData = data[dataNumber];
      // console.log(flyData , "this is the flyData");
      const flyCoordinates = [flyData.lat ? flyData.lat : flyData.latitude ,flyData.lon ? flyData.lon : flyData.longitude]
       map.flyTo(flyCoordinates , 6);
    }

    setTimeout(() => {
       dispatch(unableMapFly());
    }, 2000);
   
  }, [data]);

  return (
    <>
      {data
        ? data.map((item, index) => {
            const coordinates = [item.lat ? item.lat : item.latitude ,item.lon ? item.lon : item.longitude];
           
            return (
              <>
                <Marker position={coordinates} icon={DefaultIcon} key={index}>
                {item.city &&
                  <Tooltip>
                   
                    <h6>
                      City : <span style={{ color: "blue" }}> {item.city}</span>{" "}
                    </h6>
                    <h6>
                      Country :
                      <span style={{ color: "blue" }}> {item.country}</span>
                    </h6>
                  </Tooltip>
                }
                </Marker>
              </>
            );
          })
        : null}
    </>
  );
};

// exporting the data ;
export default CsvDataResult;
