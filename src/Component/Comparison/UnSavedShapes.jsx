// here we are getting all the unsaved shapes ;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Remove from "./image/remove.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/Loader";

const UnSavedShapes = (props) => {
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedShape, setSelectedShape } = props;
  const [randomInt, setRandomInt] = useState(1);
  const { t , i18n} = useTranslation();

  const urlLink = `${api}get-shapes`;

  const headers = {
    Authorization: `Bearer ${Token}`,
    Accept: "application/json",
  };

  const getUnsavedShapes = () => {
    setLoading(true);
    axios
      .get(urlLink, { headers: headers })
      .then((res) => {
        console.log(res)
        setLoading(false);
        if (res.data.success) {
          const val = res.data.shapes;
          setShapes(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "there is something error with the network ;");
      });
  };

  useEffect(() => {
    getUnsavedShapes();
  }, [randomInt]);


  const selectShape = (itm, index) => {
    if (selectedShape.some((item) => item.unique_id === itm.unique_id)) {
      const filterData = selectedShape.filter(
        (item, index) => item.unique_id !== itm.unique_id
      );
      setSelectedShape(filterData);
    } else {
      setSelectedShape((item) => [...item, itm]);
    }
  };
  
  const removeUrl = `${api}delete-shapes`;

  const removeShape = (item) => {
    setRandomInt((int) => {
      return int + 2;
    });
    setLoading(true);
    const data = { id: item.id };

    axios
      .post(removeUrl, data, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "this is the error ");
      });
  };

  return (
    <>
      {shapes && (
        <div className="unsaved">
          <h5 className="unsaved_heading">{t("Unsaved Shapes")}</h5>
          {shapes.map((item, index) => {
            return (
              <div className="unsaved_box">
                <input
                  type="checkbox"
                  onChange={(e) => selectShape(item, index)}
                  checked={selectedShape.some(
                    (itmm) => itmm.unique_id === item.unique_id
                  )}
                />

                <h6 className="fist">{item.type}</h6>
                <h6 className="sec">{item.date} </h6>
                <h6 className="thrd">{item.area} </h6>
                
                <img
                  src={Remove}
                  alt="remove icon"
                  className="remove_icon"
                  onClick={() => removeShape(item)}
                />
              </div>
            );
          })}

          {loading && <Loader />}
        </div>
      )}
    </>
  );
};


export default UnSavedShapes;
