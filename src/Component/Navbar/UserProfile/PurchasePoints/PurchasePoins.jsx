// here we are going to create a component which will keep the record of all the points of the user ; and this is simple popup ;

import React , {useState} from "react";
import { Modal } from "react-bootstrap";
import "./purchasePoints.css";
import Cut from "../UserImages/cut.svg";
import { cutProfileScreen  , showNotification, ShowSweetAlert , updateWalletData} from "../../../../actions";
import Loader from "../../../../utils/Loader";
import { useDispatch , useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";

const PurchasePoints = () => {
  const dispatch = useDispatch();
  const [points , setPoints] = useState()
  const [selectedPoints , setSelectedPoints] = useState(0);
  const [amount , setAmount] = useState("000");
  const [loading , setLoading] = useState(false);
  const {t , i18n} = useTranslation();
  
  // getting the wallet data to update the wallet ;
  const purchasedPoints = selectedPoints;
  const walletPoints = useSelector((state) => state.walletData.points)
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const [purchasePoints , setPurchasePoints] = useState([])
  const [userTotalpoints ,setUserTotalPoints] = useState(walletPoints)

  const  updateSelectedPoints = (e) =>{
    setSelectedPoints(e.target.id )
    setAmount(e.target.id / points)
  }
  const userPoints = useSelector((state) => state.walletData.points)

 
  // here we are writng the function which will help us to purchase the points ;

  const pointsPurchased = async ()  =>{
    setLoading(true);
    const data = {purchase_point  : selectedPoints }
    const urlLink = `${api}purchase-point`;

    if(!selectedPoints){
      dispatch(showNotification(t("Please Select Points!")));
      setLoading(false)
    }
    else {

  fetch(urlLink, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {"Content-type": "application/json; charset=UTF-8" , "Authorization" : `Bearer ${Token}`}
})
.then(response => response.json()) 
.then(json => {
  if(json.succes){
    setLoading(false)
    dispatch(ShowSweetAlert(` ${t("Thank you for purchasing")} ${selectedPoints} ${t("points")}`))
    dispatch(cutProfileScreen())
    dispatch(updateWalletData(parseInt(purchasedPoints) + walletPoints))
  }
  else {
    setLoading(false)
  }
})
.catch(err =>{ 
  setLoading(false)
  console.log(err)});
  }
}

  // here we calling the api which will define the cost price of the points ;
 
  React.useEffect(() => {
    const urlLink = `${api}sar-point`;
    axios.get(urlLink , {
      headers : {
        Authorization : `Bearer ${Token}`,
        Accept : "application/json" ,
      }
    })
    .then((res)=>{
      console.log(res)
      const data = res.data.data[0].points_sar;
      setPoints(data);
    })
  }, [])

  // here we are calling the api which will be used to show the points ;

  
  React.useEffect(() =>{
    setLoading(true)
    const urlLink = `${api}purchase-package`
    axios.get(urlLink , {
      headers : {
        Authorization : `Bearer ${Token}` ,
        Accept : "application/json"
      }
    })
    .then((res) =>{
      if(res){
        setLoading(false)
      }
      else {
        setLoading(false)
      }
      var value =  res.data.data;
      setPurchasePoints(value);
    })
    .catch((err) =>{
      dispatch(showNotification("Network error !"))
      setLoading(false)
      dispatch(cutProfileScreen())
    })
    
  },[])


  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="purchasepoints">
            <h4 className="purchasepoints_heading">{t("Purchase Points")}</h4>

            <div className="purchasepoints_box">
              { purchasePoints && purchasePoints.map((item , index) =>{
                return(
                  <label htmlFor={item.points} key={index}>
                <h6>{item.points} {t("Points")}</h6>
                <input type="radio" id={item.points} name = "points"  onChange = {updateSelectedPoints}/>
              </label>
                )
              })}
              
             
            </div>

            <div className="purchasepoints_total">
                <h5>{t("SAR")}</h5>
                <h5>{amount}</h5>
            </div>
            <div className="purchasepoints_cost">
              <div className="purchasepoints_cost_div1">
               <h6 style={{fontSize : 15 , width : "125%"}}>{t("Your Remaining Points")} : <span style={{color : "green"}}> {userPoints}</span> </h6>
               <h6 className="pointss">{t("1 SAR")} = {points} {t("Points")}</h6>
               </div>

              <div className="purchasepoints_cost_div">
               <h6 style={{fontSize : 15 , textAlign : "left" }}>{t("Your Total Points")} : <span style={{color : "green"}}> {userPoints + parseInt(selectedPoints)}</span> </h6>
              
               </div>
            </div>

            <button className="purchasepoints_btn" onClick = {pointsPurchased} >
                {t("Buy now")}
            </button>

            {/* here we are adding the cut option  */}

            <div className="purchasepoints_cut" onClick={() => dispatch(cutProfileScreen())}>
                <img src={Cut} alt="cut icon" />
            </div>

            {/* here we are adding the loader ; */}
            {loading && <Loader />}
        </div>
      </Modal>
    </>
  );
};

// exporting the earnedPoints ;
export default PurchasePoints;
