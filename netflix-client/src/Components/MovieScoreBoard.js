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
            topTenRatedMoviesReviews: [],
            topTenViewedMovies:[]
        }
    }

  componentWillMount(){
      this.fetchTopTenRatedMovieReviews()
      this.findMovies()
      this.fetchTopTenViewedMovies()
    axios.get(envURL + 'isLoggedIn', {withCredentials: true})
    .then((response) => {
        console.log("After checking the session", response.data);
            if(response.data.role.name === 'CUSTOMER'){
                console.log("Already Logged In. Getting movie list")
                axios.get(envURL + 'movies',{ headers: { 'Content-Type': 'application/json'}})
                .then((res) => {
                            console.log(res.data);
                            debugger
                            this.setState({
                                movieList: res.data ? res.data : [],
                                firstMovie: res.data ? res.data[0] : ""
                            })          
                },(error) => {
                    console.log('Error fetching all movies.');
                })
            }
            else if(response.data.role.name === 'ADMIN') {
                console.log("Already Logged In. Redirecting to admin dashboard")
                this.props.history.push('/adminDashboard');
            }else{
                console.log("Error checking session")
            }
    },
    (error) => { 
        this.props.history.push('/login');
        console.log(error)})
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
                    this.setState({
                        topTenRatedMoviesReviews : response.data
                    }, () => {
                        this.props.history.push('/movieScoreBoard');
                    })
        })
    }

    fetchTopTenViewedMovies(){
        axios.get(envURL + 'topTenViewedMovies', null, { withCredentials: true })
            .then((response) => {

                console.log(response.data);
                    this.setState({
                        topTenViewedMovies : response.data
                    }, () => {
                        this.props.history.push('/movieScoreBoard');
                    })
        })
    }

    handleMovieDetails(e){
        e ? e.preventDefault() : ''        
        this.props.history.push('/movieDetails/'+e.target.id);
        console.log(e)
    }

    findMovies(dataFromChild){
        var search = { search: dataFromChild}
        if(dataFromChild == null || dataFromChild == undefined){
            axios.get(envURL + 'movies',{ headers: { 'Content-Type': 'application/json'}})
            .then((res) => {
                        console.log(res.data);
                        this.setState({
                            movieList: res.data ? res.data : []
                        })          
            },(error) => {
                console.log('Error fetching all movies.');
            })
        }else{
            axios.post(envURL + 'movie/search',search)
            .then((res) => {
                        console.log(res.data);
                        this.setState({
                            movieList: res.data ? res.data : []
                        })          
            },(error) => {
                console.log('Error fetching all movies.');
            })
        }
    }

    handleMovieDetails(e){
        debugger
        e ? e.preventDefault() : ''        
        this.props.history.push('/movieDetails/'+e.target.id);
        console.log(e)
    }

    render() {

        var topTenRatedMoviesReviews = this.state.topTenRatedMoviesReviews;
        var topTenViewedMovies = this.state.topTenViewedMovies;
        var movieList = this.state.movieList;
        var topTenRatedMovieList = null;
        if(topTenRatedMoviesReviews.length> 0 && movieList.length > 0){
            topTenRatedMovieList = topTenRatedMoviesReviews.map((item, index) => {
                var topTenMovieListInside = movieList.map((movieItem, index) => {
                    if(item.movieId == movieItem.id){
                        debugger
                        return (
                            <tr>
                                <td style={{color:'white'}} onClick={this.handleMovieDetails.bind(this)} id={movieItem.id}><a id={movieItem.id}>{movieItem.title}</a></td>
                                <td style={{color:'white'}} >{movieItem.director}</td>
                                <td style={{color:'white'}} >{movieItem.rating}</td>
                            </tr>
                        )
                    }

                    
                })
                return topTenMovieListInside;
            })
        }
        if(topTenViewedMovies.length>0){
            topTenViewedMovies = topTenViewedMovies.map((item, index) => {
                
                        return (
                            <tr>
                                <td style={{color:'white'}} onClick={this.handleMovieDetails.bind(this)} id={item.movie.id}><a id={item.movie.id}>{item.movie.title}</a></td>
                                <td style={{color:'white'}} >{item.movie.director}</td>
                                <td style={{color:'white'}} >{item.movie.rating}</td>
                            </tr>
                        )
                    }

                    
            );
        }
       debugger
        return (
            <div>
              <div id="appMountPoint">
                <div class="netflix-sans-font-loaded" data-reactroot="">
                    <div lang="en-US" dir="ltr" class="">
                        <div>
                            <div class="bd dark-background" style={{backgroundColor: '#141414'}} lang="en-US">
                                <div class="pinning-header">
                                <Header/>
                                </div>
                                <h3 className="inline heading-style-stub heading-style-1 heading-size-l" style={{marginLeft:"215px"}}>Top 10 Rated Movies</h3>
                                <table class="table" id = "scoreboard-table">
                                  <thead>
                                    <tr>
                                      <th style={{color:'white'}} scope="col">Title</th>
                                      <th style={{color:'white'}} scope="col">Director</th>
                                      <th style={{color:'white'}} scope="col">Rating</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {topTenRatedMovieList}
                                  </tbody>
                                </table>
                                <h3 className="inline heading-style-stub heading-style-1 heading-size-l" style={{marginLeft:"215px"}}>Top 10 Viewed Movies</h3>
                                <table class="table" id = "scoreboard-table">
                                  <thead>
                                    <tr>
                                      <th style={{color:'white'}} scope="col">Title</th>
                                      <th style={{color:'white'}} scope="col">Director</th>
                                      <th style={{color:'white'}} scope="col">Rating</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {topTenViewedMovies}
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
