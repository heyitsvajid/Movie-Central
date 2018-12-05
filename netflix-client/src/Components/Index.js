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
                                <div class="mainView" role="main">
                                    <div class="lolomo is-fullbleed">
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
                                                            <ul class="pagination-indicator">
                                                                <li class="active"></li>
                                                                <li class=""></li>
                                                                <li class=""></li>
                                                                <li class=""></li>
                                                                <li class=""></li>
                                                                <li class=""></li>
                                                                <li class=""></li>
                                                            </ul>
                                                            <div class="sliderMask showPeek">
                                                                <div class="sliderContent row-with-x-columns">
                                                                    {this.returnMovieList()}
                                                                </div>
                                                            </div><span class="handle handleNext active" tabindex="0" role="button" aria-label="See more titles"><b class="indicator-icon icon-rightCaret"></b></span></div>
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