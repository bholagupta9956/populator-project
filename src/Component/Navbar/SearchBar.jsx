// This is the search bar which will be used inside the navbar with autocomplete search function and placelocator on search with keyword ;

import React, { useState, useEffect , useContext} from "react";
import "./Navbar.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Search from "./NavbarImages/search.svg";
import axios from "axios";
import Pin from "./NavbarImages/pin.svg"
import { usePlacesWidget } from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import Loader from "./NavbarImages/loading.png"
import {
  useMap,
  Marker,
  Tooltip,
} from "react-leaflet";
import { useTranslation } from "react-i18next";


const SearchBar = () => {
 
  const {t ,i18n} = useTranslation();
  const [spinner , setSpinner] = useState(false)
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [location, setLocation] = useState("");
  const map = useMap();
  const choosedLanguage = i18n.language;


  const getCoordintates = async (place = address) => {

    setSpinner(true);
     
     setTimeout(() => {
       setSpinner(false)
     }, 4000);
 
     

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyBd3k-GLkRUKVg_l-90CAScVYa6n94qXLw&hl=en`
    );

      console.log(res , "this is the response ")
    const placesCoordintes = res.data.results[0].geometry.location;
    const lat = placesCoordintes.lat;
    const lng = placesCoordintes.lng;
    map.flyTo([lat, lng], 14);
    setCoordinates([lat, lng]);
    map.removeLayer(Marker);
  };

  const { ref, autocompleteRef } = usePlacesWidget({
    

    apiKey: `AIzaSyBd3k-GLkRUKVg_l-90CAScVYa6n94qXLw&hl=en`,

    onPlaceSelected: (data) => {
      console.log(data)
      console.log(autocompleteRef , "this is the autoComplteref")
      const place = data.formatted_address;
      setLocation(place);
      getCoordintates(place);
    },

  });

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      getCoordintates();
    
  }
  };

  const inputEvent = (e) => {
    setAddress(e.target.value);
  };

  const SearchOnClick = () => {
    getCoordintates();
   
  };
  // adding marker icons css here ;

  let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = defaultIcon;


  return (
    <>
       <div className="navbar_container_left_col2">
        <input
          type="text"
          placeholder={t("Search Maps/Places")}
          onChange={inputEvent}
          onKeyPress={handleKeyPress}
          ref={ref}
        />

        {!spinner ? <img
          src={Search}
          alt="search icon"
          className="navbar_container_left_col2_search"
          onClick={SearchOnClick}
          title="Search Places"
        /> : 
        <img src={Loader} alt="loader icon" className="navbar_container_left_col2_search  spinner" /> }
      </div>

      <Marker position={coordinates} icon={defaultIcon}>
        <Tooltip>
          <span
            style={{
              color: "var(--blue)",
              fontSize: "18px",
              padding: "3px 8px",}}>
            {location}
          </span>
        </Tooltip>
      </Marker>

      {/* adding location marker to the search icons  */}

      
    </>
  );
};

export default SearchBar;

