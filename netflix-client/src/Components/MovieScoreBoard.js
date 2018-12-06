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
      this.fetchTopTenRatedMovieReviews()
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

fetchTopTenRatedMovieReviews(){
    axios.get(envURL + 'topTenRatedMovies', null, { withCredentials: true })
        .then((response) => {

            console.log(response.data);
            debugger
            this.getTopTenRatedMovies()
                this.setState({
                    topTenRatedMoviesReviews : response.data
                }, () => {
                    this.props.history.push('/movieScoreBoard');
                })
    })
}
getTopTenRatedMovies(){
    debugger
    var topTenRatedMoviesReviews = this.state.topTenRatedMoviesReviews;
    if(topTenRatedMoviesReviews.length>0){
      let reviews = topTenRatedMoviesReviews.map((item, index) => {
        return (
            <tr>
                <th style={{color:'white'}} scope="row">1</th>
                <td style={{color:'white'}}>{item.title}</td>
                <td style={{color:'white'}}>{item.director}</td>
                <td style={{color:'white'}}>{item.rating}</td>
            </tr>
        )
    })
}
// handleMovieDetails(e){
//     debugger
//     e ? e.preventDefault() : ''        
//     this.props.history.push('/movieDetails/'+e.target.id);
//     console.log(e)
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
                                <h3 className="inline heading-style-stub heading-style-1 heading-size-l" style={{marginLeft:"215px"}}>Top 10 movies</h3>
                                <table class="table" id = "scoreboard-table">
                                  <thead>
                                    <tr>
                                      <th style={{color:'white'}} scope="col">#</th>
                                      <th style={{color:'white'}} scope="col">Title</th>
                                      <th style={{color:'white'}} scope="col">Director</th>
                                      <th style={{color:'white'}} scope="col">Rating</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr> */}
                                    {this.getTopTenRatedMovies()}
                                  </tbody>
                                </table>
                                <h3 className="inline heading-style-stub heading-style-1 heading-size-l" style={{marginLeft:"215px"}}>Top 10 movies</h3>
                                <table class="table" id = "scoreboard-table">
                                  <thead>
                                    <tr>
                                      <th style={{color:'white'}} scope="col">#</th>
                                      <th style={{color:'white'}} scope="col">Title</th>
                                      <th style={{color:'white'}} scope="col">Director</th>
                                      <th style={{color:'white'}} scope="col">Rating</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* <tr>
                                      <th style={{color:'white'}} scope="row">1</th>
                                      <td style={{color:'white'}}>Mark</td>
                                      <td style={{color:'white'}}>Otto</td>
                                      <td style={{color:'white'}}>@mdo</td>
                                    </tr> */}
                                    {this.getTopTenRatedMovies()}
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
