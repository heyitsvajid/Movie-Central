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

    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px"
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
          <button href="#" onClick={this.handleLogout.bind(this)} >Logout</button>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="793935897617810"
          buttonText="Facebook"
          autoLoad={true}
          size='small'
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}

