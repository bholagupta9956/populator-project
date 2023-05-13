// here we are going to create a save file ;
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../catchment.css";
import Cut from "../images/cut.svg";
import axios from "axios";
import Minus from "../images/minus.png";
import CatchmentShapesMap from "./CatchmentShapesMap";
import Search from "../images/search.svg";
import Loader from "../../../utils/Loader";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  hideCatchmentSaveFile,
  showNotification,
  showSelectedCatchmentOnmap,
  updateSelectedCatchment,
} from "../../../actions";

const CatchmentSave = () => {
  const myState = useSelector((state) => state.catchmentData.saveFile);
  const [shapeName, setShapeName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [errors, setErrors] = useState("");

  const [loading, setLoading] = useState(false);
  const MapData = useSelector((state) => state.catchmentData.circleData);
  const [shapeData, setShapeData] = useState([]);
  const { t, i18n } = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const dispatch = useDispatch();
  const [callShapesApi, setCallShapesApi] = useState(false);
  const type = MapData.type;
  const center = MapData.center;
  const allSavedGroup = ["Skyview", "Lucknow", "Kolkata"];
  const [savedGroupName, setSavedGroupName] = useState([]);
  const [selectedSavedGroup, setSelectedSavedGroup] = useState("");

  const updateSelectedGroup = (e) => {
    setSelectedSavedGroup(e.target.value);
  };

  const saveFile = () => {
    const url = `${api}catchment-shape`;
    if (shapeName.length < 3) {
      setErrors(t("Please enter a valid name"));
    } else if (groupName.length == 0) {
      setErrors("Groupname is required");
    } else {
      setLoading(true);
      if (type === "radius") {
        const data = {
          radius: MapData.radius,
          lng: center[1],
          lat: center[0],
          name: shapeName,
          type: type,
          group: groupName,
          coord: MapData.radiusPolylineData,
          unique_id: MapData.unique_id,
        };


        axios
          .post(url, data, {
            headers: {
              Authorization: `Bearer ${Token}`,
              Accept: "application/json",
            },
          })
          .then((res) => {
            console.log(res, "this is the rs");
            setLoading(false);
            if (res.data.success) {
              setErrors("");
              dispatch(
                showNotification(t("This shape has been saved successfully"))
              );
              dispatch(hideCatchmentSaveFile());
            } else if (res.data.msg == "This name is already exists !") {
              setErrors(t("This name already exists"));
            }
          })
          .catch((err) => {
            setLoading(false);
            alert("something went wrong with the server");
          });
      } else if (type === "road") {
        let latlngs = "";
        const shapeData1 = MapData.polygonBorder.coords;
        const shapeData = [...shapeData1, shapeData1];
        for (let i = 0; i < shapeData.length; i++) {
          latlngs = latlngs + `${shapeData[i][1]} ${shapeData[i][0]},`;
        }

        latlngs = latlngs.replace(/,$/, "");

        const dta = {
          radius: MapData.radius,
          lng: center[1],
          lat: center[0],
          name: shapeName,
          type: type,
          latlng: shapeData1,
          group: groupName,
          coord: MapData.polygonLineData,
          unique_id: MapData.unique_id,
        };

        axios
          .post(url, dta, {
            headers: {
              Authorization: `Bearer ${Token}`,
              Accept: "application/json",
            },
          })
          .then((res) => {
            setLoading(false);
            console.log(res);
            if (res.data.success) {
              setErrors("");
              dispatch(
                showNotification(t("This catchment has been saved successfuly"))
              );
              dispatch(hideCatchmentSaveFile());
            } else if (res.data.msg == "This name is already exists !") {
              setErrors("This name already exists");
            }
          })
          .catch((err) => {
            setLoading(false);
            alert("something went wrong with the server");
          });
      }
    }
  };

  useEffect(() => {
    const urlLink = `${api}catchment-shape-get`;

    axios
      .post(
        urlLink,
        { group: selectedSavedGroup },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          const val = res.data.data;
          setShapeData(val);
        }
      });
  }, [callShapesApi, selectedSavedGroup]);

  // here we are getting the group name ;

  useEffect(() => {
    const url = `${api}get-catchment-group`;

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
            const anval = res.data.groups[0].cGroup;
            setSelectedSavedGroup(anval);
          }
        }
      });
  }, [MapData]);

  const filterShape = (e) => {
    const val = e.target.value;
    const inputVal = val.toUpperCase();
    const renderBox = document.getElementById("boxx");
    const box = renderBox.getElementsByClassName("saved_data_box");

    for (var i = 0; i < box.length; i++) {
      var h6 = box[i].getElementsByTagName("h6")[0];
      if (h6) {
        var textValue = h6.innerHTML || h6.textContent;

        if (textValue.toUpperCase().indexOf(inputVal) > -1) {
          box[i].style.display = "flex";
        } else {
          box[i].style.display = "none";
        }
      }
    }
  };

  const deleteSelectedShape = (id) => {
    setLoading(true);
    const urlLink = `${api}catchment-shape-delete`;
    axios
      .post(
        urlLink,
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
      });
  };

  const createCatchmentOnMap = (type, radius, lat, lng) => {
    const dta = {
      center: [lat, lng],
      radius: radius,
      type: type,
    };
    dispatch(showSelectedCatchmentOnmap());
    dispatch(updateSelectedCatchment(dta));
    dispatch(hideCatchmentSaveFile());
  };

  return (
    <>
      <Modal
        show={myState}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="control_container"
      >
        <div className="catchmentSave">
          <div className="saveShape">
            <h4 className="saveShape_heading">{t("Save Shape")}</h4>
            <div className="saveShape_container">
              <div className="saveShape_container_left">
                <h6>
                  {t("Shape Name")} :{" "}
                  <span style={{ color: "green", textTransform: "capitalize" }}>
                    {shapeName}
                  </span>
                </h6>

                <h6 className="shape_type">
                  {t("Shape Based")} : &nbsp; {type}
                </h6>
                {errors && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginBottom: "-6px",
                    }}
                  >
                    {errors}
                  </p>
                )}
                <input
                  style={{ marginBottom: "-1px" }}
                  type="text"
                  value={shapeName}
                  onChange={(e) => setShapeName(e.target.value)}
                  placeholder={t("Enter Catchment name")}
                />

                <input
                  type="text"
                  placeholder={t("Enter group name")}
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  style={{ marginBottom: "-1px" }}
                />
                <br />
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--gray)",
                    textAlign: "center",
                    marginTop: "8px !important",
                    alignSelf: "center",
                  }}
                >
                  or
                </span>
                <br />

                <select
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="selected"
                >
                  <option value="">{t("Choose Group")}</option>
                  {savedGroupName &&
                    savedGroupName.map((item, index) => {
                      return (
                        <option value={item.cGroup} key={index}>
                          {item.cGroup}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="saveShape_container_right">
                <CatchmentShapesMap />
              </div>
            </div>
            <div className="save_another_container">
              <button className="save_button" onClick={saveFile}>
                {t("Save Shape")}
              </button>

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
                        <option value={item.cGroup} key={index}>
                          {item.cGroup}
                        </option>
                      );
                    })}
                </select>

                <div className="save_oldData_search">
                  <img src={Search} alt="search icon" />
                  <input
                    type="text"
                    placeholder={t("Search Catchment")}
                    onChange={filterShape}
                  />
                </div>
              </div>
              <div className="saved_data" id="boxx">
                {shapeData &&
                  shapeData.map((item, index) => {
                    return (
                      <div className="saved_data_box" key={index}>
                        <div
                          className="save_datass"
                          onClick={() =>
                            createCatchmentOnMap(
                              item.type,
                              item.radius,
                              item.lat,
                              item.lng
                            )
                          }
                        >
                          <div className="saved_data_box_left">
                            <h6>{item.name}</h6>
                            <span
                              style={{
                                textTransform: "capitalize",
                                fontSize: "11px",
                              }}
                            >
                              {item.type} {t("Based")}
                            </span>{" "}
                            <br />
                            <span
                              style={{ fontSize: "11px", marginBottom: "8px" }}
                            >
                              {item.date}
                            </span>
                          </div>
                          <div className="saved_data_box_right">
                            <h3>{index + 1}</h3>
                          </div>
                        </div>

                        <div
                          className="save_cut"
                          onClick={() => deleteSelectedShape(item.id)}
                        >
                          <img src={Minus} alt="sub icons" />
                        </div>
                      </div>
                    );
                  })}
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

            {/* here we are going to add the cut options  */}
            <div
              className="savedCut_options"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(hideCatchmentSaveFile())}
            >
              <img src={Cut} alt="cut icons" />
            </div>

            {/* here we are adding the loader to get better user experience */}
            {loading && <Loader />}
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default CatchmentSave;
