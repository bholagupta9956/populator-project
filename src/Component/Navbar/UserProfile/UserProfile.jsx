// Here we are going to create userProfile which will show all detials of the user ;

import React, { useEffect, useState } from "react";
import "./user.css";
import { Modal } from "react-bootstrap";
import SaudiMen from "./UserImages/saudimen.svg";
import Enterpreniour from "./UserImages/enterpreneur.svg";
import Government from "./UserImages/government.svg";
import Graduated from "./UserImages/graduated.svg";
import Corporation from "./UserImages/corporation.svg";
import UserProfileIcon from "./UserImages/user.png";
import Others from "./UserImages/others.svg";
import Cut from "./UserImages/cut.svg";
import Logo from "../../Loginpopup/LoginImages/Logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  cutProfileScreen,
  showNotification,
  showCountryCode,
} from "../../../actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  ShowSweetAlert,
  updateUserImage,
  updateUserInfo,
} from "../../../actions";
import Loader from "../../../utils/Loader";

const UserProfile = () => {
  const { t, i18n } = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const country_code = useSelector((state) => state.countryCodeHandler.data);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authenication.token);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    image: null,
    name: "",
    email: "",
    phone_code: "",
    phone_no: "",
    designation: "",
  });

  const [designation, setDesignation] = useState({
    student: false,
    enterpreneur: false,
    corporation: false,
    government: false,
    others: false,
  });

  useEffect(() => {
    setLoading(true);
    const urlLink = `${api}profile`;
    axios
      .get(urlLink, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res, "this is the profile api res");
        if (res) {
          setLoading(false);
        }
        const usersData = res.data.user;
        dispatch(updateUserInfo(usersData));
        dispatch(updateUserImage(usersData.fullimage));
        setUserDetails({
          ...userDetails,
          image: usersData.fullimage,
          name: usersData.name,
          email: usersData.email,
          phone_code: usersData.phone_code,
          phone_no: usersData.phone_no,
          designation: usersData.designation,
        });

        var desig = res.data.user.designation;
        setDesignation({
          desig: true,
        });
      })
      .catch((err) => {
        setLoading(false);
        dispatch(showNotification(t("Please check your internet connection")));
        dispatch(cutProfileScreen());
      });
  }, []);

  // here we are writing the function which will update the profile ;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userDetails.name) {
      alert(t("Name is required"));
    } else if (userDetails.name.length < 2) {
      alert(t("name must be greater than 3 character"));
    } else if (userDetails.phone_code === "") {
      alert("Please Enter Phone code");
    } else if (userDetails.phone_no.length !== country_code.digits) {
      alert(`Phone number must be of ${country_code.digits} digit`);
    } else {
      const url = `${api}profile-edit`;
      setLoading(true);

      const data = {
        name: userDetails.name,
        designation: userDetails.designation,
        phone_code: userDetails.phone_code,
        phone_no: userDetails.phone_no,
      };

      axios
        .post(url, data, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res) {
            setLoading(false);
          }
          console.log(res, "response sent by the profile ");

          if (res.data[0].status === 200) {
            dispatch(cutProfileScreen());
            dispatch(ShowSweetAlert(t("Profile Updated Successfully")));
          }
        });
    }
  };

  // here we are writing the function just for uploading the imaages ;

  const upload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserDetails({ ...userDetails, image: reader.result });
        const formData = new FormData();
        dispatch(updateUserImage(reader.result));

        const data = e.target.files[0];
        formData.append("image", e.target.files[0], e.target.files[0].name);

        const url = `${api}profile-picture-update`;
        axios
          .post(url, formData, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const msg = res.data.success;
            console.log(res);
            if (msg === true) {
              // dispatch(cutProfileScreen());
              // dispatch(ShowSweetAlert("Picture Updated Successfully"));
            }
          });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updatePhoneNumber = (e) => {
    setUserDetails((item) => {
      return { ...item, phone_no: e.target.value };
    });
  };

  useEffect(() => {
    setUserDetails((item) => {
      {
        return { ...item, phone_code: country_code.phone_code };
      }
    });
  }, [country_code]);

  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="userProfile">
          <div className="userProfile_logo">
            <img src={Logo} alt="logo icon" />
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="userProfile_user">
              <div className="userProfile_user_img">
                {userDetails.image ? (
                  <img
                    src={userDetails.image}
                    alt="saudimen img"
                    width="76px"
                  />
                ) : (
                  <img src={UserProfileIcon} alt="saudimen img" width="76px" />
                )}
              </div>
              <div className="userProfile_details">
                <div className="userProfile_details_name">
                  <h5 style={{ textTransform: "capitalize" }}>
                    {userDetails.name}
                  </h5>
                </div>
                <div className="userProfile_details_files">
                  <label htmlFor="upload">{t("Upload Photos")}</label>
                  <input
                    type="file"
                    name="myImage"
                    accept="image/x-png,image/jpeg"
                    id="upload"
                    onChange={upload}
                  />
                  <span>{t("Acceptable format jpg/png only !")}</span>
                </div>
              </div>
            </div>

            {/* moving second step */}
            <div className="userProfile_form">
              <h5>{t("ACCOUNT INFORMATION")}</h5>
              <div className="userProfile_form_container">
                <div className="userProfile_form_container_row1">
                  <div className="userProfile_form_container_row1_label">
                    <label htmlFor="firstname">{t("Name")}</label>
                    <input
                      type="text"
                      id="firstname"
                      placeholder="Abdullah"
                      value={userDetails.name}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* moving towards the second row */}
              <div className="userProfile_form_container_row2">
                <div className="userProfile_form_container_row2_label">
                  <label htmlFor="email">{t("Email")}</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="abdullah@gmail.com"
                    value={userDetails.email}
                    readOnly={true}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                  />
                </div>
                <div className="userProfile_form_container_row2_label">
                  <div className="userProfile_form_container_row2_label_country_code">
                    <label htmlFor="country_code">{t("Code")}</label> <br />
                    <div
                      name="country_code"
                      id="country_code"
                      onClick={() => dispatch(showCountryCode())}
                      readOnly={true}
                    >
                      <span name="country_code" style={{ textAlign: "center" }}>
                        {userDetails.phone_code[0] == "+" ? userDetails.phone_code : `+${userDetails.phone_code}`}
                      </span>
                    </div>
                  </div>
                  <div className="userProfile_form_container_row2_label_number">
                    <label htmlFor="number">{t("Number")}</label>
                    <input
                      type="number"
                      placeholder="5478214596"
                      value={userDetails.phone_no}
                      onChange={(e) => updatePhoneNumber(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* moving towards the third row */}

            <div className="userProfile_designation" type="select">
              <div className="userProfile_designation_box">
                <label htmlFor="student">
                  <img src={Graduated} alt="student icon" />
                  <input
                    type="radio"
                    id="student"
                    name="designation"
                    value="student"
                    checked={
                      userDetails.designation.toLowerCase() === "student"
                    }
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        designation: e.target.value,
                      })
                    }
                  />
                </label>
                <span>{t("Student")}</span>
              </div>

              <div className="userProfile_designation_box">
                <label htmlFor="enterpreneur">
                  <img
                    src={Enterpreniour}
                    alt="enterpreneur icon"
                    style={{ width: "14.6px" }}
                  />
                  <input
                    type="radio"
                    id="enterpreneur"
                    name="designation"
                    value="enterpreneur"
                    checked={
                      userDetails.designation.toLowerCase() === "enterpreneur"
                    }
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        designation: e.target.value,
                      })
                    }
                  />
                </label>
                <span style={{ marginLeft: "-9px" }}>{t("Enterpreneur")}</span>
              </div>

              <div className="userProfile_designation_box">
                <label htmlFor="corporation">
                  <img
                    src={Corporation}
                    alt="corporation icon"
                    style={{ width: "21px" }}
                  />
                  <input
                    type="radio"
                    id="corporation"
                    name="designation"
                    value="corporation"
                    checked={
                      userDetails.designation.toLowerCase() === "corporation"
                    }
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        designation: e.target.value,
                      })
                    }
                  />
                </label>
                <span style={{ marginLeft: "-7px" }}>{t("Corporation")}</span>
              </div>

              <div className="userProfile_designation_box">
                <label htmlFor="government">
                  <img
                    src={Government}
                    alt="government icon"
                    style={{ width: "12px" }}
                  />
                  <input
                    type="radio"
                    id="government"
                    name="designation"
                    value="government"
                    checked={
                      userDetails.designation.toLowerCase() === "government"
                    }
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        designation: e.target.value,
                      })
                    }
                  />
                </label>
                <span style={{ marginLeft: "-8px" }}>{t("Government")}</span>
              </div>

              <div className="userProfile_designation_box">
                <label htmlFor="others">
                  <img src={Others} alt="Others icon" />
                  <input
                    type="radio"
                    id="others"
                    name="designation"
                    value="others"
                    checked={userDetails.designation.toLowerCase() === "others"}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        designation: e.target.value,
                      })
                    }
                  />
                </label>
                <span>{t("Others")}</span>
              </div>
            </div>

            {/* here we are going to define the button of this page */}

            <div className="userProfile_button">
              <button
                className="userProfile_button_cancel"
                onClick={() => dispatch(cutProfileScreen())}
              >
                {t("Cancel")}
              </button>
              <button className="userProfile_button_submit" type="submit">
                {t("Save Changes")}
              </button>
            </div>
          </form>
          {/* adding cut option in this panel */}

          <div
            className="userProfile_cut"
            onClick={() => dispatch(cutProfileScreen())}
          >
            <img src={Cut} alt="cut icon" />
          </div>

          {/* here we are adding a loader  */}
          {loading && <Loader />}
        </div>
      </Modal>
    </>
  );
};

// exporting the userprofile component ;
export default UserProfile;
