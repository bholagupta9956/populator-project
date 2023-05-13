// In this is the flyers which we are are going to show on the main component ;
import React,{useEffect, useState} from "react";
import { Modal } from "react-bootstrap";
import "./flyers.css";
import Cut from "../ControlPanel/ControlImages/cut.svg";
import { useSelector , useDispatch } from "react-redux";
import axios from "axios"
import Loader from "../../utils/Loader";
import { cutProfileScreen } from "../../actions";

const Flyers = () => {
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pdfPath,setPdfPath] = useState("https://e-mozpos.com/populator/admin/public/flyersPDF/41946.pdf");

  const urlLink = `${api}flyers`;
useEffect(() => {
  setLoading(true)
  axios.get(urlLink , {
    headers: {
      Authorization: `Bearer ${Token}`,
      Accept: "application/json",
    },
  })
  .then((res) => {
     if(res.data.data){
      const value = res.data.data[0].fullflyers;
      setPdfPath(value)
      setLoading(false)
     }
     else {
       setLoading(false)
     }
    
  })
  .catch((err) =>{
    setLoading(false)
  })
},[])

 
  return (
    <>
      <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="flyer_container">
         
          <iframe
            src={pdfPath}
            width="70%"
            height="90vh"
            className="flyers"
            style={{ border: "none", background: "white" }}
            allowFullScreen
          ></iframe>

          <div className="cut_option" onClick={() => dispatch(cutProfileScreen())}>
            <img src={Cut} alt="Cut icon" />
          </div>

          {loading && <Loader/>}
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default Flyers;
