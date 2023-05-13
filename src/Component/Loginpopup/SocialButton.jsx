// This is the social login which will be used for social login ;
import React from "react";
import SocialLogin from "react-social-login";

class SocialButton extends React.Component {
    render() {
      const { children, triggerLogin, ...props } = this.props;
      return (
        <button onClick={triggerLogin} {...props} style={{background : "white" , border : "none" , outline : "none"}}>
          {children}
        </button>
      );
    }
  }
  
  export default SocialLogin(SocialButton);