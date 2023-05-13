import React, { useState, useEffect } from "react";
import "./load.css";
import Search from "../Result/ResultImages/search.svg";
import { useTranslation } from "react-i18next";
import Minus from "../mainimages/minus.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../../utils/Loader";
import {
  hideCatchmentSaveFile,
  hideLoadShapes,
  showSelectedCatchmentOnmap,
  updateSelectedCatchment,
  updateSelectedShapeData,
} from "../../actions";

const LoadCatchmentPart = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [selectedSavedGroup, setSelectedSavedGroup] = useState("");
  const [savedGroupName, setSavedGroupName] = useState([]);
  const Token = useSelector((state) => state.authenication.token);
  const api = useSelector((state) => state.apiStore.url);
  const [shapeData, setShapeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [callShapesApi, setCallShapesApi] = useState(false);
  const [allShapesData , setAllShapesData] = useState([])

  const updateSelectedGroup = (e) => {
    setSelectedSavedGroup(e.target.value);
  };

  const filterShapes = (e) => {
    const val = e.target.value;
    // const inputVal = val.toUpperCase();
    // const renderBox = document.getElementById("boxxx");
    // const box = renderBox.getElementsByClassName("saved_data_boxx");

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
    dispatch(hideLoadShapes());
  };

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
          if(res.data.groups.length != 0){
          const anval = res.data.groups[0].cGroup;
          setSelectedSavedGroup(anval);
          }
        }
      });
  }, [])

  useEffect(() => {
    const urlLink = `${api}catchment-shape-get`;
    setLoading(true)
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
        setLoading(false)
        if (res.data.success) {
          const val = res.data.data;
          setShapeData(val);
          setAllShapesData(val)
        }
      })
      .catch((err) =>{
        setLoading(false)
      })
  }, [callShapesApi, selectedSavedGroup]);

  return (
    <>
      <div className="loadCatchment">
        <h4>{t("Catchments")}</h4>

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
                placeholder={t("Search catchment")}
               onChange={filterShapes}
              />
            </div>
          </div>
          <div className="saved_data" id="boxxx">
            {shapeData &&
              shapeData.map((item, index) => {
                
                return (<>
                  <div className="saved_data_box saved_data_boxx" key={index} id="">
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
                          {item.type} Based
                        </span>{" "}
                        <br />
                        <span style={{ fontSize: "11px", marginBottom: "8px" }}>
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
                  </>);
              })}
            {shapeData.length === 0 && (
              <h3
                style={{ fontSize: "23px", textAlign: "center", width: "100%" }}
              >
                {t("No shapes available !")}
              </h3>
            )}
          </div>
        </div>

        {loading && <Loader/>}

      </div>
    </>
  );
};

// exporting the component ;
export default LoadCatchmentPart;
