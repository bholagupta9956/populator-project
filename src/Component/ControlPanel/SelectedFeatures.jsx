// in this component we will create a  popup which will save the selected items with name ;

import React , {useState} from "react"  ;
import  "./ControlPanel.css";
import { Modal } from "react-bootstrap";
import Cut from "./ControlImages/cut.svg";
import { hideScreenPopup , panel2 , updateGetTemplateDetails, showNotification } from "../../actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios"


const SelectedFeatures = () =>{

    const myState = useSelector((state) => state.selectedFeaturesRecord.data);
    const api = useSelector((state) => state.apiStore.url);
    const Token = useSelector((state) => state.authenication.token)
    const [errors , setErrors]  = useState("");
    
    const dispatch = useDispatch();

    const [fileName , setFileName] = useState("")

    const saveFile = (e) =>{
       
        if(!fileName || fileName.length < 3){
            alert("Please Enter a valid filename");
            setErrors("Please Enter a valid filename")
        }
        else {
        const urlLink = `${api}template-details`

        const data = {name : fileName , details : myState};
        axios.post( urlLink , data , {
            headers : { 
            Accept : 'application/json',
            Authorization : `Bearer ${Token}` ,
          },
        })
          .then((res) =>{
              console.log(res)
              if(res.data.success) {
                  dispatch(showNotification("File Saved Successfully !"))
                  dispatch(hideScreenPopup());
                  dispatch(updateGetTemplateDetails())
              }
              else if(res.data.msg === "This name is already exists !"){
                    setErrors("This name  already exists !")
              }
              else {
                  setErrors("There is something error with the server ;")
              }
          })
          .catch((err) =>{
              dispatch(hideScreenPopup())
             setErrors("There is something error with the server ")
          })
        }
    }

    return (<>
        <Modal
            show={true}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centereds
            className="control_container">
                <div className="selectedFeatures" >
                    <label htmlFor="name">Enter Selection Name</label>
                    <input type="text"  id = "name"  placeholder = "Selected Poi" value = {fileName}  onChange = {(e) => setFileName(e.target.value)} />

                    {errors && <p style = {{color : "red" , fontSize : "13px" , marginTop :  "8px"}}>{errors}</p>}
                    <button className="save_selection save_file" onClick={saveFile} >Save File</button>

                    <div className="selectedFeatures_cut"  onClick = {() => dispatch(hideScreenPopup())}>
                        <img src={Cut} alt="cut icon" />
                    </div>
                </div>

            </Modal>

    </>)
}

// exporting the component ;
export default SelectedFeatures ; 