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
            firstMovie: "",
            search: null
        }
        this.findMovies = this.findMovies.bind(this)
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
                            console.log(res.data);
                            debugger
                            this.setState({
                                movieList: res.data ? res.data : [],
                                firstMovie: res.data ? res.data[0] : ""
                            })          
                },(error) => {
                    console.log('Error fetching all movies.');
                })
            }else{
                let search = localStorage.getItem("search")
                axios.get(envURL + 'movie/search',{ search , headers: { 'Content-Type': 'application/json'}})
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

findMovies(dataFromChild){
    var search = { search: dataFromChild}
    if(dataFromChild == null || dataFromChild == undefined){
        axios.get(envURL + 'movies',{ headers: { 'Content-Type': 'application/json'}})
        .then((res) => {
                    console.log(res.data);
                    this.setState({
                        movieList: res.data ? res.data : [],
                        firstMovie: res.data ? res.data[0] : ""
                    })          
        },(error) => {
            console.log('Error fetching all movies.');
        })
    }else{
        axios.post(envURL + 'movie/search',search)
        .then((res) => {
                    console.log(res.data);
                    this.setState({
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
    if(movieList != undefined && movieList.length > 0){
        abc = rowsArr.forEach(function(entry, index) {
            console.log(entry);
            var startIndex = index == 0 ? 0 : rowsArr[index-1];
            var endIndex = rowsArr[index] - 1;
            return(
                <div class="sliderMask showPeek">
                    <div class="sliderContent row-with-x-columns">
                        {obj.getMovieList(startIndex, endIndex)}
                    </div>
                </div>
            )
        });
    }

    return (
        <div>{abc}</div>
      
    );

    
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
                                                            {/* <div class="sliderMask showPeek">
                                                            <div class="sliderContent row-with-x-columns" >
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-33" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:33,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:81019894,%22image_key%22:%22sdp,9%7CAD_f2784530-ec2a-11e8-a553-0e5cab28ba56%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="40cfca5e-5ec2-4d56-8c7b-febaef7222c6">
                                                                            <a href="/watch/81019894?tctx=1%2C33%2C%2C%2C" aria-label="Nailed It! Holiday!" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABS-xsLrk_oYx7w5nl2ZRb-tq_d8RXNSLI6BOTr7BAcg9rJE59pWg-cDiBNJp287zay2P8C-Lv4i9d64oY4nxmbYA1MHjO91HtMJbpUA0TkYgnasUQaG1T8snZhfa9iFVtyKSnlpILg.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Nailed It! Holiday!</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-34" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:34,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80990815,%22image_key%22:%22sdp,3%7CAD_d3b4da21-3701-11e8-b308-0e1f42e0af2a%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="32bd8d09-da92-4bb0-b39c-a151f6d7c7b5">
                                                                            <a href="/watch/80990815?tctx=1%2C34%2C%2C%2C" aria-label="Gurgaon" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABRfnc44pl6pCp7SfBR_plvg7kFqTFkg2V5BgHZU7FMvrRNj70NfEgTsUC8-A3J3ez8kDT8_MnJoSEoBxkGtpJYP9_8CsZgxs8nv3fEQiUF8T4rhIWNTFBxjOP11rjx2kqDmqxhj5Z_Q.webp" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Gurgaon</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-35" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:35,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:81011159,%22image_key%22:%22sdp,11%7CAD_ff75fec0-bada-11e8-9ffa-12f327f63ce4%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="b0ce407e-9527-46e7-aa6c-a470045e5bfd">
                                                                            <a href="/watch/81011159?tctx=1%2C35%2C%2C%2C" aria-label="Little Things" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABfmlg52DWOhrsZUxHzGDTb_kw9GLZPp0b3ZOWr9ugfKx2ujeBAz3M3v8Wd49ixUJLCwDC3U0Vbn3NHEY4eQrh8CwpJKQb4Wj3YgqasLbh2c2AFgl9I-GHE-Dw1NEAQA7kxMDvelx0Q.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Little Things</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-36" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:36,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80201490,%22image_key%22:%22sdp,9%7CAD_46baf3e1-e8fc-11e8-aac7-0afba17b9ba4%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="f00c40a0-98c7-4596-bf8e-2ea89dc54649">
                                                                            <a href="/watch/80201490?tctx=1%2C36%2C%2C%2C" aria-label="Dumplin'" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABSnlnLQcduVZYxahNd0clMSEXDNzs8JRZMeG5SfCbmQxRlr-tp6YE6Gw2h83ZrRgm2WFZUFtW1SSGAdoUSEvchZvdJnSOqjQTDlyHHIID99gfeRBa3-BP7uX7XnPc3Qx-OPxV9u3Ng.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Dumplin'</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-37" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:37,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80199682,%22image_key%22:%22sdp,0%7C4a98d391-c83d-11e8-b627-0e319b527290%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="603a4b0b-dbd6-48b2-8f4f-7c12f2e0fd25">
                                                                            <a href="/watch/80199682?tctx=1%2C37%2C%2C%2C" aria-label="The Christmas Chronicles" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABdF-v0XmEiV41zDrPoWhErU24mYH_F385Ur9_fOfHqiSMPEjmZsuXmL_T-9MdUnNo7BnhJ3WnW8e0JfZQlN3vpPRGtX1TXWxKWeGP2F0g8DWQRmEXoJsOS0T_eLeT-IhuA2eu4u8XA.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">The Christmas Chronicles</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-38" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:38,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80243408,%22image_key%22:%22sdp,4%7CAD_ba7c40d0-52df-11e8-88a7-127819a595d6%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="82dbe793-e6b3-493c-8f67-44e020029fcc">
                                                                            <a href="/watch/80243408?tctx=1%2C38%2C%2C%2C" aria-label="Aiyaary" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABcGhB8cW7l55fe88sWRBQZszTjAxah3_YQcqr03tcXLul-X-7_GSX6seV4TczIL4cEUYtqaUe-P6QBYr_0xtWPOCe0EPXCmBxEeVe6hNBcRG-zaT3-DeWmEPtZFFA2l_6I0XmKM3cUY.webp" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Aiyaary</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-0" >
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-39" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:39,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80074249,%22image_key%22:%22sdp,1%7CAD_f0f1a971-dcb9-11e8-b88c-0ac2b4e194b0%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="f88cf436-2914-47a3-96cc-8253f79b2072">
                                                                            <a href="/watch/80074249?tctx=1%2C39%2C%2C%2C" aria-label="The Last Kingdom" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/a76057bcfd003711a76fb3985b1f2cf74beee3b8/AAAABc6IyDyMREGq9o65YenWSTfZdQ7ETVg28f-Zl2LVZ0iVVle61K6qXfAkRo2LEgSQ9M5UD7KncqIv_zbCJL2KW-zvPPPk3rZkjDYA87Xc0-7cGRC27ofP7OfyVLdfrjYiuRRbfB5Y4wIqgokhDKoxZd7jpJ9ZrpINh6XkqUkGo-FMPpGyfSi_kak2JBbcLKatddbq1HtLcA.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">The Last Kingdom</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-1" >
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-0" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:0,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80993105,%22image_key%22:%22sdp,11%7CAD_0ecf80b1-f1d8-11e8-9174-0eecff09bab6%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="da94d330-2f78-4a17-8c1a-da3e0f902ff7">
                                                                            <a href="/watch/80993105?tctx=1%2C0%2C%2C%2C" aria-label="Mowgli: Legend of the Jungle" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABSYKRhUpvzKLuMLTePhM__KMXhCl_sqE6H6VHKyVeQgjp6uZqbkRTUbmBTArOoKjmy5h9Ny9tDrH3EsnKP5sC8AYsCRI_chmbtyG4px6ogPeX7lZthGKU4xg-v5VsWs3spCZvrFHoA.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Mowgli: Legend of the Jungle</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-2" >
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-1" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:1,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:81018377,%22image_key%22:%22sdp,4%7CAD_87555611-ed30-11e8-9f62-122c6c506f96%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="249e212b-f7f2-49b5-9b11-367c80c141ed">
                                                                            <a href="/watch/81018377?tctx=1%2C1%2C%2C%2C" aria-label="Rajma Chawal" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABWVirLX4axX3gkv5oVJy94FeSUYQoFANCK1rlyx1BjWpJw1bhvUPuLP9-w5E5LNdpK3J6psQboVeKzD6yBPM6qNCYHU8O0ZVLlYkXgErz5Zh1h0psgdY9xWjrjM1wAaUJeqEQaBj3A.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Rajma Chawal</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-3" >
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-2" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:2,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80221787,%22image_key%22:%22sdp,9%7CAD_d239d232-f1a6-11e8-8631-12cd1b747d70%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="df056ca8-0a44-407e-a038-cbd0a10bd1c7">
                                                                            <a href="/watch/80221787?tctx=1%2C2%2C%2C%2C" aria-label="Bad Blood" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABdHJy_L_dgNv7cJkRE6s5Wt7UdajpIWtgx8jFLk52ROnZF4EsT_IEzVNL995CBWGRqaQl9sWB-N9VwvJ1cnYLoCjKd68dAADPcpKRqIZXjh4U5StQ_BrUz9l8GY82oVLJ_mTP-D8XA.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Bad Blood</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <div class="slider-item slider-item-4">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-3" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:3,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80189522,%22image_key%22:%22sdp,12%7CAD_870d94f2-f1e1-11e8-8a1e-0ea1b749367a%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="3476bcdb-fd03-4645-afa0-28e6e6566207">
                                                                            <a href="/watch/80189522?tctx=1%2C3%2C%2C%2C" aria-label="Dogs of Berlin" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABR_C4s_zhAFI3Ajegm7hRpQvq1BpbOUhaCfv6gkYilZNgRU-Yl_Fqzly7WSQSeief2AAaZzfFhnU9EehR8zjqzkEr3NZ0WZNG0mW4Xw5zSrCYDm3UVKUh9mr3VHsIn6SMLEWCClvlQ.jpg" alt=""/>
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Dogs of Berlin</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-5" >
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-4" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:4,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80115328,%22image_key%22:%22sdp,3%7CAD_76a31b71-75c8-11e8-b1be-0a075c40375e%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="1c344f4a-1978-4882-923c-c0ed07aa0ef6">
                                                                            <a href="/watch/80115328?tctx=1%2C4%2C%2C%2C" aria-label="Sacred Games" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABTLdLcNBXdorvLSil8-jl2dY6hDrlqXe4Te0Fxtsx2GDW89MZk-tE3vyfhrdwreePwrlLTDzdJs7yFaCvWfrSCX-JnlsvpsbspNMUJSWI9Px81ltwPcZAmGntnqmbxx49yypCfKiAA.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Sacred Games</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-6" >
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-5" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:5,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80133042,%22image_key%22:%22sdp,24%7CAD_f7b9f5e1-7a72-11e8-bf34-0a758f89390e%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="6808f620-3fb4-4655-984f-3e86ef0a9da8">
                                                                            <a href="/watch/80133042?tctx=1%2C5%2C%2C%2C" aria-label="El Chapo" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABY_Z49y8jJkG7Co1-q9WhpsHzZOyirTye--Y2klLGdtP1oO5z64QSv64synvDCHJrhS-bW92lPcjlha7TOfWasP7zTawtmX8t8JzHdkHywi9FLugtpTx-4TQS73Bi1yL2j39w6RK9WI.webp" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">El Chapo</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-7" >
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-6" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:6,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80195198,%22image_key%22:%22sdp,0%7C8891d752-ea07-11e8-8a1e-0ea1b749367a%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="3b81be8c-2b59-4081-bb97-3c28dfff7a17">
                                                                            <a href="/watch/80195198?tctx=1%2C6%2C%2C%2C" aria-label="Pine Gap" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABTY90uf0BaojAdVK_otNMw3HzRCSZR1gM02T3DG4b2apMfUXdi-zJlETi0wbVS4cFw3wEsgJi67_8sb_-s0Nk5cNg9hkUdwdKTymMSoyS18rorsLQ6UVoMQyenM67Q8eBZYtW0OZaA.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Pine Gap</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-7" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:7,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:81016193,%22image_key%22:%22sdp,5%7CAD_fb07a460-8e75-11e8-aecc-121c72da8408%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="03a2d3c4-6d7e-41c6-b8ac-4d5f01c3d6b9">
                                                                            <a href="/watch/81016193?tctx=1%2C7%2C%2C%2C" aria-label="Bareilly Ki Barfi" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABUBD6jBOePiZkwRgQPo95Sb1rG0bAP1KpjErSkg5J13Zd7ZFlQJgzv0ajZ_LotyV-sP2OmVvhJClD9V37rvgO5ecQj1TX-G4jvLjkA5mJiG3Ej76P41Qyz8m437ot3v6bjnGL7WoqXs.webp" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Bareilly Ki Barfi</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-8" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:8,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:81039383,%22image_key%22:%22sdp,5%7CAD_22b4f3f2-f38e-11e8-a553-0e5cab28ba56%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="f1793cd3-ae2c-4bc3-be9f-d4e035bc5480">
                                                                            <a href="/watch/81039383?tctx=1%2C8%2C%2C%2C" aria-label="Manto" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABd736I5E5HlctGnDSjS5K8zUMT2YMH_zBjQ4ShCj2QyvlZOLnOfDcjKcgIjA-9Iym0yFqUMzEMNDmexZt_OFEmaWX63HSnrVUE47ApCh4kZOynYa4P7H7GS_jy3GmutXKJnD7WPRemk.webp" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Manto</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-9" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:9,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80190086,%22image_key%22:%22sdp,19%7CAD_07c0c901-ec6f-11e8-aac7-0afba17b9ba4%7Cen%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="148b815c-1fb9-49ce-b3d7-60fb507ac216">
                                                                            <a href="/watch/80190086?tctx=1%2C9%2C%2C%2C" aria-label="The Hook Up Plan" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABchpGNKWK8cS2gbCZpjZIVizLZbmhCU7FiGgLIBq54csZHOy_QKBoPI5-Kb_oR8t3qN6HoeN9TYiuF884iasu7z__-ykMxJSyw-p64e8oa0Sf-ex0nbA3dF1MXzHe2AYqTPHsWKDpA.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">The Hook Up Plan</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-10" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:10,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80235135,%22image_key%22:%22sdp,1%7CAD_15f70c40-04f9-11e8-bfbe-1277dc00772c%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="28ab75cf-0158-4020-bbb7-2fed1e401f57">
                                                                            <a href="/watch/80235135?tctx=1%2C10%2C%2C%2C" aria-label="Powder" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABdpK-KyBRXfmjk3c0owewQ4x2jBf-Ec95vtLF6eXHPesWzEJOPmZ9ppg9GqOI6fU-rdiPPMdn-CYbROeIzm6O64m5Q-VMOh4_V5I-2iw7SxrYajhHMP4LhYqmgDBfWs0glsaJH0AkNU.webp" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Powder</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-11" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:11,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:81016191,%22image_key%22:%22sdp,2%7CAD_9510d2a0-8ff4-11e8-b7d4-0e0af1cc4960%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="bebf0de0-79d5-43bb-856b-4a3de5dfb957">
                                                                            <a href="/watch/81016191?tctx=1%2C11%2C%2C%2C" aria-label="Pad Man" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABbrmq2f6zzqzmfsWcqsv_kJ5SvGKJ0OVvv1n2tMWVaSoDlzBrdwntagPXEexFeE1ZSWR8Q1LtpsAjvBZfoYFZcwK8QGrI9B_ZBCj4ofjmWPz3z0ICwytKle0eELUR-JmGUxsNgkXkTY.webp" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Pad Man</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="slider-item slider-item-">
                                                                    <div class="title-card-container">
                                                                        <div id="title-card-1-12" class="title-card">
                                                                        <div class="ptrack-content" data-ui-tracking-context="%7B%22list_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_28687366X19XX1544319325799%22,%22location%22:%22homeScreen%22,%22rank%22:12,%22request_id%22:%229b7cc0a1-2412-4819-8321-4f13fa6166a7-279568609%22,%22row%22:1,%22track_id%22:14170035,%22video_id%22:80235864,%22image_key%22:%22sdp,19%7CAD_c42b5760-c69d-11e8-a3b4-122e8b00cd84%7Cen%7CGnL%22,%22supp_video_id%22:1,%22lolomo_id%22:%223d009a50-ce2e-4097-b907-b51066bfc4b3_ROOT%22,%22maturityMisMatchEdgy%22:false,%22maturityMisMatchNonEdgy%22:false,%22appView%22:%22boxArt%22,%22usePresentedEvent%22:true%7D" data-tracking-uuid="881bd8d3-8985-4fa8-aed5-e27f84ed8483">
                                                                            <a href="/watch/80235864?tctx=1%2C12%2C%2C%2C" aria-label="Bodyguard" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                <div class="boxart-size-16x9 boxart-container">
                                                                                    <img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABVuOZmrsbWefSd7OdOoM_r4UkuFg0cIXxCB0vGx6fMRMM6X6eqgjzFMTwa6KA7KlSnEbzUUbFFD5TnDHq8cG_6EU5Tk2Cg5gBL-2F9vcB80GlaXJBHegrbR8RkP9mtKiRFzt1mgkWg.jpg" alt="" />
                                                                                    <div class="fallback-text-container" aria-hidden="true">
                                                                                    <div class="fallback-text">Bodyguard</div>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                        <span></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div> */}
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
