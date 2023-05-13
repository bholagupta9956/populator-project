import React, { useState, useEffect } from "react";
import "./load.css";
import Search from "../Result/ResultImages/search.svg";
import { useTranslation } from "react-i18next";
import Minus from "../mainimages/minus.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../../utils/Loader";
import { hideLoadShapes, updateSelectedShapeData } from "../../actions";

const LoadShapepart = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [selectedSavedGroup, setSelectedSavedGroup] = useState("");
  const [savedGroupName, setSavedGroupName] = useState([]);
  const Token = useSelector((state) => state.authenication.token);
  const api = useSelector((state) => state.apiStore.url);
  const [shapeData, setShapeData] = useState([]);
  const [allShapesData, setAllShapesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [callShapesApi, setCallShapesApi] = useState(false);

  const updateSelectedGroup = (e) => {
    setSelectedSavedGroup(e.target.value);
  };

  const filterShape = (e) => {
    const val = e.target.value;
    // const inputVal = val.toUpperCase();
    // const renderBox = document.getElementById("boxx");
    // const box = renderBox.getElementsByClassName("saved_data_box");

    // for (var i = 0; i < box.length; i++) {
    //   var h6 = box[i].getElementsByTagName("h6")[0];
    //   if (h6) {
    //     var textValue = h6.innerHTML || h6.textContent;

    //     if (textValue.toUpperCase().indexOf(inputVal) > -1) {
    //       box[i].style.display = "flex";
    //     } else {
    //       box[i].style.display = "none";
    //     }
    //   }
    // }

    const filterData = allShapesData.filter((item) => {
      return Object.values(item.name)
        .join("")
        .toLowerCase()
        .includes(val.toLowerCase());
    });

    setShapeData(filterData);
    
  };

  const createCircleShapes = (radi, centt) => {
    const cent = JSON.parse(centt);
    const data = {
      shape: "circle",
      center: cent,
      coords: { radius: radi, center: cent },
    };

    dispatch(updateSelectedShapeData(data));
    dispatch(hideLoadShapes());
  };

  const createPolygonShapes = (shap, coor, cent) => {
    const center = JSON.parse(cent);
    const coordss = JSON.parse(coor);

    const data = {
      shape: shap,
      center: center,
      coords: { coord: coordss, center: center },
    };

    dispatch(updateSelectedShapeData(data));
    dispatch(hideLoadShapes());
  };

  // here we are writing the function to delete the selected shape ;

  const deleteSelectedShape = (id) => {
    setLoading(true);
    const url = `${api}shape-delete`;
    axios
      .post(
        url,
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setCallShapesApi(!callShapesApi);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("this is the err which we are getting here", err);
      });
  };

  const urlLin = `${api}get-shape-created`;

  useEffect(() => {
    axios
      .post(
        urlLin,
        { group: selectedSavedGroup },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.shape) {
          setShapeData(res.data.shape);
          setAllShapesData(res.data.shape);
        }
      });
  }, [callShapesApi, selectedSavedGroup]);

  useEffect(() => {
    const url = `${api}get-shape-group`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const val = res.data.groups;
          setSavedGroupName(val);
          if (res.data.groups.length != 0) {
            const anval = res.data.groups[0].sGroup;
            setSelectedSavedGroup(anval);
          }
        }
      });
  }, []);

  return (
    <>
      <div className="loadShape">
        <h4>{t("Shapes")}</h4>
        <div className="save_another_container">
          <div className="save_oldData">
            <h6>{t("Save Data")}</h6>

            <select
              value={selectedSavedGroup}
              onChange={(e) => updateSelectedGroup(e)}
              className="selecteds"
            >
              {savedGroupName &&
                savedGroupName.map((item, index) => {
                  return (
                    <option value={item.sGroup} key={index}>
                      {item.sGroup}
                    </option>
                  );
                })}
            </select>
            <div className="save_oldData_search">
              <img src={Search} alt="search icon" />
              <input
                type="text"
                placeholder={t("Search shape")}
                onChange={filterShape}
              />
            </div>
          </div>
          <div className="saved_data" id="boxx">
            {shapeData &&
              shapeData.map((item, index) => {
                var area = "";
                if (item.type === "circle") {
                  var rad = item.radius;
                  var are = 3.14 * rad * rad;
                  var arrr = are / 1000000;
                  area = `${arrr.toFixed(2)} km`;
                } else {
                  area = item.area;
                }
                return (
                  <div className="saved_data_box" key={index}>
                    <div
                      className="save_datass"
                      onClick={
                        item.type === "circle"
                          ? (e) => {
                              createCircleShapes(item.radius, item.center);
                            }
                          : (e) =>
                              createPolygonShapes(
                                item.type,
                                item.coord,
                                item.center
                              )
                      }
                    >
                      <div className="saved_data_box_left">
                        <h6>{item.name}</h6>
                        <span>{area} </span> <br />
                        <span style={{ fontSize: "11px", marginBottom: "8px" }}>
                          {item.date}
                        </span>
                      </div>
                      <div className="saved_data_box_right">
                        <h3>{index + 1}</h3>
                      </div>
                    </div>
                    {/* here we are adding the cut button */}
                    <div
                      className="save_cut"
                      onClick={() => deleteSelectedShape(item.id)}
                    >
                      <img src={Minus} alt="sub icons" />
                    </div>
                  </div>
                );
              }) }
            {shapeData.length === 0 && (
              <h3
                style={{
                  fontSize: "23px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {t("No shapes available !")}
              </h3>
            )}
          </div>
        </div>

        {/* here we are adding the loader */}
        {loading && <Loader />}
      </div>
    </>
  );
};

// exporting the component ;
export default LoadShapepart;
