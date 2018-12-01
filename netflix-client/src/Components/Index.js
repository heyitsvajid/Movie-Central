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
            movieList: []
        }
    }

  componentWillMount(){
    axios.get(envURL + 'isLoggedIn', {withCredentials: true})
    .then((response) => {
        console.log("After checking the session", response.data);
            if(response.data.role.name === 'CUSTOMER'){
                console.log("Already Logged In. Getting movie list")
                axios.get(envURL + 'movies',{ headers: { 'Content-Type': 'application/json'}})
                .then((res) => {
                            console.log(res.data);
                            this.setState({
                                movieList: res.data ? res.data : [],
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

handleMovieDetails(e){
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


    render() {
        return (
            <div>
              <div id="appMountPoint">
                <div class="netflix-sans-font-loaded" data-reactroot="">
                    <div lang="en-US" dir="ltr" class="">
                        <div>
                            <div class="bd dark-background" style={{backgroundColor: '#141414'}} lang="en-US">
                                <div class="pinning-header">
                                    <Header/>
                                    {/* </div> */}
                                </div>
                                <div class="mainView" role="main">
                                    <div class="lolomo is-fullbleed">
                                        <div class="billboard-row" role="region" aria-label="Featured Content">
                                            <div class="ptrack-container billboard-presentation-tracking">
                                                <div class="billboard-presentation-tracking ptrack-content">
                                                    <div class="billboard-presentation-tracking ptrack-content">
                                                        <div class="billboard billboard-pane billboard-pane-main billboard-originals full-bleed-billboard trailer-billboard">
                                                            <div class="billboard-motion">
                                                                <div class="nfp nf-player-container notranslate container-small NFPlayer" tabindex="0">
                                                                    <div class="VideoContainer VideoContainer--use-element-dimensions"></div>
                                                                </div>
                                                                <div class="motion-background-component bottom-layer full-screen">
                                                                    <div class="hero-image-wrapper"><img class="hero static-image image-layer" src="https://occ-0-1339-1340.1.nflxso.net/art/782e3/096d240c1eb3dfb5840a1c0116d4af9fd94782e3.webp" alt="" />
                                                                        <div class="hero-vignette vignette-layer"></div>
                                                                        <div class="hero-vignette-top vignette-layer"></div>
                                                                        <div class="embedded-components button-layer"></div>
                                                                    </div>
                                                                    <div class="embedded-components button-layer"><span class="ActionButtons"></span><span class="maturity-rating "><span class="maturity-number">R</span></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="fill-container">
                                                                <div class="info meta-layer">
                                                                    <div class="trailer-vignette vignette-layer"></div>
                                                                    <div class="logo-and-text meta-layer">
                                                                        <div class="billboard-title"><img class="title-logo" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/25247fca08ea5e68662f1fd0bcbb48bf95617a4a/AAAABfxjzEHOqOWs1sZhTM3VCh5e42ZW7Gwe_1S4BtubO7MnM6UuJ67zpE9eNGzAHS95aEcKmHtFGzOAJG9uNsSy5t7Ek1SWxl2-QEsFoJmAi0E2evl-XBpJ86TO1lneHTsLmOkdgFGkd16TNwNTL2Ya4pUtEu-2gsH6N4lflmEBFdSGyC0hELjfmmL6dN1Hey5rnoUggIX73Prtq9kAMlnpF9UEl4nwTrMut7EbXh_WGgyB3fDydeeulHlh96gHzMA1G4c.webp" title="Outlaw King" alt="Outlaw King" /></div>
                                                                        
                                                                        <div class="fade-container"></div>
                                                                        <div class="synopsis-fade-container">
                                                                            <div class="synopsis no-supplemental">
                                                                            Outmanned. Outmatched. Outlawed. For freedom, honor and family, a rebel king takes on the mightiest army in the world.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
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
                                                                    <div class="slider-item slider-item-0">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-1-0" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80133042?tctx=1%2C0%2C%2C%2C" aria-label="El Chapo" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABRgJp4HNY-6VD7T0FdpVLjXpazzhrHQQcr_K9Hl6GBL0yKABQ4lPIn7jfi076_15AadpkQOZhn61sU-3lQyv8ZHW7N2ZGFmk8AgV7uAi_WH7EdIqgjhv2gKhKA5m3cGdmD-MT62i96s.webp" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">El Chapo</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-1">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-1-1" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/81018377?tctx=1%2C1%2C%2C%2C" aria-label="Rajma Chawal" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABXmCIRXONreCIBPUp7k-5Sv7ACxMmr0aV05QaFu8_kLdPvdTkZGx6Z4bslY-aBAxvlA9zb9u9jZapXkEX5DhWfeVi2M5RMzS5KqNxfhThlH3ow-JlBLUEGkX18xkZfeClGKjDdLkrA.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Rajma Chawal</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-2">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-1-2" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80115328?tctx=1%2C2%2C%2C%2C" aria-label="Sacred Games" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABTLdLcNBXdorvLSil8-jl2dY6hDrlqXe4Te0Fxtsx2GDW89MZk-tE3vyfhrdwreePwrlLTDzdJs7yFaCvWfrSCX-JnlsvpsbspNMUJSWI9Px81ltwPcZAmGntnqmbxx49yypCfKiAA.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Sacred Games</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-3">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-1-3" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80205593?tctx=1%2C3%2C%2C%2C" aria-label="1983" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABUte2U8u1WIzi18jElqFa7-ZH2rTaZsLloL5E5qZqtklPuxV_ZfYEqL72v3Ael6LW7vEKLuIxBzeGBZvQQEfMMwQSY5Q8qNWD8rpRFaCbuLn_P9hicKWx_hz8FGdEu8AqRlC9cbYRg.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">1983</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-4">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-1-4" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80196044?tctx=1%2C4%2C%2C%2C" aria-label="The Crew" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABXLLANuAMRQsQeUGa9Ub7gIndFoeT8FT2AluhmDxxx2R9xF0jStoRNJsKZRpG-GUMG8WUnS4xKXk3wpo4wT_hVcuGeOdEMQDakIij-Ta2_f2hLqbN8_9pUxJCD36G0jgCbvZUc3DHA.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">The Crew</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-5">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-1-5" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80177803?tctx=1%2C5%2C%2C%2C" aria-label="Drug Lords" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABc4U_qWSe0NEYmWPD-NBI6zKOgdBoSs9dvW6Y1FOT62vsJMVvyUOfKLI0mwHESPajYokD9JGGNggkrR1HdVKOzRCbfbp6bVxgMbZ2FkNWKhiuOqUXOKorldsGAO7zf6jQEwfehq4mA.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Drug Lords</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-6">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-1-6" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80199682?tctx=1%2C6%2C%2C%2C" aria-label="The Christmas Chronicles" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABW2XBt5czWxn0jJNx-RyZs363qdGfvx9IIvWtYkxHDn7bPunjo8xKPwBH2kT5N9bSQ01WyNTi4M38Gg9tbFtBkUQ6Rmz9QKOKYp5QEUMPTbupzdatk5dbO8VrXys7jQn7P7Kh2KS5Q.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">The Christmas Chronicles</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-1-7" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/81016193?tctx=1%2C7%2C%2C%2C" aria-label="Bareilly Ki Barfi" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABTxxS8GWdyHprPB2t-IDBUa8SXeRHImj13NdxHXvyNqnoWS-EzRGdDzCm6YvXNzJWllf4Wm_pLyIgCJogsYciczcyXOY0QvUKQO7qL2e_zpW3FTYCAfNoQlRHYmwAW5Ajy8AMZGYJMM.webp" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Bareilly Ki Barfi</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div><span class="handle handleNext active" tabindex="0" role="button" aria-label="See more titles"><b class="indicator-icon icon-rightCaret"></b></span></div>
                                                    </div><span class="jawBoneContent"></span></div>
                                            </div>
                                        </div>
                                        <div class="lolomoRow lolomoRow_title_card" data-list-context="trendingNow">
                                            <h2 class="rowHeader"><span class="rowTitle" aria-label="trending now"><div class="row-header-title">Trending Now</div><div class="aro-row-header"><div class="see-all-link">Explore All</div><div class="aro-row-chevron icon-akiraCaretRight"></div></div></span></h2>
                                            <div class="rowContainer rowContainer_title_card" id="row-2">
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
                                                                    <div class="slider-item slider-item-0">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-2-0" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80025172?tctx=2%2C0%2C%2C%2C" aria-label="Narcos" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABaygFMDP0RznPArqZwdXoDPDO5b2T3ciBYwfADOph2kw7bXm2F3xzFUooVAUJurv1g10cqwporkM0yVLnTuu6Op1p2puLHa2dgxh0RpQ28b2_N3483hhHBJrRqA0aYObEsoUtUcCkg.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Narcos</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-1">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-2-1" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/81020508?tctx=2%2C1%2C%2C%2C" aria-label="Sanju" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZsdSCElFD7yMReyT5h3e4eNFxsh3cxrB5JFWr279fWgGXwuizl2mqg4M6BiwEhPIw_5knxI_5GNSdziHs3MIkrxWnOnI9AqhS1xm8Zk2XEFYs79UVZZaLVerT6gzpeFl3e_JDAuanM.webp" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Sanju</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-2">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-2-2" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80235864?tctx=2%2C2%2C%2C%2C" aria-label="Bodyguard" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABVuOZmrsbWefSd7OdOoM_r4UkuFg0cIXxCB0vGx6fMRMM6X6eqgjzFMTwa6KA7KlSnEbzUUbFFD5TnDHq8cG_6EU5Tk2Cg5gBL-2F9vcB80GlaXJBHegrbR8RkP9mtKiRFzt1mgkWg.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Bodyguard</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-3">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-2-3" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80113647?tctx=2%2C3%2C%2C%2C" aria-label="Designated Survivor" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABUZ_wScC5sunj3wiflUJD_JWsL8lVWTHIt2PRXrDfyW_RtuhA-NJ24mrqWpgQEpLNdl2Tp64sQlXEekdUbOcii5UpG1K0Bk-4LbKIrtgGC69ssFbhds-6gmRZku3avPTdxDdP3acVIE.webp" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Designated Survivor</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-4">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-2-4" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80199682?tctx=2%2C4%2C%2C%2C" aria-label="The Christmas Chronicles" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABW2XBt5czWxn0jJNx-RyZs363qdGfvx9IIvWtYkxHDn7bPunjo8xKPwBH2kT5N9bSQ01WyNTi4M38Gg9tbFtBkUQ6Rmz9QKOKYp5QEUMPTbupzdatk5dbO8VrXys7jQn7P7Kh2KS5Q.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">The Christmas Chronicles</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-5">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-2-5" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80115328?tctx=2%2C5%2C%2C%2C" aria-label="Sacred Games" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABTLdLcNBXdorvLSil8-jl2dY6hDrlqXe4Te0Fxtsx2GDW89MZk-tE3vyfhrdwreePwrlLTDzdJs7yFaCvWfrSCX-JnlsvpsbspNMUJSWI9Px81ltwPcZAmGntnqmbxx49yypCfKiAA.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Sacred Games</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-6">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-2-6" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80133042?tctx=2%2C6%2C%2C%2C" aria-label="El Chapo" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABRgJp4HNY-6VD7T0FdpVLjXpazzhrHQQcr_K9Hl6GBL0yKABQ4lPIn7jfi076_15AadpkQOZhn61sU-3lQyv8ZHW7N2ZGFmk8AgV7uAi_WH7EdIqgjhv2gKhKA5m3cGdmD-MT62i96s.webp" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">El Chapo</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-2-7" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/81019031?tctx=2%2C7%2C%2C%2C" aria-label="Soorma" tabindex="-1" aria-hidden="true" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABYPCzaOiBorpgOgZ8j8KfcuO28sXth1dEdwDEkuIbXdIaSiYeDa5PwFFkfz5q5YDhlCkpzvOrm2lWbDiIWw6ljKxWBFhNwh3xMZ8X4i1MSiMTrdH7iNEV0FoBX0kCz9l6sT7A_LRQKM.webp" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Soorma</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="slider-item slider-item-">
                                                                        <div class="smallTitleCard loadingTitle fullWidth">
                                                                            <div class="ratio-16x9 no-pulsate"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div><span class="handle handleNext active" tabindex="0" role="button" aria-label="See more titles"><b class="indicator-icon icon-rightCaret"></b></span></div>
                                                    </div><span class="jawBoneContent"></span></div>
                                            </div>
                                        </div>
                                        <div class="lolomoRow lolomoRow_title_card" data-list-context="continueWatching">
                                            <h2 class="rowHeader"><span class="rowTitle" aria-label="continue watching for jay"><div class="row-header-title">Continue Watching for jay</div><div class="aro-row-header"><div class="see-all-link">Explore All</div><div class="aro-row-chevron icon-akiraCaretRight"></div></div></span></h2>
                                            <div class="rowContainer rowContainer_title_card" id="row-3">
                                                <div class="ptrack-container">
                                                    <div class="rowContent slider-hover-trigger-layer">
                                                        <div class="slider">
                                                            <div class="sliderMask showPeek">
                                                                <div class="sliderContent row-with-x-columns">
                                                                    <div class="slider-item slider-item-0">
                                                                        <div class="title-card-container">
                                                                            <div id="title-card-3-0" class="title-card">
                                                                                <div class="ptrack-content">
                                                                                    <a href="/watch/80025172?tctx=3%2C0%2C%2C%2C" aria-label="Narcos" tabindex="0" aria-hidden="false" class="slider-refocus">
                                                                                        <div class="boxart-size-16x9 boxart-container"><img class="boxart-image boxart-image-in-padded-container" src="https://occ-0-1339-1340.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABaygFMDP0RznPArqZwdXoDPDO5b2T3ciBYwfADOph2kw7bXm2F3xzFUooVAUJurv1g10cqwporkM0yVLnTuu6Op1p2puLHa2dgxh0RpQ28b2_N3483hhHBJrRqA0aYObEsoUtUcCkg.jpg" alt="" />
                                                                                            <div class="fallback-text-container" aria-hidden="true">
                                                                                                <div class="fallback-text">Narcos</div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </a>
                                                                                </div><span></span></div>
                                                                            <div class="progress "><span class="progress-bar"><span role="presentation" class="progress-completed" style={{width:'63%'}}></span></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div><span class="jawBoneContent"></span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div role="contentinfo" class="member-footer">
                                    <div class="social-links">
                                        <a class="social-link" href="https://www.facebook.com/netflixus" target="_blank" aria-label="facebook">
                                            <svg class="svg-icon svg-icon-facebook-logo" focusable="true">
                                                <use filter="" xlinkHref="#facebook-logo"></use>
                                            </svg>
                                        </a>
                                        <a class="social-link" href="https://www.instagram.com/Netflix" target="_blank" aria-label="instagram">
                                            <svg class="svg-icon svg-icon-instagram-logo" focusable="true">
                                                <use filter="" xlinkHref="#instagram-logo"></use>
                                            </svg>
                                        </a>
                                        <a class="social-link" href="https://twitter.com/netflix" target="_blank" aria-label="twitter">
                                            <svg class="svg-icon svg-icon-twitter-logo" focusable="true">
                                                <use filter="" xlinkHref="#twitter-logo"></use>
                                            </svg>
                                        </a>
                                        <a class="social-link" href="https://www.youtube.com/user/NewOnNetflix" target="_blank" aria-label="youtube">
                                            <svg class="svg-icon svg-icon-youtube-logo" focusable="true">
                                                <use filter="" xlinkHref="#youtube-logo"></use>
                                            </svg>
                                        </a>
                                    </div>
                                    <ul class="member-footer-links">
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="/browse/subtitles"><span class="member-footer-link-content">Audio and Subtitles</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="/browse/audio-description"><span class="member-footer-link-content">Audio Description</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="https://help.netflix.com/"><span class="member-footer-link-content">Help Center</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="/redeem"><span class="member-footer-link-content">Gift Cards</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="https://media.netflix.com/"><span class="member-footer-link-content">Media Center</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="http://ir.netflix.com/"><span class="member-footer-link-content">Investor Relations</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="https://jobs.netflix.com/"><span class="member-footer-link-content">Jobs</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="https://help.netflix.com/legal/termsofuse"><span class="member-footer-link-content">Terms of Use</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="https://help.netflix.com/legal/privacy"><span class="member-footer-link-content">Privacy</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="https://help.netflix.com/legal/notices"><span class="member-footer-link-content">Legal Notices</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="/Cookies"><span class="member-footer-link-content">Cookie Preferences</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="https://help.netflix.com/support/2101"><span class="member-footer-link-content">Corporate Information</span></a></li>
                                        <li class="member-footer-link-wrapper"><a class="member-footer-link" href="https://help.netflix.com/contactus"><span class="member-footer-link-content">Contact Us</span></a></li>
                                    </ul>
                                    <div class="member-footer-service">
                                        <button class="service-code">Service Code</button>
                                    </div>
                                    <div class="member-footer-copyright"><span>© 1997-2018 Netflix, Inc.‎</span><span class="member-footer-copyright-instance"></span></div>
                                </div>
                                <div class="image-preloaders"><span class="jawbone-images"></span></div> */}
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