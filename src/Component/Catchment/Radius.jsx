// here we will work on the radius part of the project ;

import React, { useEffect, useState } from "react";
import { useMap , Marker , Circle , Popup} from "react-leaflet";
import L from "leaflet"
import Dot from "./images/dot.png";
import { showNotification } from "../../actions";
import Loader from "../../utils/Loader";
import { useSelector, useDispatch } from "react-redux";
import Direction from "./images/direction.svg";
import axios from "axios";

const Radius = () => {
  const radiusData = useSelector((state) => state.catchmentData.radiusDta);
  
  const dispatch = useDispatch();
  const api = useSelector((state) => state.apiStore.url);

  const Token = useSelector((state) => state.authenication.token);
  const map = useMap();
  const [loading, setLoading] = useState(false);
  const [markerData, setMarkerData] = useState();

  const urlLink = `${api}clusters`;

  var screenBounds = map.getBounds();
  
  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );
  const servicesCheckedData = useSelector(
    (state) => state.poiCheckedItem.servicesSelectedItemss
  );

  const refreshCluster = useSelector(
    (state) => state.enableClusterHeatmap.refresh
  );

  const getRadiusMapData = () => {
    const zoomLevels = Math.round(map.getZoom());
    setLoading(true);

    
    const boundss = map.getBounds();
    const coordinates = [
      boundss._northEast.lng,
      boundss._northEast.lat,
      boundss._southWest.lng,
      boundss._southWest.lat,
    ];

    const data = {
      bounds: coordinates,
      poi: poiCheckedData,
      services: servicesCheckedData ,
      type : "bounds"
    };

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    };

    screenBounds = boundss;
    axios
      .post(urlLink, data, { headers: headers })
      .then((res) => {
        
        setLoading(false)
        if (res.data.Clusters) {
          const data = res.data.Clusters;
          console.log(data, "this is the lcustter data");
          setMarkerData(data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (radiusData.checked) {
      getRadiusMapData();
    }
  }, [radiusData]);

  // adding css to the marker icon ;
  let DefaultIcon = L.icon({
    iconUrl: Dot,
    iconSize: 5,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="radius">
      {markerData && radiusData.checked && 
        markerData.map((item, index) => {

           const center = [item.position.lat , item.position.lon]
          return (<>
            <Marker
              position={center}
              icon={DefaultIcon}
              key={index}
            ></Marker>

           
            <Circle
                center={center}
              radius={radiusData.dist}
              pathOptions = {{color : "rgb(255, 28, 39)" , weight : 1}}
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
                            <img src={item.mapimage} alt="poi image" />
                          </div>
                          <div className="tooltips_direction">
                            <h6>{item.text.name}</h6>
                            <div className="direction_img" onClick = {() => dispatch(showNotification("Development is in progress ! "))}>
                              <img src={Direction} alt="direction icon" />
                            </div>
                          </div>
                          <h5 className="tool_category_name">
                            {item.text.category_name}
                          </h5>
                          <div className="tool_num">
                            <span className="tools_outlet_name">
                              {item.text.outlet_name}
                            </span>
                          </div>
                        </div>
                      </Popup>
            </Circle>

           

          </>);
        })}
         {loading && <Loader/>}
           
    </div>
  );
};

export default Radius;
