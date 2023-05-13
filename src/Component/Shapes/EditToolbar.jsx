// This is the file where we are going to place the toolbar which will be used in our map container ;

import React, { useEffect, useState, useRef } from "react";
import "../Main.css";
import {
  Marker,
  Popup,
  Polygon,
  Circle,
  Tooltip,
  useMap,
  FeatureGroup,
} from "react-leaflet";
import L from "leaflet";
import ShapesPopup from "./ShapesPopup";
import { EditControl } from "react-leaflet-draw";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Toolbar from "../mainimages/toolbar.svg";
import ResultPanel1 from "../Result/ResultPanel1";
import Cut from "../mainimages/cut.svg";
import Delete from "../mainimages/delete.svg";
import { featureGroup } from "leaflet";
import MarkerIcon from "../mainimages/markers.svg";
import SaveShape from "./SaveShape";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import Catchment from "../Catchment/Catchment";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import Parser from "html-react-parser";
import {
  clearAllShapesRecord,
  cutProfileScreen,
  disableCluster,
  disableHeatmap,
  hideControl,
  panel1,
  panel2,
  shapeRecord,
  showControl,
  showLoginByOtp,
  showLoginPopup,
  refreshHeatmapCluster,
  showNotification,
  showShareLink,
  showToolsScreen,
  updateCircleArray,
  updateMarkerAddress,
  updatePolygonArray,
  updateRectangleArray,
  updateShapesName,
  deleteAllFromMap,
  disablePoiLayers,
  enablePoiLayers,
  enableCluster,
  enableHeatmap,
  updateMarkerArray,
  updateRemovePolygonShapeName,
  updateRemoveCircleShapeName,
  updateRemoveRectangleShapeName,
  updateHeatmapShapeDetails,
  clearHeatmapShapeDetails,
  removeAllPoiFromMap,
  addHeatmapLayers,
} from "../../actions/index";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loader from "../../utils/Loader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Refresh from "../mainimages/bin.png";
import { updateShapeDetails } from "../../actions/index";

// This is the main component of the file ;

