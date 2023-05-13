// This is the main file of the project;
import React from "react";
import "./index.css";
import Main from "./Component/Main";
import { BrowserRouter as Router , Route , Switch} from "react-router-dom";
import ChangePassword from "./Component/ChangePassword/ChangePassword";

const App = () =>{
    return(<>

    <Router  basename = "/~temppopulator">
        <Switch>
            <Route exact path="/" component={Main}/>
            {/* <Route exact path="/changePassword" component={ChangePassword} /> */}
        </Switch>
    </Router>
    
    </>)
};

// exporting the app file ;
export default App ;




