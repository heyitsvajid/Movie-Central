import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import '../assets/css/home.css'
import Header from './Header'
import Footer from './Footer'
import swal from 'sweetalert2'


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            firstMovie: ""
        }
    }

  componentWillMount(){
    // axios.get(envURL + 'isLoggedIn', {withCredentials: true})
    // .then((response) => {
    //     console.log("After checking the session", response.data);
            // if(response.data.role.name === 'CUSTOMER'){
    //             console.log("Already Logged In. Getting movie list")
                // axios.get(envURL + 'movies',{ headers: { 'Content-Type': 'application/json'}})
                // .then((res) => {
                //             console.log(res.data);
                //             debugger
                //             this.setState({
                //                 movieList: res.data ? res.data : [],
                //                 firstMovie: res.data ? res.data[0] : ""
                //             })          
                // },(error) => {
                //     console.log('Error fetching all movies.');
                // })
            // }
            // else if(response.data.role.name === 'ADMIN') {
            //     console.log("Already Logged In. Redirecting to admin dashboard")
            //     this.props.history.push('/adminDashboard');
            // }else{
            //     console.log("Error checking session")
            // }
    // },
    // (error) => { 
    //     this.props.history.push('/login');
    //     console.log(error)})
}

handleLogout() {
    //alert("In handleLogout");
    localStorage.clear();
    axios.post(envURL + 'logout', null, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            // if(response.data.session === 'logged out') {
                this.setState({
                    isLoggedIn: false
                }, () => {
                    this.props.history.push('/');
                })
            // }
        })
}

handleMovieDetails(e){
    debugger
    e ? e.preventDefault() : ''        
    this.props.history.push('/movieDetails/'+e.target.id);
    console.log(e)
}