const EditToolbar = (props) => {

  const {poiRef} = props;
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const dispatch = useDispatch();
  const panel1data = useSelector((state) => state.toggleAllPanel.text);
  const userLoged = useSelector((state) => state.userLoged.data);
  const { t, i18n } = useTranslation();

  // this is the function which will only when the user will click on the linked passed by some populator user in socail media ;

  const map = useMap();

  // here we are creating a array which will keep record of  all the created shapes ;

  const [allShapes, setAllShapes] = useState([]);

  // here we are writing the code to overwrite edittoolbar text ;

  const ppp = map._controlContainer;

  // Defining oncreated function here ;y

  const [circlearray, setCirclearray] = useState([]);
  const [polygonarray, setPolygonarray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rectanglearray, setRectanglearray] = useState([]);
  const [markercoord, setMarkercoord] = useState([]);
  const [showShapeNamePopup, setShowShapeNamePopup] = useState(false);

  // this is the array which will keep the record of the address at where the marker has been placed ;

  const [markerAddress, setMarkerAddress] = useState([]);

  const featureGroupRef = useRef();

  const [showDeleteIcon, setShowDeleteIcons] = useState(false);
  const [createdShapesName, setCreatedShapesName] = useState([]);
  const feedbackState = useSelector((state) => state.feedbackHandler.show);

  const clusterState = useSelector((state) => state.clustersHanlders.show);
  const refreshState = useSelector(
    (state) => state.enableClusterHeatmap.refresh
  );

  const Created = (e) => {
    const shape = e.layerType;
    const saveUrl = `${api}shapes`;

    const headers = {
      Authorization: `Bearer ${Token}`,
      Accept: "application/json",
    };

    setShowDeleteIcons(true);
    const drawnItems = featureGroupRef.current._layers;
    if (Object.keys(drawnItems).length > 0) {
      Object.keys(drawnItems).forEach((layerid, index) => {
        if (index > 0) return;
        const layer = drawnItems[layerid];
        featureGroupRef.current.removeLayer(layer);
      });
    }

    // here we getting a unique number ;

    if (shape === "circle") {
      var num = Math.round(Math.random() * 1000000);
      var nam = `circle${num}`;

      setCreatedShapesName((itms) => {
        return [...itms, nam];
      });
      dispatch(updateHeatmapShapeDetails(nam));

      const radiuss = e.layer._mRadius;
      const latlng = e.layer._latlng;

      const data = {
        radius: radiuss,
        center: latlng,
        name: nam,
        type: "circle",
      };

      setCirclearray((circlearray) => {
        const val = [...circlearray, data];
        dispatch(updateCircleArray(val));
        return [...circlearray, data];
      });

      // here we are writing the code which will saved the created circle directly to the db ;
      // here we are getting the date ;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      today = dd + "-" + mm + "-" + yyyy;

      const shapeSavedData = {
        lat: latlng.lng,
        lng: latlng.lat,
        radius: radiuss,
        center: latlng,
        unique_id: nam,
        date: today,
        type: "circle",
        saved: 0,
      };

      axios
        .post(saveUrl, shapeSavedData, { headers: headers })
        .then((res) => {
          if (res.data.success) {
          }
        })
        .catch((err) => {
          console.log(err, "this is the error");
        });
    } else if (shape === "polygon") {
      var num = Math.round(Math.random() * 1000000);
      var nam = `polygon${num}`;

      setCreatedShapesName((itms) => {
        return [...itms, nam];
      });
      dispatch(updateHeatmapShapeDetails(nam));

      const bounds = e.layer._bounds;

      // this is the center which will be send to the store and after that it will be called into the result map screen ;

      const lat = (bounds._northEast.lat + bounds._southWest.lat) / 2;
      const lng = (bounds._northEast.lng + bounds._southWest.lng) / 2;

      const center = [lat, lng];

      const coord = e.layer._latlngs[0];

      const data = { coord: coord, center: center, name: nam };

      setPolygonarray((polygonarray) => {
        const val = [...polygonarray, data];
        dispatch(updatePolygonArray(val));
        return [...polygonarray, data];
      });

      let latlngs = "";
      const shapeData1 = coord;
      const shapeData = [...shapeData1, shapeData1[0]];
      for (let i = 0; i < shapeData.length; i++) {
        latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
      }

      latlngs = latlngs.replace(/,$/, "");

      // here we are writing the code which will saved the created polygon directly to the db ;
      // here we are getting the date ;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      today = dd + "-" + mm + "-" + yyyy;

      const shapeSavedData = {
        coord: coord,
        center: center,
        unique_id: nam,
        date: today,
        type: "polygon",
        latlng: latlngs,
        saved: 0,
      };

      axios.post(saveUrl, shapeSavedData, { headers: headers }).then((res) => {
        if (res.data.success) {
        }
      });
    } else if (shape === "rectangle") {
      var num = Math.round(Math.random() * 1000000);
      var nam = `rectangle${num}`;

      setCreatedShapesName((itms) => {
        return [...itms, nam];
      });
      dispatch(updateHeatmapShapeDetails(nam));

      const bounds = e.layer._bounds;

      // this is the center which will be send to the store and after that it will be called into the result map screen ;

      const lat = (bounds._northEast.lat + bounds._southWest.lat) / 2;
      const lng = (bounds._northEast.lng + bounds._southWest.lng) / 2;

      const center = [lat, lng];

      const coord = e.layer._latlngs[0];
      const id = e.layer._leaflet_id;

      const data = { coord: coord, center: center, name: nam };

      setRectanglearray((rectanglearrays) => {
        const val = [...rectanglearrays, data];
        dispatch(updateRectangleArray(val));
        return [...rectanglearrays, data];
      });

      // here we are writing the code which will saved the created rectangle directly to the db ;
      // here we are getting the date ;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();

      today = dd + "-" + mm + "-" + yyyy;

      let latlngs = "";
      const shapeData1 = coord;
      const shapeData = [...shapeData1, shapeData1[0]];
      for (let i = 0; i < shapeData.length; i++) {
        latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
      }

      latlngs = latlngs.replace(/,$/, "");

      const shapeSavedData = {
        coord: coord,
        center: center,
        unique_id: nam,
        date: today,
        type: "rectangle",
        latlng: latlngs,
        saved: 0,
      };

      axios.post(saveUrl, shapeSavedData, { headers: headers }).then((res) => {
        if (res.data.success) {
        }
      });
    } else if (shape === "marker") {
      const coord = e.layer._latlng;

      var num = Math.round(Math.random() * 1000000);
      var nam = `marker${num}`;

      dispatch(updateHeatmapShapeDetails(nam));

      const latlng = [e.layer._latlng.lat, e.layer._latlng.lng];

      const dta = { latlng: latlng, name: nam };

      setMarkercoord((item) => {
        const val = [...item, dta];
        dispatch(updateMarkerArray(val));

        return [...item, dta];
      });

      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}
      &location_type=ROOFTOP&result_type=street_address&key=AIzaSyBd3k-GLkRUKVg_l-90CAScVYa6n94qXLw&hl=en`;

      axios.get(url).then((res) => {
        let address = res.data.plus_code.compound_code;

        address = address.split(" ");
        let address2 = [];
        for (let i = 1; i < address.length; i++) {
          address2.push(address[i]);
        }
        const actualAddress = address2.toString();

        setMarkerAddress((selectedAddress) => {
          return [...selectedAddress, actualAddress];
        });
      });
    }
  };

  // here we are sending the marker address to the store ;
  useEffect(() => {
    dispatch(updateMarkerAddress(markerAddress));
  }, [markerAddress]);

  // here we are going to add all the shapes which will be get through the social media ; this shapes will be show when any other user will click on the link send by populator user ;

  const Location = useLocation();

  useEffect(() => {
    const urlSecretCode = new URLSearchParams(Location.search).get(
      "secretCode"
    );

    const urlLink = `${api}get-url`;

    if (urlSecretCode) {
      dispatch(cutProfileScreen());
      axios
        .post(urlLink, { code: urlSecretCode })
        .then((res) => {
          if (res.data.success) {
            const urlOrg = res.data.data[0].base_url;
            const urlOrgData = JSON.parse(urlOrg);
            const vall = urlOrgData.data;

            if (vall.s == "polygon") {
              map.flyTo(vall.c, 13);
              const dta = {
                coord: vall.coord,
                center: vall.c,
                name: vall.nam,
              };
              setPolygonarray((item) => {
                return [...item, dta];
              });
            } else if (vall.s == "rectangle") {
              map.flyTo(vall.c, 13);
              const dta = {
                coord: vall.coord,
                center: vall.c,
                name: vall.nam,
              };

              setRectanglearray((item) => {
                return [...item, dta];
              });
            } else if (vall.s == "circle") {
              map.flyTo(vall.c, 13);
              const dta = {
                radius: vall.r,
                center: vall.c,
                name: vall.nam,
              };

              setCirclearray((item) => {
                return [...item, dta];
              });
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error which we are getting here");
        });
    }
  }, []);

  // adding css to the marker icon ;

  let DefaultIcon = L.icon({
    iconUrl: MarkerIcon,
    iconSize: 50,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  // here we are adding toggle function to show and hide toolbar icon ;

  const [displays, SetDisplays] = useState({
    toolbar: "flex",
    cut: "none",
  });

  const [showicon, SetShowicon] = useState(false);
  const [show, setShow] = useState(false);

  const changetoolbar = () => {
    setShow(true);
    if (map._controlContainer.childNodes[1].childNodes[0]) {
      map._controlContainer.childNodes[1].childNodes[0].childNodes[0].hidden = false;
    }
    SetDisplays({
      toolbar: "none",
      cut: "flex",
    });
  };

  const changecut = () => {
    if (map._controlContainer.childNodes[1].childNodes[0]) {
      map._controlContainer.childNodes[1].childNodes[0].childNodes[0].hidden = true;
    }
    SetDisplays({
      toolbar: "flex",
      cut: "none",
    });
  };

  // useEffect(() =>{
  //   if (map._controlContainer.childNodes[1].childNodes[0]) {
  //     if(map._controlContainer.childNodes[1].childNodes[0].childNodes[0].hidden = false){
  //       SetDisplays({
  //         toolbar: "none",
  //         cut: "flex",
  //       });
  //     }
  //     else if(map._controlContainer.childNodes[1].childNodes[0].childNodes[0].hidden = true){
  //       SetDisplays({
  //         toolbar: "flex",
  //         cut: "none",
  //       });
  //     }
  //   }
  // },[map._controlContainer.childNodes[1].childNodes[0].childNodes[0].hidden])

  const toolbar = {
    display: displays.toolbar,
  };
  const cut = {
    width: "55%",
    display: displays.cut,
  };

  if (props.shapelayers) {
    setCirclearray([]);
    setPolygonarray([]);
    setRectanglearray([]);
    console.log("you have clicked the shapelayers");
  }

  // here we are writing the function which are called from the find opportunites to show the editcontrol for creating shapes and placing the marker ;

  useEffect(() => {
    if (panel1data > 0) {
      changetoolbar();
    } else if (panel1data === 0) {
      changecut();
    }
  }, [panel1data]);

  // here we are writing the function which will be used to remove the shapes ;

  const removeShapes = (id, shape) => {

  
    if (shape === "polygon") {
      var polygonArray = polygonarray.filter(
        (item) => item !== polygonarray[id]
      );
      const name = polygonarray[id].name;
      const val = { name: name, id: id };

      setPolygonarray(polygonArray);
      dispatch(updateRemovePolygonShapeName(val));
      dispatch(updatePolygonArray(polygonArray));

    } else if (shape === "circle") {
      var circleArray = circlearray.filter((item) => item !== circlearray[id]);
      const name = circlearray[id].name;
      const val = { name: name, id: id };

      setCirclearray(circleArray);
      dispatch(updateRemoveCircleShapeName(val));
      dispatch(updateCircleArray(circleArray))

    } else if (shape === "rectangle") {

      var rectangleArray = rectanglearray.filter(
        (item) => item !== rectanglearray[id]
      );


      const name = rectanglearray[id].name;
      const val = { name: name, id: id };
      setRectanglearray(rectangleArray);
      dispatch(updateRectangleArray(rectangleArray))

      dispatch(updateRemoveRectangleShapeName(val));
    } else if (shape === "marker") {
      var markerArray = markercoord.filter((item) => item !== markercoord[id]);
      setMarkercoord(markerArray);
    }
  };

  // here we are writing the function which will delete all the created shapes ;
  const heatmapLayers = useSelector(
    (state) => state.heatMapHandler.heatmap_layers
  );

  const deleteAllCreatedShapes = () => {
  
    dispatch(clearAllShapesRecord());
    setShowDeleteIcons(false);
    setCirclearray([]);
    setPolygonarray([]); 
    setRectanglearray([]);
    setMarkercoord([]);
    setMarkerAddress([]);
    dispatch(updateMarkerArray([]));
    // dispatch(disableHeatmap());
    dispatch(disableCluster());
    dispatch(disablePoiLayers());
    dispatch(clearAllShapesRecord());
    dispatch(clearHeatmapShapeDetails());
    dispatch(updateCircleArray([]))
    dispatch(updateRectangleArray([]))
    dispatch(updatePolygonArray([]))
    dispatch(updateMarkerArray([]));
    dispatch(removeAllPoiFromMap());

    if (heatmapLayers) {
      for (var i = 0; i < heatmapLayers.length; i++) {
        map.removeLayer(heatmapLayers[i]);
      }
      dispatch(addHeatmapLayers([]));
    }

  };

  // here we are writing the function which will save the selectedShape ;

  const saveSelectedShape = (index, shape) => {
    if (Token) {
      setShowShapeNamePopup(true);

      if (shape === "polygon") {
        var polygonData = polygonarray[index];

        const data = {
          type: "polygon",
          coordinates: polygonData.coord,
          center: polygonData.center,
          unique_id: polygonData.name,
        };

        dispatch(updateShapeDetails(data));
      } else if (shape === "circle") {
        var circleData = circlearray[index];

        const data = {
          type: "circle",
          radius: circleData.radius,
          center: [circleData.center.lat, circleData.center.lng],
          unique_id: circleData.name,
        };

        dispatch(updateShapeDetails(data));
      } else if (shape === "rectangle") {
        var rectangleData = rectanglearray[index];
        const data = {
          type: "rectangle",
          coordinates: rectangleData.coord,
          center: rectangleData.center,
          unique_id: rectangleData.name,
        };
        dispatch(updateShapeDetails(data));
      }
    } else {
      dispatch(showLoginPopup());
    }
  };

  // here we writing the function which will clear all the shapes and the marker after logging out ;

  useEffect(() => {
    if (!userLoged) {
      setPolygonarray([]);
      setMarkerAddress([]);
      setCirclearray([]);
      setRectanglearray([]);
    }
  }, [userLoged]);

  // here we are writing the function whcih will be used to share link ; ;
  const shareLink = (index, shape) => {
    dispatch(showShareLink());

    if (shape === "circle") {
      const val = circlearray[index];

      const dta = {
        r: val.radius,
        s: "circle",
        c: val.center,
        nam: val.name,
      };
      dispatch(shapeRecord(dta));
    } else if (shape === "rectangle") {
      const val = rectanglearray[index];

      const dta = {
        coord: val.coord,
        s: "rectangle",
        c: val.center,
        nam: val.name,
      };
      dispatch(shapeRecord(dta));
    } else if (shape === "polygon") {
      const val = polygonarray[index];

      const dta = {
        coord: val.coord,
        s: "polygon",
        c: val.center,
        nam: val.name,
      };
      dispatch(shapeRecord(dta));
    }
  };

  // here we are going to add the function which will close the funcjtion ;
  const closeSavedPopup = () => {
    setShowShapeNamePopup(false);
  };

  const zoom = map._zoom;

  // This is code which will be used so the when the user select the saved shapes then it will render the shape ;
  const shapesSelected = useSelector((state) => state.selectedShape.data);

  useEffect(() => {
    if (shapesSelected.shape === "polygon") {
      const flyLocation = shapesSelected.center;
      if (map != null) {
        map.flyTo(flyLocation, zoom);
        const crds = shapesSelected.coords.coord;
        const data = { coord: crds, center: flyLocation };

        setRectanglearray((rectanglearrays) => {
          return [...rectanglearrays, data];
        });
        const shapeDetails = { s: "polygon", coord: crds, c: flyLocation };
        setAllShapes((allshapes) => {
          return [...allshapes, shapeDetails];
        });
      }
    } else if (shapesSelected.shape === "rectangle") {
      const flyLocation = shapesSelected.center;
      if (map != null) {
        map.flyTo(flyLocation, zoom);
        const crds = shapesSelected.coords.coord;
        const data = { coord: crds, center: flyLocation };

        setRectanglearray((rectanglearrays) => {
          return [...rectanglearrays, data];
        });

        const shapeDetails = { s: "rectangle", coord: crds, c: flyLocation };
        setAllShapes((allshapes) => {
          return [...allshapes, shapeDetails];
        });
      }
    } else if (shapesSelected.shape === "circle") {
      const flyLocation = shapesSelected.center;
      if (map != null) {
        map.flyTo(flyLocation, zoom);
        const radi = shapesSelected.coords.radius;
        const data = { radius: radi, center: flyLocation };
        setCirclearray((circlearray) => {
          return [...circlearray, data];
        });
        const shapeDetails = { s: "circle", r: radi, c: flyLocation };
        setAllShapes((allshapes) => {
          return [...allshapes, shapeDetails];
        });
      }
    }
  }, [shapesSelected]);

  // here we are storing all the names to the store ;
  useEffect(() => {
    if (createdShapesName.length > 0) {
      dispatch(updateShapesName(createdShapesName));
    }
  }, [createdShapesName]);

  // here we are going to get the text ;
  const choosedLanguage = i18n.language;
  const [polygonText, setPolygonText] = useState("Free Form");
  const [circleText, setCircleText] = useState("Circle");
  const [markerText, setMarkerText] = useState("Drop Mark");
  const [rectangleText, setRectangleText] = useState("Rectangle");

  useEffect(() => {
    if (choosedLanguage === "en") {
      var polygon_ =
        '<style> .leaflet-draw-draw-polygon::after {  content: "Free Form" !important;} </style>';

      var circle_ =
        '<style> .leaflet-draw-draw-circle::after {  content: "Circle" !important;} </style>';

      var rectangle_ =
        '<style> .leaflet-draw-draw-rectangle::after {  content: "Rectangle" !important;} </style>';

      var marker_ =
        '<style> .leaflet-draw-draw-marker::after {  content: "Marker" !important;} </style>';

      setPolygonText(polygon_);
      setCircleText(circle_);
      setRectangleText(rectangle_);
      setMarkerText(marker_);
    } else if (choosedLanguage === "ar") {
      var polygon_ =
        '<style> .leaflet-draw-draw-polygon::after {  content: "مضلع" !important;} </style>';

      var circle_ =
        '<style> .leaflet-draw-draw-circle::after {  content: "دائرة" !important;} </style>';

      var rectangle_ =
        '<style> .leaflet-draw-draw-rectangle::after {  content: "مستطيل" !important;} </style>';

      var marker_ =
        '<style> .leaflet-draw-draw-marker::after {  content: "علامة" !important;} </style>';

      setPolygonText(polygon_);
      setCircleText(circle_);
      setRectangleText(rectangle_);
      setMarkerText(marker_);
    } else if (choosedLanguage === "hn") {
      var polygon_ =
        '<style> .leaflet-draw-draw-polygon::after {  content: "बहुभुज" !important;} </style>';

      var circle_ =
        '<style> .leaflet-draw-draw-circle::after {  content: "वृत्त" !important;} </style>';

      var rectangle_ =
        '<style> .leaflet-draw-draw-rectangle::after {  content: "आयत" !important;} </style>';

      var marker_ =
        '<style> .leaflet-draw-draw-marker::after {  content: "निशान" !important;} </style>';

      setPolygonText(polygon_);
      setCircleText(circle_);
      setRectangleText(rectangle_);
      setMarkerText(marker_);
    }
  }, [choosedLanguage]);

  return (
    <>
      {/* adding editcontrol and feature group to create shapes and control on it */}

      {show ? (
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={Created}
            edit={{ edit: false, remove: false }}
            draw={{
              polyline: false,
              circlemarker: false,
              circle: true,
              rectangle: true,
              polygon: true,
              marker: {
                icon: DefaultIcon,
              },
            }}
          />
        </FeatureGroup>
      ) : null}

      {/* adding shapes here ; for showing measurements  */}

      {circlearray.map((currelem, index) => {
        return (
          <Circle
            center={currelem.center}
            key={index}
            radius={currelem.radius}
            showMeasurements={true}
            pathOptions={{ color: "red" }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
            }}
          >
            <Popup>
              <ShapesPopup
                name={currelem.name}
                shape="circle"
                shareLink={() => shareLink(index, "circle")}
                saveSelectedShape={() => saveSelectedShape(index, "circle")}
                removeShapes={() => removeShapes(index, "circle")}
                coords={currelem}
                poiRef={poiRef}
              />
            </Popup>
          </Circle>
        );
      })}

      {polygonarray.map((curele, index) => {
        return (
          <Polygon
            showMeasurements={true}
            key={index}
            positions={curele.coord}
            pathOptions={{ color: "red" }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
            }}
          >
            <Popup>
              <ShapesPopup
                name={curele.name}
                shareLink={() => shareLink(index, "polygon")}
                // openResultPanel = {openResultPanel}
                openShareLink={props.openShareLink}
                id={index}
                saveSelectedShape={() => saveSelectedShape(index, "polygon")}
                removeShapes={() => removeShapes(index, "polygon")}
                coords={curele}
                shape="polygon"
              />
            </Popup>
          </Polygon>
        );
      })}

      {rectanglearray.map((currentElement, index) => {
        return (
          <Polygon
            showMeasurements={true}
            key={index}
            positions={currentElement.coord}
            pathOptions={{ color: "red" }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
            }}
          >
            <Popup>
              <ShapesPopup
                name={currentElement.name}
                saveSelectedShape={() => saveSelectedShape(index, "rectangle")}
                shareLink={() => shareLink(index, "rectangle")}
                removeShapes={() => removeShapes(index, "rectangle")}
                openShareLink={props.openShareLink}
                id={index}
                coords={currentElement}
                shape="rectangle"
              />
            </Popup>
          </Polygon>
        );
      })}

      <div className="navbar_toolbar">
        <img
          src={Toolbar}
          alt="toolbar icon"
          onClick={changetoolbar}
          style={toolbar}
        />
        <img src={Cut} alt="toolbar icon" onClick={changecut} style={cut} />
      </div>

      {/* here we are going to add the refresh button which will refresh all the shapes in just one click */}

      {/* {showDeleteIcon && ( */}
        <div className="refresh" onClick={deleteAllCreatedShapes}>
          <img
            src={Delete}
            alt=""
            width="20px"
            style={{ margin: "4px auto", marginBottom: "0px", width: "18px" }}
          />
          <span>{t("Clear")}</span>
        </div>
      {/* )} */}

      {/* here we are adding loader */}
      {loading && <Loader />}

      {Parser(polygonText)}
      {Parser(circleText)}
      {Parser(rectangleText)}
      {Parser(markerText)}

      {/*here we are adding the popup which will take the name of the shape  */}
      {showShapeNamePopup ? <SaveShape closePopups={closeSavedPopup} {...props}/> : null}
    </>
  );
};

// exporting the file ;
export default EditToolbar;

// "proxy": "http://populator.co"
