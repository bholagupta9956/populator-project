// here we are  creating a component which will be used for the contry code search ;
import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Search from "./LoginImages/search.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cut from "./LoginImages/cut.svg"
import { closeCountryCode, updateCountryCode } from "../../actions";

const CountryCode = () => {
  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch();

  const myState = useSelector((state) => state.countryCodeHandler.show)
  const [counteryCode, setCountryCode] = useState([]);
  const [countryName , setCountryName] = useState("")

  useEffect(() => {
    const urlLink = `${api}get-country`;
    axios.get(urlLink).then((res) => {
      const value = res.data.data;
      setCountryCode(value);
    });
  }, []);

  const changeCountryCode = (img , code , digit) =>{
      const data = {image : img , phone_code : code , digits : digit}

      dispatch(updateCountryCode(data));
  }

  const filterCountry = (e) =>{
      const text = e.target.value
    setCountryName(text);
    var parent = document.getElementsByClassName("countryOptions");
    
    const textValue = text.toUpperCase();

  
    for(var i = 0 ; i < parent.length ; i++){
        var span = parent[i].getElementsByTagName("span")[0].innerHTML;
        if(span.toUpperCase().indexOf(textValue) > -1){
            parent[i].style.display  = "flex"
        }
        else {
            parent[i].style.display  = "none"
        }
    }
  }

  return (
    <>
      <Modal
        show={myState}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="countryCode">
          <div className="countrySearch">
            <input type="text" onChange = {filterCountry}/>
            <img src={Search} alt="search img" />
          </div>
          <div className="countrySelect">
            {counteryCode && counteryCode.map((item, index) => {
              return (
                <div className="countryOptions" key={index} onClick = {() => changeCountryCode(item.fullimage , item.phone_code , item.total_digit)}>
                  <img src={item.fullimage} />
                  <h6>{item.phone_code}</h6>
                  <span id="country_name">{item.country_name}</span>
                </div>
              );
            })}
          </div>
          <img src={Cut} alt="cut img" className = 'country_code_cut' onClick = {() => dispatch(closeCountryCode())}/>
        </div>
      </Modal>
    </>
  );
};

export default CountryCode;
