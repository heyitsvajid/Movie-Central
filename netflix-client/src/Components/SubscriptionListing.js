import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import '../assets/css/home.css'
import Header from './Header'
import Footer from './Footer'
import swal from 'sweetalert2'


class SubscriptionListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subscriptionList: []
        }
    }

  componentWillMount(){
      this.fetchSubscriptionOfUser()
    
  }

  getDateFromTimeStamp(date){
    var d = new Date(date);
    return d.toDateString()
  }

  fetchSubscriptionOfUser(){
    axios.get(envURL + 'payment/user/' + localStorage.getItem("userid"), { withCredentials: true })
        .then((response) => {
          this.setState({subscriptionList: response.data})
        })
  }
    render() {
      var list = 0;
      if(this.state.subscriptionList.length > 0){

        list = this.state.subscriptionList.map((item, index) => {
          var movie_name = item.subscription.type == "SBCR" ? "---" : item.movie.title;
          var startDate = this.getDateFromTimeStamp(item.startAt);
          var endDate = this.getDateFromTimeStamp(item.endAt);
          var div = null;
          if(item.endAt < Date.now()){
            div = <div style = {{backgroundColor: 'red', height: '35px', width: '35px', marginLeft: '6px'}}></div>
          }
          else{
            div = <div style = {{backgroundColor: 'green', height: '35px', width: '35px', marginLeft: '6px'}}></div>
          }

          return (
              <tr>
                <td style={{color:'white'}}>{index+1}</td>
                <td style={{color:'white'}}>{item.subscription.type}</td>
                <td style={{color:'white'}}>{movie_name}</td>
                <td style={{color:'white'}}>{startDate}</td>
                <td style={{color:'white'}}>{endDate}</td>
                <td style={{color:'white'}}>{div}</td>
              </tr>
            
            );
        });
      }
        return (
            <div>
              <div id="appMountPoint">
                <div class="netflix-sans-font-loaded" data-reactroot="">
                    <div lang="en-US" dir="ltr" class="">
                        <div>
                            <div class="bd dark-background" style={{backgroundColor: '#141414'}} lang="en-US">
                                <div class="pinning-header">
                                <div class="pinning-header-container" style={{top: '0px', position: 'relative', background: 'transparent'}}>
                            <div class="main-header has-billboard" style={{height:'66px'}}>
                                <a aria-label="Netflix" class="logo icon-logoUpdate active" href="/browse"></a>
                                <ul class="tabbed-primary-navigation" role="navigation">
                                    <li class="navigation-tab"><a class="current active" href="/">Home</a></li>
                                    
                                </ul>
                            </div>
                        </div>
                                </div>
                                <h3 className="inline heading-style-stub heading-style-1 heading-size-l" style={{marginLeft:"215px"}}>All Subscriptions</h3>
                                <table class="table" id = "scoreboard-table">
                                  <thead>
                                    <tr>
                                      <th style={{color:'white'}} scope="col">#</th>
                                      <th style={{color:'white'}} scope="col">Type</th>
                                      <th style={{color:'white'}} scope="col">Movie Name</th>
                                      <th style={{color:'white'}} scope="col">Start Date</th>
                                      <th style={{color:'white'}} scope="col">End Date</th>
                                      <th style={{color:'white'}} scope="col">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr> */}
                                    {list}
                                  </tbody>
                                </table>
                                
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
            </div>
            
        );
    }
}
export default withRouter(SubscriptionListing);
