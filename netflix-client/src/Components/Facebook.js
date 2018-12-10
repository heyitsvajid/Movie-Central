import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  responseFacebook = response => {
    // console.log(response);

    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });

    if(this.props.signUp){
        this.props.signUp(response)
    }else if(this.props.login){
        this.props.login(response)
    }

    this.handleLogout("")
  };

    handleLogout(e) {
      var that = this;
    window.FB.logout(function (response) {
        // user is now logged out
        that.setState({
            isLoggedIn: false,
        });
    },(error) => {
        debugger
        console.log(error)
    });
}

componentClicked = () => console.log("clicked");

  render() {
    let fbContent;
      fbContent = (
        <FacebookLogin
          appId="793935897617810"
          buttonText="Facebook"
          size='small'
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    return <div>{fbContent}</div>;
  }
}

