import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import '../assets/css/home.css'
import Header from './Header'
import Footer from './Footer'
import swal from 'sweetalert2'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
var HashMap = require('hashmap');


class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            mainMovieList : [],
            firstMovie: "",
            search: null,
            genres: [],
            genreArray: [],
            reviews: [],
            totalReviewPerMovie : {},
            totalRatingPerMovie : {},
            averageRatingPerMovie : {}
        }
        this.findMovies = this.findMovies.bind(this)
        this.genresChanged = this.genresChanged.bind(this)
        this.fetchGenres = this.fetchGenres.bind(this)
        this.fetchRatings = this.fetchRatings.bind(this)
    }

    componentWillMount(){
    axios.get(envURL + 'isLoggedIn', {withCredentials: true})
    .then((response) => {
        console.log("After checking the session", response.data);
            if(response.data.role.name === 'CUSTOMER'){
                console.log("Already Logged In. Getting movie list")
            {this.findMovies()}
                if(localStorage.getItem("search")== undefined || localStorage.getItem("search")== null){
                axios.get(envURL + 'movies',{ headers: { 'Content-Type': 'application/json'}})
                .then((res) => {
                            this.setState({
                                mainMovieList: res.data ? res.data : [],
                                movieList: res.data ? res.data : [],
                                firstMovie: res.data ? res.data[0] : ""
                            })  
                            this.fetchGenres()    
                            this.fetchRatings()             
                },(error) => {
                    console.log('Error fetching all movies.');
                })
            }else{
                let search = localStorage.getItem("search")
                axios.get(envURL + 'movie/search',{ search , headers: { 'Content-Type': 'application/json'}})
                .then((res) => {
                            this.setState({
                                mainMovieList: res.data ? res.data : [],
                                movieList: res.data ? res.data : [],
                                firstMovie: res.data ? res.data[0] : ""
                            }) 
                            this.fetchGenres() 
                            this.fetchRatings()         
                },(error) => {
                    console.log('Error fetching all movies.');
                })
            }
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

    fetchRatings(){
        axios.get(envURL + 'reviews',{ headers: { 'Content-Type': 'application/json'}})
        .then((res) => {
            if(res.data){
                this.setState({
                    reviews : res.data
                })
                var totalReviewPerMovie = new HashMap();
                var totalRatingPerMovie = new HashMap();
                var averageRatingPerMovie = new HashMap();
                this.state.reviews.map((item, index) => {
                    if(totalRatingPerMovie.has(item.movieId)){
                        totalRatingPerMovie.set(item.movieId, totalRatingPerMovie.get(item.movieId)+item.rating)
                        totalReviewPerMovie.set(item.movieId, totalReviewPerMovie.get(item.movieId)+1)
                        averageRatingPerMovie.set(item.movieId, (totalRatingPerMovie.get(item.movieId)+item.rating)/ (totalReviewPerMovie.get(item.movieId)+1))
                    }else{
                        totalRatingPerMovie.set(item.movieId, item.rating)
                        totalReviewPerMovie.set(item.movieId, 1)
                        averageRatingPerMovie.set(item.movieId, item.rating)
                    }
                });
                this.setState({
                    totalReviewPerMovie : totalReviewPerMovie,
                    totalRatingPerMovie : totalRatingPerMovie,
                    averageRatingPerMovie : averageRatingPerMovie
                })
            }       
        },(error) => {
            console.log('Error fetching all reviews.');
        })
    }

    findMovies(dataFromChild){
        var search = { search: dataFromChild}
        if(dataFromChild == null || dataFromChild == undefined){
            axios.get(envURL + 'movies',{ headers: { 'Content-Type': 'application/json'}})
            .then((res) => {
                        this.setState({
                            mainMovieList: res.data ? res.data : [],
                            movieList: res.data ? res.data : [],
                            firstMovie: res.data ? res.data[0] : ""
                        })          
            },(error) => {
                console.log('Error fetching all movies.');
            })
        }else{
            axios.post(envURL + 'movie/search',search)
            .then((res) => {
                        this.setState({
                            mainMovieList: res.data ? res.data : [],
                            movieList: res.data ? res.data : [],
                            firstMovie: res.data ? res.data[0] : ""
                        })          
            },(error) => {
                console.log('Error fetching all movies.');
            })
        }
    }

    handleLogout() {
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
        e ? e.preventDefault() : ''        
        this.props.history.push('/movieDetails/'+e.target.id);
        console.log(e)
    }

    myCallback = (dataFromChild) => {
        this.findMovies(dataFromChild)
    }

    returnMovieList() {
        var movieList = this.state.movieList;
        var movieLength = movieList.length;
        var totalRows = (parseInt(this.state.movieList.length/6)) + 1;
        var rowsArr = []
        var currVal = 0;
        for(let i = 0; i < totalRows; i++){
            if(movieLength >= 6){
                rowsArr.push(currVal+6);
                currVal += 6;
            }
            else{
                rowsArr.push(currVal + this.state.movieList.length - currVal);
                currVal += this.state.movieList.length - currVal;
            }
            movieLength -= 6;   
        }
        let obj = this;
        let abc = null;
        var arr = [];
        if(movieList != undefined && movieList.length > 0){
            abc = rowsArr.forEach(function(entry, index) {
                console.log(entry);
                var startIndex = index == 0 ? 0 : rowsArr[index-1];
                var endIndex = rowsArr[index] - 1;
                arr.push(
                    // <div class="sliderMask showPeek">
                    //     <div class="sliderContent row-with-x-columns">
                            obj.getMovieList(startIndex, endIndex)
                            
                    //     </div>
                    // </div>
                )
            });
        }

        return arr;    
    }
    getMovieList(start, end){
        var movieList = this.state.movieList;
        let movieNodes = movieList.map((item, index) => {
            if(start <= index && end >= index){
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
            }
        });
        return (
            <div>{movieNodes}</div>
        
        );
    }
    returnFirstMovie() {
        if(this.state.movieList.length>0){
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
    }

    fetchGenres(){
        var movieList = this.state.movieList
        var genreArray = []
        if( movieList.length > 0 ){
            movieList.map((item, index) => {
                var genreList = item.genre.split(",")
                genreList.map((genreTag, index) => {
                    if(!genreArray.includes(genreTag.trim())){
                        genreArray.push(genreTag.trim())
                    }
                });
            });
        }
        this.setState({
            genreArray : genreArray
        })
    }

    genresChanged = (newGenre) => {
        debugger
        if(newGenre != undefined){
            this.setState({
                genres: newGenre
            });
            debugger
            if(newGenre.length > 0){
                var movieList = []
                newGenre.map((item, index) => {
                    this.state.mainMovieList.map((movie, index) => {
                        var genreList = movie.genre.split(",")
                        genreList.map((genreTag, index) => {
                            if(item === genreTag.trim() && !movieList.includes(movie)){
                                movieList.push(movie)
                            }
                        });
                    });
                });
                this.setState({
                    movieList : movieList
                })
            }else{
                this.setState({
                    movieList : this.state.mainMovieList
                })
            }
        }else{
            if(this.state.genres.length > 0){
                var movieList = []
                this.state.genres.map((item, index) => {
                    this.state.mainMovieList.map((movie, index) => {
                        var genreList = movie.genre.split(",")
                        genreList.map((genreTag, index) => {
                            if(item === genreTag.trim() && !movieList.includes(movie)){
                                movieList.push(movie)
                            }
                        });
                    });
                });
                this.setState({
                    movieList : movieList
                })
            }else{
                this.setState({
                    movieList : this.state.mainMovieList
                })
            }
        }
    }
    renderGenres(){
        var genres = this.state.genreArray.map((item, index) => {
            return(
                <label><Checkbox value={item}/> {item}</label>
            )
        })
        return genres
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    renderYears(){
        var movieList = this.state.mainMovieList
        var options = [ { value: 'none', label: 'Select Year' } ]
        var exist = false
          const defaultOption = options[0]
          if(movieList.length > 0){
            var yearList = movieList.map((item, index) => {
                options.map((year, index) => {
                    if(year.value == item.year+''){
                        exist = true
                    }
                })
                if(!exist){
                    options.push( { value: item.year+'', label: item.year+'' } )
                }
            });
        }
        options.sort(this.dynamicSort("value"));
        return    <Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder="Select an option" />
    }
    _onSelect(e){    
        debugger
        var movieList = this.state.movieList
        var yearFilteredMovies = []
        if( e.value != "none" ){
            if(movieList.length > 0){
                movieList.map((item, index) => {
                    debugger
                    console.log("test");
                    if(item.year == e.value && this.state.genres){
                        yearFilteredMovies.push(item)
                    }
                });
                this.setState({
                    movieList : yearFilteredMovies
                })

                /////////// Correct the code because it repeats the normal list when clicked again ///////////
            }else{this.genresChanged(this.state.genres)}
        }else{
            this.genresChanged(this.state.genres)
        }
    }

    renderRatings(){
        var starRating = [1,2,3,4,5]
        var options = [ { value: 'none', label: 'Select Star Rating' } ]
        var exist = false
            const defaultOption = options[0]
            starRating.map((item, index) => {
                options.push( { value: item+'', label: item+'' } )
            });
        // options.sort(this.dynamicSort("value"));
        return    <Dropdown options={options} onChange={this.selectStar.bind(this)} value={defaultOption} placeholder="Select Star Rating" />
    }

    selectStar(e){
        debugger
        var movieList = this.state.movieList
        var averageRatingPerMovie = this.state.averageRatingPerMovie
        var starFilteredMovies = []
        if( e.value != "none" ){
            debugger
            if(movieList.length > 0){
                movieList.map((item, index) => {
                    if( averageRatingPerMovie.has(item.id) ){
                        if( averageRatingPerMovie.get(item.id) > e.value){
                            starFilteredMovies.push(item)
                        }
                    }
                });
                this.setState({
                    movieList : starFilteredMovies
                })
        //         /////////// Correct the code because it repeats the normal list when clicked again ///////////
            }else{this.genresChanged(this.state.genres)}
        }else{
            this.genresChanged(this.state.genres)
        }
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
                                    <Header callbackFromParent={this.myCallback}/>
                                </div>
                                <div className="filter-wrap">
                                <CheckboxGroup checkboxDepth={2} name="genres" value={this.state.genres} onChange={this.genresChanged}>
                                    {/* <label><Checkbox value="apple"/> Apple</label>
                                    <label><Checkbox value="orange"/> Orange</label>
                                    <label><Checkbox value="watermelon"/> Watermelon</label> */}
                                    {this.renderGenres()}
                                    {this.renderRatings()}
                                    {this.renderYears()}
                                </CheckboxGroup>
                                </div>
                                <div class="mainView" role="main">
                                    <div class="">
                                        <div class="billboard-row" role="region" aria-label="Featured Content">
                                            <div class="ptrack-container billboard-presentation-tracking">
                                                <div class="billboard-presentation-tracking ptrack-content">
                                                    <div class="billboard-presentation-tracking ptrack-content">
                                                        <div class="billboard billboard-pane billboard-pane-main billboard-originals full-bleed-billboard trailer-billboard">
                                                            {this.returnFirstMovie()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="lolomoRow lolomoRow_title_card" data-list-context="popularTitles">
                                            <h2 class="rowHeader"><span class="rowTitle" aria-label="popular on netflix"><div class="row-header-title">Popular on Netflix</div><div class="aro-row-header"><div class="see-all-link">Explore All</div><div class="aro-row-chevron icon-akiraCaretRight"></div></div></span></h2>
                                            <div class="rowContainer rowContainer_title_card" id="row-1">
                                                <div class="ptrack-container">
                                                    <div class="rowContent slider-hover-trigger-layer">
                                                        <div class="slider">
                                                            <div class="sliderMask showPeek">
                                                                <div class="sliderContent row-with-x-columns">
                                                                    {this.returnMovieList()}
                                                                </div>
                                                            </div>
                                                            <span class="handle handleNext active" tabindex="0" role="button" aria-label="See more titles"><b class="indicator-icon icon-rightCaret"></b></span></div>
                                                    </div><span class="jawBoneContent"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
