// In this file we are going to create popup which will be used to save the created shapes ;

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ShapesMap from "./ShapesMap";
import "./shapes.css";
import Search from "../Result/ResultImages/search.svg";
import Cut from "../Result/ResultImages/cut.svg";
import axios from "axios";
import Loader from "../../utils/Loader";
import { showNotification, updateSelectedShapeData } from "../../actions";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Minus from "../mainimages/minus.png";

const SaveShape = (props) => {
  const [loading, setLoading] = useState(false);
  const api = useSelector((state) => state.apiStore.url);
  const { t, i18n } = useTranslation();
  const Token = useSelector((state) => state.authenication.token);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const urlLink = `${api}shape-created`;

  const coords = useSelector((state) => state.saveShape.data);
  const [shapeName, setShapeName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedSavedGroup, setSelectedSavedGroup] = useState("");
  const [description, setDescription] = useState("");
  const [savedGroupName, setSavedGroupName] = useState([]);

  const updateSelectedGroup = (e) => {
    setSelectedSavedGroup(e.target.value);
  };

  const shape = coords.type;

  const saveFile = () => {
    if (shapeName.length < 3) {
      setErrors("Please enter a valid name");
    } else if (groupName.length == 0) {
      setErrors("Groupname is required");
    } else {
      setLoading(true);
      if (shape === "polygon") {

        var today = new Date();
        var dd = today.getDate() 
        var mm = today.getMonth() + 1 
        var yyyy = today.getFullYear();
  
        today = dd + "-" + mm + "-" + yyyy;


        let latlngs = "";
        const shapeData1 = coords.coordinates;
        const shapeData = [...shapeData1, shapeData1[0]];
        for (let i = 0; i < shapeData.length; i++) {
          latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
        }

        latlngs = latlngs.replace(/,$/, "");

        const data = {
          center: coords.center,
          coordinates: coords.coordinates,
          type: coords.type,
          name: shapeName,
          latlng: latlngs,
          group: groupName,
          date : today ,
          unique_id: coords.unique_id,
        };

        console.log(data , 'rectangle data')

        axios
          .post(urlLink, data, {
            headers: {
              Authorization: `Bearer ${Token}`,
              Accept: "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            setLoading(false);
            if (res.data.success === true) {
              setErrors("");
              props.closePopups();
              setLoading(false);
              dispatch(
                showNotification(
                  t("This polygon has been saved successfully !")
                )
              );
            } else if (res.data.msg == "This name is already exists !") {
              setErrors("This name already exists!");
            } else {
              setLoading(false);
              setErrors("Something wrong with the server");
            }
          })
          .catch((err) => {
            setLoading(false);
            alert("Something wrong with the server !");
          });
      } else if (shape === "circle") {

        var today = new Date();
        var dd = today.getDate() 
        var mm = today.getMonth() + 1 
        var yyyy = today.getFullYear();
  
        today = dd + "-" + mm + "-" + yyyy;

        const data = {
          lat: coords.center[0],
          lng: coords.center[1],
          center: { lat: coords.center[0], lng: coords.center[1] },
          radius: coords.radius,
          type: coords.type,
          name: shapeName,
          group: groupName,
          date : today ,
          unique_id: coords.unique_id,
        };

        console.log(data , 'rectangle data')

        axios
          .post(urlLink, data, {
            headers: {
              Authorization: `Bearer ${Token}`,
              Accept: "application/json",
            },
          })
          .then((res) => {
            setLoading(false);
            setErrors("");
            if (res.data.success) {
              props.closePopups();
              dispatch(
                showNotification(t("This circle has been saved successfully !"))
              );
            } else if (res.data.msg == "This name is already exists !") {
              setErrors("This name already exists");
            } else {
              setLoading(false);
              setErrors("Something wrong with the server");
            }
          })
          .catch((err) => {
            setLoading(false);
            alert("Something wrong with the server!");
          });
      } else if (shape === "rectangle") {

        let latlngs = "";
        const shapeData1 = coords.coordinates;
        const shapeData = [...shapeData1, shapeData1[0]];
        for (let i = 0; i < shapeData.length; i++) {
          latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
        }

        latlngs = latlngs.replace(/,$/, "");

        var today = new Date();
        var dd = today.getDate() 
        var mm = today.getMonth() + 1 
        var yyyy = today.getFullYear();
  
        today = dd + "-" + mm + "-" + yyyy;

        const data = {
          center: coords.center,
          coordinates: coords.coordinates,
          type: coords.type,
          name: shapeName,
          latlng: latlngs,
          group: groupName,
          date : today ,
          unique_id: coords.unique_id,
        };

        axios
          .post(urlLink, data, {
            headers: {
              Authorization: `Bearer ${Token}`,
              Accept: "application/json",
            },
          })
          .then((res) => {
            setLoading(false);
            console.log(res);
            if (res.data.success === true) {
              setErrors("");
              props.closePopups();
              dispatch(
                showNotification(
                  t("This rectangle has been saved successfully !")
                )
              );
            } else if (res.data.msg == "This name is already exists !") {
              setErrors("This name already exists");
            } else {
              setLoading(false);
              alert("Something went wrong with the server");
            }
          })
          .catch((err) => {
            setLoading(false);
            alert("Something wrong with the server !");
          });
      }
    }
  };

  const [shapeData, setShapeData] = useState([]);
  const [callShapesApi, setCallShapesApi] = useState(false);

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

  const createCircleShapes = (radi, centt) => {
    const cent = JSON.parse(centt);
    const data = {
      shape: "circle",
      center: cent,
      coords: { radius: radi, center: cent },
    };

    dispatch(updateSelectedShapeData(data));
    props.closePopups();
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
    props.closePopups();
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
        
      });
  };

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

  return (
    <>
      <Modal
        show={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="control_container"
      >
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
                {t("Shape Type")} : &nbsp; {shape}
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
                type="text"
                value={shapeName}
                style={{ marginBottom: "-1px" }}
                onChange={(e) => setShapeName(e.target.value)}
                placeholder={t("Enter shape name")}
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
                      <option value={item.sGroup} key={index}>
                        {item.sGroup}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="saveShape_container_right">
              <ShapesMap />
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
                                  item.cordinates,
                                  item.center
                                )
                        }
                      >
                        <div className="saved_data_box_left">
                          <h6>{item.name}</h6>
                          <span>{area} </span> <br />
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
                      {/* here we are adding the cut button */}
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
            onClick={() => props.closePopups()}
          >
            <img src={Cut} alt="cut icons" />
          </div>

          {/* here we are adding the loader to get better user experience */}
          
          {loading && <Loader />}
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default SaveShape;
