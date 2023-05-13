// here we are writing function which will help us to get poi data from anywhere in the projects;
import axios, { useState, useEffect } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useMap } from "react-leaflet";
import { useTranslation } from "react-i18next";

export const GetPoiData = () => {
  const [totalPoints, setTotalPoints] = useState();
  const [showAllPoi, setShowAllPoi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markerData, setMarkerData] = useState([]);
  const [allPois, setAllPois] = useState([]);
  const [cuttedPoints, setShowCuttedPoints] = useState(0);
  const [shapesName, setShapesName] = useState([]);
  const [polygonArrayData, setPolygonArrayData] = useState([]);
  const [rectangleArrayData, setRectangleArrayData] = useState([]);
  const [circleArrayData, setCircleArrayData] = useState([]);
  const [radiusBasedMarkerData, setRadiusBasedMarkerData] = useState([]);
  const [roadBasedMarkerData, setRaodBasedMarkerData] = useState([]);

  const map = useMap();
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const poiLayerState = useSelector((state) => state.poiLayersHandlers.show);
  const withInBoundary = useSelector((state) => state.panel3.withInBoundary);
  const withInShape = useSelector((state) => state.panel3.withInShape);
  const poiLayersEnableState = useSelector(
    (state) => state.enableClusterHeatmap.poiLayers
  );
  const polygonArray = useSelector(
    (state) => state.AllCreatedShapes.polygonArray
  );
  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );
  const servicesCheckedData = useSelector(
    (state) => state.poiCheckedItem.servicesSelectedItemss
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
  var screenBounds = map.getBounds();

  const choosedLanguage = i18n.language;
  const { t, i18n } = useTranslation();
  const boundss = map.getBounds();
  const urlLink = `${api}poi-layers`;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${Token}`,
    "X-localization": choosedLanguage,
  };

  setTotalPoints(0);

  setShowAllPoi(false);
  if (poiLayerState === true && poiLayersEnableState === true) {
    if (withInBoundary) {
      setMarkerData([]);
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
        services: servicesCheckedData,
        type: "bounds",
      };

      screenBounds = boundss;
      axios
        .post(urlLink, data, { headers: headers })
        .then((res) => {
          if (res.data.Clusters) {
            setLoading(false);
            const data = res.data.Clusters;
            setMarkerData(data);

            res.data.Clusters.map((it, index) => {
              if (!allPois.includes(it.id)) {
                setTotalPoints((itmm) => {
                  return itmm + parseInt(it.points);
                });
              }
            });
            setShowCuttedPoints(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          alert("something went wrong with the server");
        });
    } else if (withInShape) {
      if (polygonArray.length !== 0) {
        setLoading(true);
        for (var l = 0; l < polygonArray.length; l++) {
          const coord = polygonArray[l].coord;
          let latlngs = "";
          const shapeData1 = coord;
          const shapeData = [...shapeData1, shapeData1[0]];
          for (let i = 0; i < shapeData.length; i++) {
            latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
          }

          const name = polygonArray[l].name;

          latlngs = latlngs.replace(/,$/, "");

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
                if (res.data.Clusters) {
                  setLoading(false);

                  res.data.Clusters.map((it, index) => {
                    if (!allPois.includes(it.id)) {
                      setTotalPoints((itmm) => {
                        return itmm + parseInt(it.points);
                      });
                    }
                  });

                  setShowCuttedPoints(true);
                  const data = res.data.Clusters;
                  setPolygonArrayData((item) => {
                    return [...item, data];
                  });
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
        setLoading(true);
        for (var l = 0; l < rectangleArray.length; l++) {
          const coord = rectangleArray[l].coord;
          let latlngs = "";
          const shapeData1 = coord;
          const shapeData = [...shapeData1, shapeData1[0]];
          for (let i = 0; i < shapeData.length; i++) {
            latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
          }

          const name = rectangleArray[l].name;
          latlngs = latlngs.replace(/,$/, "");

          if (shapesName.indexOf(name) === -1) {
            setShapesName((item) => {
              return [...item, name];
            });
          }

          const data = {
            poi: poiCheckedData,
            services: servicesCheckedData,
            latlng: latlngs,
            type: "polygon",
          };

          axios
            .post(urlLink, data, { headers: headers })
            .then((res) => {
              if (res.data.Clusters) {
                setLoading(false);
                res.data.Clusters.map((it, index) => {
                  if (!allPois.includes(it.id)) {
                    setTotalPoints((itmm) => {
                      return itmm + parseInt(it.points);
                    });
                  }
                });

                setShowCuttedPoints(true);
                const data = res.data.Clusters;
                setRectangleArrayData((item) => {
                  return [...item, data];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
            });
        }
      }

      if (circleArray.length !== 0) {
        setLoading(true);
        for (var k = 0; k < circleArray.length; k++) {
          const radius = circleArray[k].radius;
          const lat = circleArray[k].center.lat;
          const lng = circleArray[k].center.lng;
          const name = circleArray[k].name;

          if (shapesName.indexOf(name) === -1) {
            setShapesName((item) => {
              return [...item, name];
            });
          }

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
              if (res.data.Clusters) {
                setShowCuttedPoints(true);
                setLoading(false);

                res.data.Clusters.map((it, index) => {
                  if (!allPois.includes(it.id)) {
                    setTotalPoints((itmm) => {
                      return itmm + parseInt(it.points);
                    });
                  }
                });
                const data = res.data.Clusters;
                setCircleArrayData((item) => {
                  return [...item, data];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
      }

      // adding the radiusBasedMarker here ;

      if (RadiusBasedMarker.length !== 0) {
        setLoading(true);
        for (var l = 0; l < RadiusBasedMarker.length; l++) {
          const name = RadiusBasedMarker[l].name;
          if (shapesName.indexOf(name) === -1) {
            setShapesName((item) => {
              return [...item, name];
            });
          }

          const data = {
            lat: RadiusBasedMarker[l].lat,
            lng: RadiusBasedMarker[l].lng,
            radius: RadiusBasedMarker[l].radius,
            poi: poiCheckedData,
            services: servicesCheckedData,
            type: "circle",
          };

          axios
            .post(urlLink, data, { headers: headers })
            .then((res) => {
              if (res.data.Clusters) {
                setLoading(false);
                setShowCuttedPoints(true);
                res.data.Clusters.map((it, index) => {
                  if (!allPois.includes(it.id)) {
                    setTotalPoints((itmm) => {
                      return itmm + parseInt(it.points);
                    });
                  }
                });
                const data = res.data.Clusters;
                setRadiusBasedMarkerData((item) => {
                  return [...item, data];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
      }

      // adding the roadBasedMarker here ;

      if (RoadBasedMarker.length !== 0) {
        setLoading(true);
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
          }

          axios
            .post(urlLink, data, { headers: headers })
            .then((res) => {
              if (res.data.Clusters) {
                res.data.Clusters.map((it, index) => {
                  console.log(it.id, "id");
                  if (!allPois.includes(it.id)) {
                    setTotalPoints((itmm) => {
                      return itmm + parseInt(it.points);
                    });
                  }
                });

                setLoading(false);
                setShowCuttedPoints(true);
                const data = res.data.Clusters;
                setRaodBasedMarkerData((item) => {
                  return [...item, data];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
      }
    }
  } else if (!poiLayerState) {
    setMarkerData([]);
    setLoading(false);
  } else if (!poiLayersEnableState) {
    setMarkerData([]);
    setLoading(false);
  }
};