returnMovieList() {
    var movieList = this.state.movieList;
    let movieNodes = movieList.map((item, index) => {
        return (
        <div class="slider-item slider-item-0">
            <div class="title-card-container">
                <div id="title-card-2-0" class="title-card">
                    <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%2222c6a048-0a5c-4a83-9b10-c49b8bc8d817_115976689X19XX1542578115059%22,%22location%22:%22homeScreen%22,%22rank%22:0,%22request_id%22:%226ab7664b-8540-430b-93e7-e12db6e75d4f-89857730%22,%22row%22:2,%22track_id%22:14170035,%22video_id%22:80201680,%22image_key%22:%22sdp,16%7CAD_cdfc1710-d0ad-11e8-9705-0eaa7fb7c3c4%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%2222c6a048-0a5c-4a83-9b10-c49b8bc8d817_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="93b1f144-4d72-4675-862b-4dbfd30f89bb">
                        <a href="" aria-label="The Kominsky Method" tabindex="0" aria-hidden="false" class="slider-refocus">
                            <div class="boxart-size-16x9 boxart-container"><img onClick={this.handleMovieDetails.bind(this)} id={item.id} class="boxart-image boxart-image-in-padded-container" src={item.image} alt="" />
                                <div class="fallback-text-container" aria-hidden="true">
                                    <div class="fallback-text">{item.title}</div>
                                </div>
                            </div>
                        </a>
                    </div><span></span></div>
            </div>
        </div>
        )
    });
    return (
        <div>{movieNodes}</div>
      
    );

}
    returnFirstMovie() {
        return (
        <div class="slider-item slider-item-0">
            <div class="title-card-container">
                <div id="title-card-2-0" class="title-card">
                    <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%2222c6a048-0a5c-4a83-9b10-c49b8bc8d817_115976689X19XX1542578115059%22,%22location%22:%22homeScreen%22,%22rank%22:0,%22request_id%22:%226ab7664b-8540-430b-93e7-e12db6e75d4f-89857730%22,%22row%22:2,%22track_id%22:14170035,%22video_id%22:80201680,%22image_key%22:%22sdp,16%7CAD_cdfc1710-d0ad-11e8-9705-0eaa7fb7c3c4%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%2222c6a048-0a5c-4a83-9b10-c49b8bc8d817_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="93b1f144-4d72-4675-862b-4dbfd30f89bb">
                        <a href="" aria-label="The Kominsky Method" tabindex="0" aria-hidden="false" class="slider-refocus">
                            <div class="boxart-size-16x9 boxart-container"><img onClick={this.handleMovieDetails.bind(this)} id = {this.state.firstMovie.id} class="boxart-image boxart-image-in-padded-container" src={this.state.firstMovie.image} alt="" />
                                <div class="fallback-text-container" aria-hidden="true">
                                    <div class="fallback-text">{this.state.title}</div>
                                </div>
                            </div>
                        </a>
                    </div><span></span></div>
            </div>
        </div>
        )
    }

    render() {
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
                                    <li class="navigation-menu"><a class="menu-trigger" role="button" aria-haspopup="true">Browse</a></li>
                                    <li class="navigation-tab"><a class="current active" href="/browse">Home</a></li>
                                    <li class="navigation-tab"><a href="/browse/genre/83">TV Shows</a></li>
                                    <li class="navigation-tab"><a href="/browse/genre/34399">Movies</a></li>
                                    <li class="navigation-tab"><a href="/browse/genre/1592210">Recently Added</a></li>
                                    <li class="navigation-tab"><a href="/browse/my-list">My List</a></li>
                                    <li class="navigation-tab"><a href="/browse/genre/107985">Holidays</a></li>
                                </ul>
                            </div>
                        </div>
                                </div>
                                <table class="table" id = "scoreboard-table">
                                  <thead class="thead-dark">
                                    <tr>
                                      <th style={{color:'white'}} scope="col">#</th>
                                      <th style={{color:'white'}} scope="col">First</th>
                                      <th style={{color:'white'}} scope="col">Last</th>
                                      <th style={{color:'white'}} scope="col">Handle</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">2</th>
                                      <td style={{color:'white'}}>Jacob</td>
                                      <td style={{color:'white'}}>Thornton</td>
                                      <td style={{color:'white'}}>@fat</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">3</th>
                                      <td style={{color:'white'}}>Larry</td>
                                      <td style={{color:'white'}}>the Bird</td>
                                      <td style={{color:'white'}}>@twitter</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">2</th>
                                      <td style={{color:'white'}}>Jacob</td>
                                      <td style={{color:'white'}}>Thornton</td>
                                      <td style={{color:'white'}}>@fat</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">3</th>
                                      <td style={{color:'white'}}>Larry</td>
                                      <td style={{color:'white'}}>the Bird</td>
                                      <td style={{color:'white'}}>@twitter</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">2</th>
                                      <td style={{color:'white'}}>Jacob</td>
                                      <td style={{color:'white'}}>Thornton</td>
                                      <td style={{color:'white'}}>@fat</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">3</th>
                                      <td style={{color:'white'}}>Larry</td>
                                      <td style={{color:'white'}}>the Bird</td>
                                      <td style={{color:'white'}}>@twitter</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">2</th>
                                      <td style={{color:'white'}}>Jacob</td>
                                      <td style={{color:'white'}}>Thornton</td>
                                      <td style={{color:'white'}}>@fat</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">3</th>
                                      <td style={{color:'white'}}>Larry</td>
                                      <td style={{color:'white'}}>the Bird</td>
                                      <td style={{color:'white'}}>@twitter</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">2</th>
                                      <td style={{color:'white'}}>Jacob</td>
                                      <td style={{color:'white'}}>Thornton</td>
                                      <td style={{color:'white'}}>@fat</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">3</th>
                                      <td style={{color:'white'}}>Larry</td>
                                      <td style={{color:'white'}}>the Bird</td>
                                      <td style={{color:'white'}}>@twitter</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">2</th>
                                      <td style={{color:'white'}}>Jacob</td>
                                      <td style={{color:'white'}}>Thornton</td>
                                      <td style={{color:'white'}}>@fat</td>
                                    </tr>
                                    <tr>
                                      <th style={{color:'white'}} scope="row">3</th>
                                      <td style={{color:'white'}}>Larry</td>
                                      <td style={{color:'white'}}>the Bird</td>
                                      <td style={{color:'white'}}>@twitter</td>
                                    </tr>
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
export default withRouter(Index);