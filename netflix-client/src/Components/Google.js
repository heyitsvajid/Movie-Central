import { GoogleLogin } from 'react-google-login';
import React, { Component } from "react";
import { GoogleLogout } from 'react-google-login';


export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };


    handleLogout = (response) =>  {

        console.log(response);
        // user is now logged out
        this.setState({
            isLoggedIn: false,})
}


 responseGoogle = (response) => {
     debugger
    console.log(response);
    this.setState({
        isLoggedIn: true,
        userID: response.profileObj.googleId,
        name: response.profileObj.name,
        email: response.profileObj.email,
        picture: response.profileObj.imageUrl
      });
  
  }
   
  
  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = (
        <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={this.handleLogout}
      >
      </GoogleLogout>
      );
    } else {
      fbContent = (
        <GoogleLogin
        clientId="774354567211-kad4ucac2itsahdm8oud1ds2eqlnmrd3.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.responseGoogle.bind(this)}
        onFailure={this.responseGoogle.bind(this)}
      />
      );
    }

    return <div>{fbContent}</div>;
  }
}

