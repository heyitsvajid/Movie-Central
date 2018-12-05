import React, { Component } from 'react';
import axios from 'axios';
import {envURL} from "../config/environment";
import { withRouter } from 'react-router-dom';
import { debug } from 'util';
import swal from 'sweetalert';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoggedIn: false,
        searchQuery: localStorage.getItem('search')
    }

      this.handleLogout = this.handleLogout.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillMount(){
    localStorage.removeItem('search');
      axios.get(envURL + 'isLoggedIn', {withCredentials: true})
          .then((response) => {
              console.log("After checking the session", response.data);
              if(response.data.session === 'valid') {
                  this.setState({
                      isLoggedIn: true
                  })
              }
          })
  }

  handleLogout() {
      //alert("In handleLogout");
      localStorage.clear();
      axios.post(envURL + 'logout', null, { withCredentials: true })
          .then((response) => {
              console.log(response.data);
              if(response.data.session === 'logged out') {
                  this.setState({
                      isLoggedIn: false
                  }, () => {
                      this.props.history.push('/');
                  })
              }
          })
  }

  handleChange(e) {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSearch() {
      console.log("search clicked", this.state.searchQuery);
      if(window.location.href.includes('/movies')){
        this.props.onSearchData(this.state.searchQuery);
      }else{
        localStorage.setItem('search',this.state.searchQuery)
        this.props.history.push('/movies');
      
      }
 
      // var data = {
      //     searchQuery: this.state.searchQuery
      // }
      // axios.post(envURL + 'searchQuery', data, {withCredentials: true})
      //     .then((response) => {
      //         console.log("After search results in Header compoent...", response.data);
      //     })

  }


  render() {

    var changeButtons = null;
    if(this.state.isLoggedIn === false) {
        changeButtons = (
            <a href="/login" className="hide-logged-in">Sign In</a>
        );
    } else {
        changeButtons = (
            <a href="/" onClick={ this.handleLogout } className="hide-logged-in">Sign Out</a>
        );
    }

    return (
    <div>
      <div class="pinning-header-container" style={{top: '0px', position: 'relative', background: 'transparent'}}>
          <div class="main-header has-billboard" style={{height:'66px'}}>
              <a aria-label="Netflix" class="logo icon-logoUpdate active" href="/browse"></a>
              <ul class="tabbed-primary-navigation" role="navigation">
                  <li class="navigation-menu"><a class="menu-trigger" role="button" aria-haspopup="true">Browse</a></li>
                  <li class="navigation-tab"><a class="current active" href="/browse">Home</a></li>
                  <li class="navigation-tab"><a href="/browse/genre/83">TV Shows</a></li>
                  <li class="navigation-tab"><a href="/browse/genre/34399">Movies</a></li>
                  <li class="navigation-tab"><a href="/browse/genre/1592210">Recently Added</a></li>
                  <li class="navigation-tab"><a href="/browse/my-list">My List</a></li>
                  <li class="navigation-tab"><a href="/browse/genre/107985">Holidays</a></li>
              </ul>
              <div class="secondary-navigation">
                  <div class="nav-element">
                      <div class="searchBox">
                      <div class="searchBox">
                      <div class="searchInput">
                        <span class="icon-search">
                        </span>
                            <input type="text" style={{width:'250px'}} placeholder="" data-search-input="true" dir="ltr" data-uia="search-box-input" maxlength="80" value="" style={{opacity: '0', transitionDuration: '200ms'}} />
                        <span class="icon-close empty">
                        </span>
                        </div>
                      </div>

                      </div>
                  </div>
                  <div class="nav-element show-kids"><a href="/Kids">KIDS</a></div>
                  <div class="nav-element show-dvd"><a href="https://dvd.netflix.com/SubscriptionAdd?preselect=1u&amp;dsrc=STRWEB_NAV">DVD</a></div>
                  <div class="nav-element"><span class="notifications"><button class="notifications-menu" aria-haspopup="true" aria-expanded="false" aria-label="Notifications"><span class="icon-button-notification"></span><span class="notification-pill">1</span></button>
                      </span>
                  </div>
                  <div class="nav-element">
                      <div class="account-menu-item">
                          <div class="account-dropdown-button"><a href="/YourAccount" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-label="jay - Account &amp; Settings"><span class="profile-link" role="presentation"><img class="profile-icon" src="https://occ-0-1339-1340.1.nflxso.net/art/b228e/d2fd0b05ccca6e4262395e0a39654ced51cb228e.png" alt="" /></span></a><span class="caret" role="presentation"></span></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    )
  }
}

export default withRouter(Header);
