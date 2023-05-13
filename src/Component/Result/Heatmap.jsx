import React, { useState, useEffect } from "react";
import points from "./Points";
import L, { marker } from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet.heat";
import Loader from "../../utils/Loader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import { useSelector, useDispatch } from "react-redux";
import HeatmapOverlay from "leaflet-heatmap";
import Refresh from "./ResultImages/refresh.svg";
import { arr } from "./HeatmapLayers";
import "./Result.css";
import {
  refreshHeatmapCluster,
  addHeatmapLayers,
  showNotification,
  updateHeatmapShapeDetailsArray,
  udpateHeatmapValue,
} from "../../actions/index";

const Heatmap = () => {
  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch();

  const map = useMap();

  const [loading, setLoading] = useState(false);
  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );
  const servicesCheckedData = useSelector(
    (state) => state.poiCheckedItem.servicesSelectedItemss
  );
  const Token = useSelector((state) => state.authenication.token);
  const [markerData, setMarkerData] = useState([]);

  const myState = useSelector((state) => state.heatMapHandler.show);
  const heatmapLayers = useSelector(
    (state) => state.heatMapHandler.heatmap_layers
  );

  const { t, i18n } = useTranslation();
  const clusterState = useSelector((state) => state.clustersHanlders.show);
  const choosedLanguage = i18n.language;

  const urlLink = `${api}heatmap`;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${Token}`,
    "X-localization": choosedLanguage,
  };

  // var layer = L.heatLayer(markerData);
  var arra = [];

  const removeAlllayers = () => {
    if (heatmapLayers) {
      for (var i = 0; i < heatmapLayers.length; i++) {
        map.removeLayer(heatmapLayers[i]);
      }
      dispatch(addHeatmapLayers([]));
    }
  };

  const withInBoundary = useSelector((state) => state.panel3.withInBoundary);
  const withInShape = useSelector((state) => state.panel3.withInShape);
  const refreshCluster = useSelector(
    (state) => state.enableClusterHeatmap.refresh
  );

  // here we are getting all the shapes which we have created on the map ;
  const polygonArray = useSelector(
    (state) => state.AllCreatedShapes.polygonArray
  );

  const rectangleArray = useSelector(
    (state) => state.AllCreatedShapes.rectangleArray
  );

  const RadiusBasedMarker = useSelector(
    (state) => state.AllCreatedShapes.radiusBasedMarker
  );

  const RoadBasedMarker = useSelector(
    (state) => state.AllCreatedShapes.roadBasedMarker
  );

  const circleArray = useSelector(
    (state) => state.AllCreatedShapes.circleArray
  );

  const heatmapEnableState = useSelector(
    (state) => state.enableClusterHeatmap.heatmap
  );

  const heatmapShapeNameArray = useSelector(
    (state) => state.heatMapHandler.shapeDetails
  );

  // here we are writing the function just for removing the selected Clusters ;

  const removeCircleShapeName = useSelector(
    (state) => state.AllCreatedShapes.removeCircleShapeName
  );

  const removePolygonShapeName = useSelector(
    (state) => state.AllCreatedShapes.removePolygonShapeName
  );

  const removeRectangleShapeName = useSelector(
    (state) => state.AllCreatedShapes.removeRectangleShapeName
  );

  const removeRadiusBasedName = useSelector(
    (state) => state.AllCreatedShapes.removeRadiusBasedName
  );

  const removeRoadBasedName = useSelector(
    (state) => state.AllCreatedShapes.removeRoadBasedName
  );

  
  useEffect(() => {
    const filterHeatmap = async () => {
      if (heatmapLayers.length !== 0) {
        const name = removeCircleShapeName.name;
        const index = heatmapShapeNameArray.indexOf(name);

        const filterName = await heatmapShapeNameArray.filter(
          (item, i) => i !== index
        );
        dispatch(updateHeatmapShapeDetailsArray(filterName));

        const filterData = await heatmapLayers.filter((item, i) => i !== index);

        removeAlllayers();
        dispatch(addHeatmapLayers(filterData));
        for (var i = 0; i < filterData.length; i++) {
          map.addLayer(filterData[i]);
        }
      }
    };
    filterHeatmap();
  }, [removeCircleShapeName]);

  useEffect(() => {
    const filterHeatmap = async () => {
      if (heatmapLayers.length !== 0) {
        const name = removePolygonShapeName.name;
        const index = heatmapShapeNameArray.indexOf(name);

        const filterName = await heatmapShapeNameArray.filter(
          (item, i) => i !== index
        );
        dispatch(updateHeatmapShapeDetailsArray(filterName));

        const filterData = await heatmapLayers.filter((item, i) => i !== index);

        removeAlllayers();
        dispatch(addHeatmapLayers(filterData));
        for (var i = 0; i < filterData.length; i++) {
          map.addLayer(filterData[i]);
        }
      }
    };
    filterHeatmap();
  }, [removePolygonShapeName]);

  useEffect(() => {
    const filterHeatmap = async () => {
      if (heatmapLayers.length !== 0) {
        const name = removeRectangleShapeName.name;
        const index = heatmapShapeNameArray.indexOf(name);

        console.log(index, "this is the index which we are getting here");
        const filterName = await heatmapShapeNameArray.filter(
          (item, i) => i !== index
        );
        dispatch(updateHeatmapShapeDetailsArray(filterName));

        const filterData = await heatmapLayers.filter((item, i) => i !== index);

        removeAlllayers();
        dispatch(addHeatmapLayers(filterData));
        for (var i = 0; i < filterData.length; i++) {
          map.addLayer(filterData[i]);
        }
      }
    };
    filterHeatmap();
  }, [removeRectangleShapeName]);

  useEffect(() => {
    const filterHeatmap = async () => {
      if (heatmapLayers.length !== 0) {
        const name = removeRoadBasedName.name;
        const index = heatmapShapeNameArray.indexOf(name);

        console.log(index, "this is the index which we are getting here");
        const filterName = await heatmapShapeNameArray.filter(
          (item, i) => i !== index
        );
        dispatch(updateHeatmapShapeDetailsArray(filterName));

        const filterData = await heatmapLayers.filter((item, i) => i !== index);

        removeAlllayers();
        dispatch(addHeatmapLayers(filterData));
        for (var i = 0; i < filterData.length; i++) {
          map.addLayer(filterData[i]);
        }
      }
    };
    filterHeatmap();
  }, [removeRoadBasedName]);


  useEffect(() => {
    const filterHeatmap = async () => {
      if (heatmapLayers.length !== 0) {
        const name = removeRadiusBasedName.name;
        const index = heatmapShapeNameArray.indexOf(name);

        console.log(index, "this is the index which we are getting here");
        const filterName = await heatmapShapeNameArray.filter(
          (item, i) => i !== index
        );
        dispatch(updateHeatmapShapeDetailsArray(filterName));

        const filterData = await heatmapLayers.filter((item, i) => i !== index);

        removeAlllayers();
        dispatch(addHeatmapLayers(filterData));
        for (var i = 0; i < filterData.length; i++) {
          map.addLayer(filterData[i]);
        }
      }
    };
    filterHeatmap();
  }, [removeRadiusBasedName]);

  var tempArr = [];

  var heat1;

  const [shapesName, setShapesName] = useState([]);
  const heatmapValue = useSelector((state) => state.heatMapHandler.value)

  const getHeatmapData = () => {
  
    if(heatmapValue !== 0){
      dispatch(udpateHeatmapValue(0));
    const zoomLevel = map.getZoom();
    // setMarkerData([]);

    if (myState === true && heatmapEnableState === true) {
      console.log("heatmap enabled here");
      if (withInBoundary) {
        const bounds = map.getBounds();
        setLoading(true);
        const coordinates = [
          bounds._northEast.lng,
          bounds._northEast.lat,
          bounds._southWest.lng,
          bounds._southWest.lat,
        ];

        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        };

        const Data = {
          bounds: coordinates,
          poi: poiCheckedData,
          services: servicesCheckedData,
          type: "bounds",
        };

        axios
          .post(urlLink, Data, { headers: headers })
          .then((res) => {
            setLoading(false)
        
            if (res.data.Heatmap) {
              const heatmapData = res.data.Heatmap;

              console.log(heatmapData , "this is the heatmapData here")
              for (var i = 0; i < heatmapData.length; i++) {
                var coordinate = heatmapData[i].geometry.coordinates;
                const coords = [coordinate[0], coordinate[1], 15];
                tempArr.push(coords);
                // setMarkerData((items) => [...items, coords]);
              }
              setMarkerData(tempArr);

              removeAlllayers();

              const layer = L.heatLayer(tempArr);
              var arr = heatmapLayers;
              heatmapLayers.push(layer);
              dispatch(addHeatmapLayers(arr));
              map.addLayer(layer);
            }
          })
          .catch((err) => {
            setLoading(false);
            alert("something went wrong with the server");
          });
      } else if (withInShape) {
        if (polygonArray.length !== 0) {
          setLoading(true)
          for (var l = 0; l < polygonArray.length; l++) {
            const coord = polygonArray[l].coord;
            let latlngs = "";
            const shapeData1 = coord;
            const shapeData = [...shapeData1, shapeData1[0]];

            for (let i = 0; i < shapeData.length; i++) {
              latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
            }

            latlngs = latlngs.replace(/,$/, "");

            const name = polygonArray[l].name;

            if (shapesName.indexOf(name) === -1) {
              setShapesName((item) => {
                return [...item, name];
              });

              const data = {
                poi: poiCheckedData,
                services: servicesCheckedData,
                latlng: latlngs,
                type: "polygon",
              };

              axios
                .post(urlLink, data, { headers: headers })
                .then((res) => {
                  setLoading(false)
                  if (res.data.Heatmap) {
                    setLoading(false);

                    const heatmapData = res.data.Heatmap;

                    for (var i = 0; i < heatmapData.length; i++) {
                      var coordinate = heatmapData[i].geometry.coordinates;
                      const coords = [coordinate[0], coordinate[1], 15];
                      tempArr.push(coords);
                    }
                    setMarkerData((item) => {
                      return [...item, ...tempArr];
                    });

                    const layer = L.heatLayer(tempArr);
                    var arr = heatmapLayers;
                    heatmapLayers.push(layer);
                    dispatch(addHeatmapLayers(arr));
                    map.addLayer(layer);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }
        }

        if (rectangleArray.length !== 0) {
          setLoading(true)
          for (var l = 0; l < rectangleArray.length; l++) {
            const coord = rectangleArray[l].coord;
            let latlngs = "";
            const shapeData1 = coord;
            const shapeData = [...shapeData1, shapeData1[0]];
            for (let i = 0; i < shapeData.length; i++) {
              latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
            }

            latlngs = latlngs.replace(/,$/, "");

            const name = rectangleArray[l].name;

            if (shapesName.indexOf(name) === -1) {
              setShapesName((item) => {
                return [...item, name];
              });

              const data = {
                poi: poiCheckedData,
                services: servicesCheckedData,
                latlng: latlngs,
                type: "polygon",
              };

              axios
                .post(urlLink, data, { headers: headers })
                .then((res) => {
                  setLoading(false);
                  if (res.data.Heatmap) {
                    console.log(res.data.Heatmap , "this is the heatmap here")
                    const heatmapData = res.data.Heatmap;
                    for (var i = 0; i < heatmapData.length; i++) {
                      var coordinate = heatmapData[i].geometry.coordinates;
                      const coords = [coordinate[0], coordinate[1], 15];
                      tempArr.push(coords);
                    }
                    setMarkerData((item) => {
                      return [...item, ...tempArr];
                    });

                    const layer = L.heatLayer(tempArr);
                    var arr = heatmapLayers;
                    heatmapLayers.push(layer);
                    dispatch(addHeatmapLayers(arr));
                    map.addLayer(layer);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }
        }

        if (circleArray.length !== 0) {
          for (var k = 0; k < circleArray.length; k++) {
            const radius = circleArray[k].radius;
            const lat = circleArray[k].center.lat;
            const lng = circleArray[k].center.lng;
            const name = circleArray[k].name;

            if (shapesName.indexOf(name) === -1) {
              setShapesName((item) => {
                return [...item, name];
              });

              const data = {
                lat: lng,
                radius: radius,
                lng: lat,
                poi: poiCheckedData,
                services: servicesCheckedData,
                type: "circle",
              };

              axios
                .post(urlLink, data, { headers: headers })
                .then((res) => {
                  if (res.data.Heatmap) {
                    setLoading(false);
                    const heatmapData = res.data.Heatmap;

                    for (var i = 0; i < heatmapData.length; i++) {
                      var coordinate = heatmapData[i].geometry.coordinates;
                      const coords = [coordinate[0], coordinate[1], 15];
                      tempArr.push(coords);
                    }

                    setMarkerData((item) => {
                      return [...item, ...tempArr];
                    });

                    const layer = L.heatLayer(tempArr);
                    var arr = heatmapLayers;
                    heatmapLayers.push(layer);
                    dispatch(addHeatmapLayers(arr));
                    map.addLayer(layer);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }
        }

        // adding the radiusBasedMarker here ;

        if (RadiusBasedMarker.length !== 0) {
          for (var l = 0; l < RadiusBasedMarker.length; l++) {
            const data = {
              lat: RadiusBasedMarker[l].lat,
              lng: RadiusBasedMarker[l].lng,
              radius: RadiusBasedMarker[l].radius,
              poi: poiCheckedData,
              services: servicesCheckedData,
              type: "circle",
            };

            const name = RadiusBasedMarker[l].name;

            if (shapesName.indexOf(name) === -1) {
              setShapesName((item) => {
                return [...item, name];
              });

              axios
                .post(urlLink, data, { headers: headers })
                .then((res) => {
                  if (res.data.Heatmap) {
                    setLoading(false);
                    const heatmapData = res.data.Heatmap;

                    for (var i = 0; i < heatmapData.length; i++) {
                      var coordinate = heatmapData[i].geometry.coordinates;
                      const coords = [coordinate[0], coordinate[1], 15];
                      tempArr.push(coords);
                    }

                    setMarkerData((item) => {
                      return [...item, ...tempArr];
                    });

                    const layer = L.heatLayer(tempArr);
                    var arr = heatmapLayers;
                    heatmapLayers.push(layer);
                    dispatch(addHeatmapLayers(arr));
                    map.addLayer(layer);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }
        }

        // adding the roadBasedMarker to the map ;

        if (RoadBasedMarker.length !== 0) {
          for (var l = 0; l < RoadBasedMarker.length; l++) {
            const coord = RoadBasedMarker[l].coord;

            const name = RoadBasedMarker[l].name;

            let latlngs = "";
            const shapeData1 = coord;
            const shapeData = [...shapeData1, shapeData1[0]];

            for (let i = 0; i < shapeData.length; i++) {
              latlngs = latlngs + `${shapeData[i][1]} ${shapeData[i][0]},`;
            }

            latlngs = latlngs.replace(/,$/, "");

            const data = {
              latlng: latlngs,
              poi: poiCheckedData,
              services: servicesCheckedData,
              type: "polygon",
            };

            if (shapesName.indexOf(name) === -1) {
              setShapesName((item) => {
                return [...item, name];
              });

              axios
                .post(urlLink, data, { headers: headers })

                .then((res) => {
                  if (res.data.Heatmap) {
                    setLoading(false);
                    const heatmapData = res.data.Heatmap;

                    for (var i = 0; i < heatmapData.length; i++) {
                      var coordinate = heatmapData[i].geometry.coordinates;
                      const coords = [coordinate[0], coordinate[1], 15];
                      tempArr.push(coords);
                    }

                    setMarkerData((item) => {
                      return [...item, ...tempArr];
                    });

                    const layer = L.heatLayer(tempArr);
                    var arr = heatmapLayers;
                    heatmapLayers.push(layer);
                    dispatch(addHeatmapLayers(arr));
                    map.addLayer(layer);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }
        }
      }
    } else if (myState === false) {
      removeAlllayers();
      setLoading(false);
    } else if (heatmapEnableState === false) {
      removeAlllayers();
      tempArr = [];
      const layer = L.heatLayer(tempArr);
      var arr = heatmapLayers;
      heatmapLayers.push(layer);
      dispatch(addHeatmapLayers(arr));
      map.addLayer(layer);
      setLoading(false);
    }
  }
  };

  useEffect(() => {
    getHeatmapData();
  }, [
    myState,
    refreshCluster,
    heatmapEnableState,
    RadiusBasedMarker,
    RoadBasedMarker,
  ]);

  const refreshState = useSelector(
    (state) => state.enableClusterHeatmap.refresh
  );

  const heatmapClustreRefresh = () => {

    if (clusterState === true || myState === true) {
      dispatch(refreshHeatmapCluster(refreshState + 1));
      dispatch(udpateHeatmapValue(heatmapValue + 5));
      getHeatmapData();
    } else {
      dispatch(
        showNotification(
          "This function will only work when heatmap is checked"
        )
      );
    }
  };

  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    if (myState || clusterState) {
      setShowRefresh(true);
    } else {
      setShowRefresh(false);
    }
  }, [myState]);

  return (
    <>
      <div className="heatmap">
  
        {/* {showRefresh && (
          <div className="heatmap_refresh" onClick={heatmapClustreRefresh}>
            <img src={Refresh} alt="refresh icon" />
            <span>{t("Refresh")}</span>
          </div>
        )} */}

        {showRefresh && (
          <div className="heatmap_refresss" onClick={heatmapClustreRefresh}>
            <span>{t("Get Heatmap")}</span>
          </div>
        )}

        {/* here we are adding the loader */}

        {loading && <Loader />}
      </div>
    </>
  );
};

export default Heatmap;
