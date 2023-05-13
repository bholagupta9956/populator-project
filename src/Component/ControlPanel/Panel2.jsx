// This is the what panel of the control panel part ;

import React, { useEffect, useState, createRef } from "react";
import Search from "./ControlImages/search.svg";
import Wallet from "./ControlImages/wallet.svg";
import Coins from "./ControlImages/money.png";
import axios from "axios";
import { useSelector } from "react-redux";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  hideControl,
  panel1,
  featureSelected,
  panel3,
  selectedFeatures,
  cuttedPoints,
  notification,
  showNotification,
  updatePoiCheckedData,
  updateCheckedData,
  updateSelectedData,
  showPoiDetails,
  hidePoiDetails,
  updateSubcategories,
  updateCheckedCategory,
  fullChecked,
  updateCalculatedPoints,
} from "../../actions/index";
import Loader from "../../utils/Loader";

import "./ControlPanel.css";

const Panel2 = (props) => {
  const { t, i18n } = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const choosedLanguage = i18n.language;

  const [checkData, setCheckData] = useState([]);
  const [servicesChecked, setServicesChecked] = useState([]);
  const [poiChecked, setPoiChecked] = useState([]);
  const [inputPoi, setInputPoi] = useState("");
  const [categoryChecked, setCategoryChecked] = useState([]);
  const templateDetailsUpdate = useSelector(
    (state) => state.selectedFeaturesRecord.template_details_api
  );

  // here we are fetching the data  which will show the files into the choose selection options ;

  // here we fetching the servies data by the api ;
  const [services, setServices] = useState([]);

  useEffect(() => {
    const urlLink = `${api}get-services`;
    setLoading(true);
    axios
      .get(urlLink, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
          "X-localization": choosedLanguage,
        },
      })
      .then((res) => {
        if (res) {
          setLoading(false);
        }
        setServices(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        alert("SomeThing wrong went with the server");
      });
  }, []);

  //   here we are fetching the data from poi ;

  const [poi, setPoi] = useState({});
  const [poiArray, setPoiArray] = useState({});
  const alreadySelectedSubcategories = useSelector(
    (state) => state.poiCheckedItem.checkedSubCategoriess
  );


  useEffect(() => {
    const urlLink = `${api}get-poi`;
    axios
      .get(urlLink, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
          "X-localization": choosedLanguage,
        },
      })
      .then((res) => {
        setPoi(res.data);

        const val = Object.entries(res.data);

        if (Object.entries(alreadySelectedSubcategories).length != 0) {
          setPoiArray(alreadySelectedSubcategories);
        } else {
          setPoiArray({});
          for (var i = 0; i < val.length; i++) {
            let nam = val[i][0];
            setPoiArray((itms) => {
              return { ...itms, [nam]: [] };
            });
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("SomeThing wrong went with the server", err);
      });
  }, []);

  // here we are calling the api for the get-template-details ;

  useEffect(() => {
    const urlLink = `${api}get-template-details`;

    fetch(urlLink, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${Token}`,
        lang: choosedLanguage,
      },
    })
      .then((response) => response.json())
      .then((orgdata) => {
        setAllData(orgdata.data);
        for (var l = 0; l < orgdata.data.length; l++) {
          var orgFormat = orgdata.data[l].details;
          var orgFormats = JSON.parse(orgFormat);

          setCheckFiles((item) => [...item, orgFormats]);
        }
      })
      .catch((err) => console.log(err));
  }, [templateDetailsUpdate]);

  // here we writng the function whenever the user select any items all the details of managing the points and storing the data into into an array ;

  const [selectedItems, setSelectedItems] = useState([]);
  const [servicesSelected, setServicesSelected] = useState([]);
  const [poiSelected, setPoiSelected] = useState([]);
  const TotalPoints = useSelector((state) => state.walletData.points);

  const [cutPoints, setCutPoints] = useState(0);
  const [Remainingpoints, setRemainingPoints] = useState(TotalPoints);

  // This is the function which will handle the updateServicesSelection;

  const updateServicesSelection =
    (points, id, nam, image, totalPoints = 0) =>
    (e) => {
      const name = e.target.name;
      points = parseInt(points);

      if (servicesChecked.indexOf(id) === -1) {
        setServicesChecked((item) => [...item, id]);
        setCutPoints(cutPoints + points);
        setRemainingPoints(Remainingpoints - points);
        setServicesSelected((itemID) => {
          return [...itemID, { name: nam, id: id, points: points, img: image }];
        });
      } else if (servicesChecked.indexOf(id) !== -1) {
        setAllChecked(false);
        const filterCheckData = servicesChecked.filter((ids) => ids !== id);
        setServicesChecked(filterCheckData);
        setCutPoints(cutPoints - points);

        setRemainingPoints(Remainingpoints + points);
        const filteredData = servicesSelected.filter((ids) => {
          return ids.id !== id;
        });
        setServicesSelected(filteredData);
      }
    };

  // This is the function which will handle the poiSelction function ;

  const updatePoiSelection =
    (points, id, cat, nam, image, count, totalPoints = 0) =>
    (e) => {
      const name = e.target.name;
      points = parseInt(points);

      if (poiChecked.indexOf(id) === -1) {
        setPoiChecked((item) => [...item, id]);
        setCutPoints(cutPoints + points);
        setRemainingPoints(Remainingpoints - points);
        setPoiArray((itms) => {
          return { ...itms, [cat]: [...itms[cat], id] };
        });
        setPoiSelected((itemID) => {
          return [...itemID, { name: nam, id: id, points: points, img: image }];
        });
      } else if (poiChecked.indexOf(id) !== -1) {
        setPoiChecked(false);
        const filterCheckData = poiChecked.filter((ids) => ids !== id);
        setPoiChecked(filterCheckData);
        setCutPoints(cutPoints - points);

        let removeDta = poiArray[cat];
        let ddd = removeDta.filter((itm) => itm != id);

        setPoiArray((itms) => {
          return { ...itms, [cat]: ddd };
        });
        setRemainingPoints(Remainingpoints + points);
        const filteredData = poiSelected.filter((ids) => {
          return ids.id !== id;
        });
        setPoiSelected(filteredData);
      }
    };

  // this function will be called when we are checking all the items at a time ;

  const updateServicesSelections = (points, id, nam, image) => {
    var pointss = parseInt(points);
    setCutPoints((item) => item + pointss);
    setRemainingPoints((item) => item - pointss);
    setServicesSelected((itemID) => {
      return [...itemID, { name: nam, id: id, points: pointss, img: image }];
    });
  };

  const updatePoiSelections = (points, id, nam, image) => {
    var pointss = parseInt(points);
    setCutPoints((item) => item + pointss);
    setRemainingPoints((item) => item - pointss);
    setPoiSelected((itemID) => {
      return [...itemID, { name: nam, id: id, points: pointss, img: image }];
    });
  };

  const deUpdateServicesSelection = () => {
    setCutPoints(0);
    setRemainingPoints(TotalPoints);
    setServicesSelected([]);
    setPoiSelected([]);
  };

  // this is the function which will open a popup when you click on the save button ;

  const showSelectedFeatures = () => {
    const allSelectedItems = {
      poi: poiSelected,
      services: servicesSelected,
      poiArray: poiArray,
      categoryCheck: categoryChecked,
    };
    dispatch(selectedFeatures());
    dispatch(featureSelected(allSelectedItems));
    dispatch(cuttedPoints(cutPoints));
  };

  // in check files we will include all files which have to be sheen into the choose selection options;

  const [allData, setAllData] = useState();
  const [checkFiles, setCheckFiles] = useState([]);

  const checkTheSelectedFile = (e) => {
    const id = e.target.value;

    setPoiChecked([]);
    setServicesChecked([]);
    setCutPoints(0);

    if (id >= 0) {
      setPoiChecked([]);
      setServicesChecked([]);
      setServicesSelected([]);
      setPoiSelected([]);
      const target = e.target;
      const name = target.getElementsByTagName("option")[id].innerHTML;

      for (var i = 0; i < allData.length; i++) {
        if (allData[i].name === name) {
          var formatData = allData[i].details;
          var orgFormats = JSON.parse(formatData);

          const alreadyCheckedPoiArray = orgFormats.poiArray;
          const alreadyCategoryChecked = orgFormats.categoryCheck;

          setCategoryChecked(alreadyCategoryChecked);

          setPoiArray(alreadyCheckedPoiArray);
          // for services ;
          const servicesData = orgFormats.services;

          for (var l = 0; l < servicesData.length; l++) {
            const orgDetails = servicesData[l];
            const orgNames = servicesData[l].id;

            setServicesChecked((item) => [...item, orgNames]);
            updateServicesSelections(
              orgDetails.points,
              orgDetails.id,
              orgDetails.name,
              orgDetails.img
            );
          }

          // for pois ;
          const poiData = orgFormats.poi;
          for (var l = 0; l < poiData.length; l++) {
            const orgDetails = poiData[l];

            const orgNames = poiData[l].id;
            setPoiChecked((item) => [...item, orgNames]);
            updatePoiSelections(
              orgDetails.points,
              orgDetails.id,
              orgDetails.name,
              orgDetails.img
            );
          }
        }
      }

      const value = checkFiles[id - 1];
      setSelectedItems(value);
    } else {
      // setShowPoi(true);
      // setShowServices(true);
      setCheckData([]);
      setCutPoints(0);
      setServicesSelected([]);
      setPoiSelected([]);
      setRemainingPoints(TotalPoints);
    }
  };

  // here we are writing the function which will send all the selected poi's id to the database for further use ;

  const saveSelectedPois = () => {
    const url = `${api}poi-data`;
    axios
      .post(
        url,
        { poi: poiChecked },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
            "X-localization": choosedLanguage,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("there is something error", err);
      });
  };

  // here we are writing function which will send the selection items to the store ;

  const sendSelectedItemToStore = () => {
    if (poiChecked.length > 1 || servicesChecked.length > 1) {
      dispatch(showNotification(t("Items selected Successfully ! ")));

      const allCheckedItems = { poi: poiChecked, services: servicesChecked };
      const allSelectedItems = { poi: poiSelected, services: servicesSelected };
      dispatch(fullChecked(AllChecked));
      dispatch(updateCheckedCategory(categoryChecked));
      dispatch(updateSubcategories(poiArray));
      dispatch(featureSelected(allSelectedItems));
      dispatch(updateCheckedData(allCheckedItems));
      dispatch(updateSelectedData(allSelectedItems));
      dispatch(updateCalculatedPoints(cutPoints));
      dispatch(cuttedPoints(cutPoints));
      saveSelectedPois();
    } else {
      
      dispatch(showNotification(t("Please select Items to apply !")));
    }
  };

  const [AllChecked, setAllChecked] = useState(false);

  // here we are writing to check all the box ;

  const checkAll = () => {
    if (!AllChecked) {
      setPoiArray({});
      const pois = Object.entries(poi);

      var poiObject = {};
      for (var i = 0; i < pois.length; i++) {
        var key = pois[i][0];
        var val = pois[i][1];

        var orgVal = [];
        for (var l = 0; l < val.length; l++) {
          orgVal.push(val[l].id);
        }
        poiObject[key] = orgVal;
      }

      setPoiArray(poiObject);

      setServicesChecked([]);
      setPoiChecked([]);
      setServicesSelected([]);
      setPoiSelected([]);
      setCategoryChecked([]);
      setCutPoints(0);

      if (services) {
        services.map((data, index) => {
          setServicesChecked((item) => [...item, data.id]);
          {
            updateServicesSelections(
              data.points,
              data.id,
              data.name,
              data.fullimage
            );
          }
        });
      }

      if (poi) {
        Object.entries(poi).map((key, index) => {
          setCategoryChecked((item) => {
            return [...item, key[0]];
          });
          key[1].map((items, index) => {
            setPoiChecked((item) => [...item, items.id]);
            updatePoiSelections(
              items.points,
              items.id,
              items.name,
              items.fullimage
            );
          });
        });
      }
      setAllChecked(true);
    } else {
      deUpdateServicesSelection();
      setAllChecked(false);
      setServicesChecked([]);
      setPoiChecked([]);
      setCategoryChecked([]);

      const val = Object.entries(poi);
      for (var i = 0; i < val.length; i++) {
        let nam = val[i][0];
        setPoiArray((itms) => {
          return { ...itms, [nam]: [] };
        });
      }
    }
  };

  // console.log(servicesChecked, "this is the services checkedData , ");
  // console.log(servicesSelected, "this is the services selected items");
  // console.log(categoryChecked, "thsi is the category checked");
  // console.log(poiChecked, "this is the poiChecked");
  // console.log(poiArray, "this is the poiArray");
  // console.log(cutPoints, "here we getting the actual cutted points");
  // console.log(poiSelected, "this is the poi Selected");
  // here we going to use the filter method to search the data from the poi ;

  var poiNames = [];

  const searchPoi = (e) => {
    const inputValue = e.target.value;
    setInputPoi(e.target.value);
    const inputData = inputValue.toUpperCase();
    const renderServices = document.getElementById("services");
    let box = renderServices.getElementsByClassName("panel2_row2_col");

    // here we are adding the filter option into the services part ;
    const categoriess = document.getElementsByClassName("categoriess");
    if (e.target.value.length > 0) {
      for (var k = 0; k < categoriess.length; k++) {
        categoriess[k].style.display = "none";
      }
    } else {
      for (var k = 0; k < categoriess.length; k++) {
        categoriess[k].style.display = "flex";
      }
    }

    for (var i = 0; i < box.length; i++) {
      var h6 = box[i].getElementsByTagName("h6")[0];

      if (h6) {
        var textValue = h6.innerHTML || h6.textContent;

        if (textValue.toUpperCase().indexOf(inputData) > -1) {
          box[i].style.display = "flex";
        } else {
          box[i].style.display = "none";
        }
      }
    }

    // from here we are going to add the filter option into the poi part;

    var poi = document.getElementById("poi");
    var poiApparels = poi.getElementsByClassName("poi_apparels");

    for (var i = 0; i < poiApparels.length; i++) {
      var poiApparelsBox =
        poiApparels[i].getElementsByClassName("poi_apparels_col");

      var poiApparelsMainBox =
        poiApparelsBox[0].getElementsByClassName("panel2_row2_col");

      for (var l = 0; l < poiApparelsMainBox.length; l++) {
        var names = poiApparelsMainBox[l].getElementsByTagName("h6")[0];

        if (names) {
          var textValue = names.innerHTML || names.textContent;

          if (textValue.toUpperCase().indexOf(inputData) > -1) {
            poiApparelsMainBox[l].style.display = "flex";
            poiNames.push(textValue);
          } else {
            const parents = poiApparelsMainBox[l].parentElement;
            var grandParent = parents.parentElement;
            // grandParent.style.display = "none"

            poiApparelsMainBox[l].style.display = "none";
          }
        }
      }
    }
  };

  // here we are creating a function which will be used to show the services

  const AllServices = (services) => {
    return services
      ? services.map((data, index) => {
          return (
            <div className="panel2_row2_col" key={index}>
              <label htmlFor={data.name}>
                <input
                  points={data.points}
                  type="checkbox"
                  id={data.name}
                  name={data.name}
                  onChange={updateServicesSelection(
                    data.points,
                    data.id,
                    data.name,
                    data.fullimage
                  )}
                  checked={
                    servicesChecked.indexOf(data.id) !== -1 ? true : false
                  }
                />
                <img src={data.fullimage} alt="School icon" />
                <div className="coins_details">
                  <img
                    src={Coins}
                    alt="coins icon"
                    style={{ width: "11px", marginBottom: "11px" }}
                  />
                  {data.points == 0 ? (
                    <span style={{ color: "green", marginLeft: "5px" }}>
                      FREE
                    </span>
                  ) : (
                    <span>{data.points}</span>
                  )}
                </div>
              </label>
              <h6 className="normalUp">{data.name}</h6>
            </div>
          );
        })
      : null;
  };

  // here we are writting function which will check the sub categories ;

  const checkSubCategories = (e, subname) => {
    setPoiArray((itms) => {
      return { ...itms, [subname]: [] };
    });
    const sub = Object.entries(poi);

    if (categoryChecked.indexOf(subname) === -1) {
      setCategoryChecked((item) => {
        return [...item, subname];
      });
      var ddd = poi[subname];

      ddd.map((item, index) => {
        setPoiArray((itms) => {
          return { ...itms, [subname]: [...itms[subname], item.id] };
        });
        setCutPoints((points) => points + item.points);
        setPoiChecked((itmss) => {
          return [...itmss, item.id];
        });

        setPoiSelected((itemID) => {
          return [
            ...itemID,
            {
              name: item.name,
              id: item.id,
              points: item.points,
              img: item.fullimage,
            },
          ];
        });
      });
    } else if (categoryChecked.indexOf(subname) !== -1) {
      setAllChecked(false);
      var ddd = poi[subname];

      const categoryArray = categoryChecked.filter((item) => item !== subname);
      setCategoryChecked(categoryArray);
      setPoiArray((itms) => {
        return { ...itms, [subname]: [] };
      });

      ddd.map((item) => {
        var indexx = poiChecked.indexOf(item.id);
        poiChecked.splice(indexx, 1);
        setCutPoints((points) => points - item.points);

        const poiSelectedIndexx = poiSelected.indexOf(item.id);
        poiSelected.splice(poiSelectedIndexx, 1);
      });
    }
  };

  // here we are going to render all the pois ;

  const AllPoi = (poi) => {
    return poi
      ? Object.entries(poi).map((key, index) => {
          const lll = poiArray[key[0]];
          var activeCategory;
          if (lll) {
            if (poiArray[key[0]].length === key[1].length) {
              //  setCategoryChecked((itms) => {return [...itms ,key[0]]})
              activeCategory = true;
            } else {
              activeCategory = false;
            }
          }

          return (
            <div className="poi_apparels" key={index}>
              <div className="categoriess" style={{alignItems : "center"}}>
                <label htmlFor={key[0]}>
                  <span
                    className="categories"
                    style={{ cursor: "pointer", marginRight: "12px" }}
                  >
                    {key[0]}
                  </span>
                </label>
                <input
                  type="checkbox"
                  id={key[0]}
                  checked={activeCategory}
                  onChange={(e) => checkSubCategories(e, key[0])}
                />
              </div>
              <div className="poi_apparels_col">
                {key[1].length > 0 &&
                  key[1].map((item, index) => {
                    return (
                      <div className="panel2_row2_col" key={index}>
                        <label htmlFor={item.name}>
                          <input
                            points={item.points}
                            type="checkbox"
                            id={item.name}
                            name={item.name}
                            checked={
                              poiChecked.indexOf(item.id) !== -1 ? true : false
                            }
                            onChange={updatePoiSelection(
                              item.points,
                              item.id,
                              key[0],
                              item.name,
                              item.fullimage,
                              key[1].length
                            )}
                          />
                          <img src={item.fullimage} alt="Bars icon" />
                          <div className="coins_details">
                            <img
                              src={Coins}
                              alt="coins icon"
                              style={{ width: "11px", marginBottom: "11px" }}
                            />
                            {item.points == 0 ? (
                              <span
                                style={{ color: "green", marginLeft: "5px" }}
                              >
                                FREE
                              </span>
                            ) : (
                              <span>{item.points}</span>
                            )}
                          </div>
                        </label>
                        <h6 className="normalUp">{item.name}</h6>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })
      : null;
  };

  // here we are writing a function which will move to the next panel ;
  
  const moveToPanel3 = () => {
    const allCheckedItems = { poi: poiChecked, services: servicesChecked };
    const allSelectedItems = { poi: poiSelected, services: servicesSelected };
    dispatch(fullChecked(AllChecked));
    dispatch(updateSubcategories(poiArray));
    dispatch(updateCheckedCategory(categoryChecked));
    dispatch(featureSelected(allSelectedItems));
    dispatch(updateCheckedData(allCheckedItems));
    dispatch(updateSelectedData(allSelectedItems));
    dispatch(panel3());
    saveSelectedPois();
    dispatch(cuttedPoints(cutPoints));
    dispatch(updateCalculatedPoints(cutPoints));
  };

  // here we are writing the function for handling the poi details ;

  const [poiDetailsChecked, setPoiDetailsChecked] = useState(false);

  const handlePoiDetails = () => {
    if (!poiDetailsChecked) {
      setPoiDetailsChecked(true);
      dispatch(showPoiDetails());
    } else if (poiDetailsChecked) {
      setPoiDetailsChecked(false);
      dispatch(hidePoiDetails());
    }
  };

  const poiDetailsState = useSelector((state) => state.poiHandler.poiDetails);

  useEffect(() => {
    setPoiDetailsChecked(poiDetailsState);
  }, [poiDetailsState]);

  // here we are writing the function just for calculating the points ;

  useEffect(() => {
    if (cutPoints < 0) {
      setCutPoints(0);
      setRemainingPoints(TotalPoints);
    } else {
      setRemainingPoints(TotalPoints - cutPoints);
      const allCheckedItems = { poi: poiChecked, services: servicesChecked };
      const allSelectedItems = { poi: poiSelected, services: servicesSelected };
      dispatch(featureSelected(allSelectedItems));
      dispatch(updateCheckedData(allCheckedItems));
      dispatch(updateSelectedData(allSelectedItems));
      dispatch(cuttedPoints(cutPoints));
    }
  }, [cutPoints, poiChecked]);

  // here we are getting the checked and the selected items from the store and will checked it automatically ;

  const alreadyCheckedPoi = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );
  const alreadyCheckedServices = useSelector(
    (state) => state.poiCheckedItem.servicesCheckedItems
  );
  const alreadySelectedPoi = useSelector(
    (state) => state.poiCheckedItem.poiSelectedItems
  );
  const alreadySelectedServices = useSelector(
    (state) => state.poiCheckedItem.servicesSelectedItemss
  );
  const totalCuttedPoints = useSelector(
    (state) => state.poiCheckedItem.calculatedPoints
  );

  const alreadyCheckedCategory = useSelector(
    (state) => state.poiCheckedItem.categoryChecked
  );

  const alreadyAllChecked = useSelector(
    (state) => state.poiCheckedItem.allcheckedd
  );

  useEffect(() => {
    setAllChecked(alreadyAllChecked);
    setCategoryChecked(alreadyCheckedCategory);
    setPoiChecked(alreadyCheckedPoi);
    setServicesChecked(alreadyCheckedServices);
    setPoiSelected(alreadySelectedPoi);
    setServicesSelected(alreadySelectedServices);
    setCutPoints(totalCuttedPoints);
    setRemainingPoints(TotalPoints - totalCuttedPoints);
  }, []);

  return (
    <>
      <div className="panel2">
        <div className="control_items">
          <div
            className="panel_row1"
            style={{ marginTop: "-8px", marginBottom: "-9px" }}
          >
            <h5>{t("Finding opportunities in as easy as 1-2-3")}</h5>
            <span>{t("Let's Explore")}</span>
          </div>
          <div className="panel_row2" style={{ marginTop: "-25px" }}>
            <div className="panel_row2_col1" onClick={() => dispatch(panel1())}>
              <input type="text" value="1" name="1" readOnly={true} />
              <h6>{t("WHERE")}</h6>
            </div>
            <div className="panel_row2_col2">
              <input
                type="text"
                value="2"
                name="2"
                readOnly={true}
                style={{
                  background: "var(--blue)",
                  color: "white",
                  border: "none",
                }}
              />
              <h6 style={{ color: "var(--blue)" }}>{t("WHAT")}</h6>
            </div>
            <div className="panel_row2_col3" onClick={() => dispatch(panel3())}>
              <input type="text" value="3" name="3" readOnly={true} />
              <h6>{t("HOW")}</h6>
            </div>
          </div>
        </div>
        <div className="panel2_row1" style={{ marginTop: "-9px" }}>
          <div className="panel2_row1_search">
            <div className="panel2_row1_search_img">
              <img src={Search} alt="search icon" />
            </div>
            <input
              type="text"
              placeholder={t("Search POI")}
              onChange={searchPoi}
            />
          </div>
          <button className="save_selection" onClick={showSelectedFeatures}>
            {t("Save Selection")}
          </button>
          <select name="items" onChange={(e) => checkTheSelectedFile(e)}>
            <option value="choose selection" id={0}>
              {t("Choose Selections")}
            </option>
            {allData &&
              allData.map((item, index) => {
                const names = item.name;
                return (
                  <option key={index} value={index + 1} id={index}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          <button className="apply_selection" onClick={sendSelectedItemToStore}>
            {t("Apply Selection")}{" "}
          </button>
        </div>

        <div className="panel2_checkbox" style={{ marginBottom: "-8px" }}>
          <label htmlFor="checkAll" style={{ margin: "4px 10px" }}>
            {t("Check All")}
          </label>
          <input
            type="checkbox"
            id="checkAll"
            onChange={checkAll}
            checked={AllChecked}
          />

          <div className="panel2_row2" id="services">
            {AllServices(services)}
          </div>

          {/* from here the POI part starts  */}
          <hr />

          <div className="poi" id="poi">
            <div className="poi_details">
              <h5>POI</h5>
              <div className="poi_switch">
                <Switch
                  checked={poiDetailsChecked}
                  onChange={handlePoiDetails}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
                />
                <span>{t("Poi with details")}</span>
              </div>
            </div>

            {AllPoi(poi)}
          </div>
        </div>

        {/* add wallet details and buttons  */}

        <div className="panel2_footer" style={{ marginTop: "12px" }}>
          <div className="panel2_footer_left">
            <div className="panel2_footer_left_row1">
              <div className="panel2_footer_left_row1_col1">
                <img src={Wallet} alt="wallet icons" width="39px" />
              </div>
              <div className="panel2_footer_left_row1_col2">
                <h6>{t("Balance")}</h6>
                <span>
                  {TotalPoints} {t("Points")}
                </span>
              </div>
            </div>
            <div className="panel2_footer_left_row2">
              <h6>{t("Total Withdrawal fro POI")} :</h6>
              <h5>
                -{cutPoints} <span>{t("Points")}</span>
              </h5>
            </div>
            <div className="panel2_footer_left_row3">
              <h6>{t("Total Remaining")} :</h6>
              <h5>
                {Remainingpoints} <span>{t("Points")}</span>
              </h5>
            </div>
          </div>
          {/* here we are adding a loader  */}
          {loading && <Loader />}
          <div className="control_btn">
            <button onClick={() => dispatch(panel1())}>{t("Back")}</button>
            <button onClick={moveToPanel3}>{t("Next")}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel2;
