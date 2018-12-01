
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert2'
import '../assets/css/movie-details.css'

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
      movie:{},
      reviews:[],
      img:'',
      rating: 0,
      title: "",
      review_content: "",
      isLoggedIn: false
    }
  }

    componentWillMount(){
    this.fetchDataFromServer();
  }

  fetchDataFromServer(){

    var url = envURL + 'isLoggedIn'
    const { movieId } = this.props.match.params
    alert(movieId)

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

  handleTrailerClick(e){
    if(this.state.movie.trailer_link != undefined){
      window.open(this.state.movie.trailer_link);
    }
  }

  addReview() {
    var review = {
        rating: this.state.rating,
        review: this.state.review_content != "" ? this.state.review_content : "No Content Supplied!",
        title: this.state.title != "" ? this.state.title : "Untitled",
        user_id: localStorage.userid,
        //oca,
        user_name: localStorage.getItem('first_name')
    }

    var apiPayload = { review: review, movie_id: localStorage.getItem("movieID") };
    let addShowTimingsAPI = envURL + 'addMovieReview';

    axios.post(addShowTimingsAPI, apiPayload)
        .then(res => {
            if (res.data.errorMsg != '') {
                swal({
                    type: 'error',
                    title: 'Add Review',
                    text: res.data.errorMsg,
                })
            } else if (res.data.successMsg != '') {
                swal({
                    type: 'success',
                    title: 'Add Review',
                    text: res.data.successMsg,
                })
            }
            this.fetchDataFromServer();
        })
        .catch(err => {
            console.error(err);
        });
  }
  
  getReleaseDate(release_date){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let day = new Date(this.state.movie.release_date).getDate();
    let month_name = monthNames[new Date(this.state.movie.release_date).getMonth()];
    let year = new Date(this.state.movie.release_date).getFullYear()
    const final_date = "" + month_name + " " + day + ", " + year;
    return final_date;
  }

  renderMovieCharacters() {
    let nineCharacters = [];
    var movieCharacters = this.state.movie.movie_characters;
    if(movieCharacters != undefined){
      if(movieCharacters.length > 0){
        for(let i = 0; i < 9;i++){
          movieCharacters[i] != undefined ? nineCharacters.push(movieCharacters[i]) : nineCharacters.push("Coming Soon");
        }  
      }
      let moviesNode = nineCharacters.map((item, index) => {
        var imageSource = item == "Coming Soon" ? require('../assets/static_images/defaut.jpeg'): require('../images/' + item.image_path);
        return (
          <li>
            <div class="fluid poster">
                <a href="#">
                  <img class="carousel-cast-crew__portrait visual-thumb" src={imageSource} aria-label="Landon Liboiron portrait" role="img"/>
                </a>
                <div>
                  <a href="#" class="heading-style-1 heading-size-s heading__movie-carousel">
                  <span class="heading-style-1 movie-header heading-size-s heading__movie-carousel">
                  {item == "Coming Soon" ? "Coming Soon": item.name}
                  </span>
                  </a>
                </div>
            </div>
          </li>
        )
      });

      return (
        <ol class="carousel-items js-items">
          { moviesNode }
        </ol>
        
      )
    }
  }

  getMovieReviews(){
    var movieReviews = this.state.movie.review_ratings;
    if(movieReviews != undefined){
      let reviews = movieReviews.map((item, index) => {
        let ratingsHash = { 1: "", 2: "",  3: "", 4: "", 5: "" };
        var item_ratings = item.rating;
        for(let i = Object.keys(ratingsHash).length; i > 0 ; i--){
          if(item_ratings > 0){
            ratingsHash[i] = "checked"
            item_ratings-=1;
          }
        }
        return (
          <li class="fan-reviews__item">
            <div class="stars-large__star-rating--no-hover" data-star-rating="4">
              <span className={'fa fa-star ' + ratingsHash[1]}></span>
              <span className={'fa fa-star ' + ratingsHash[2]}></span>
              <span className={'fa fa-star ' + ratingsHash[3]}></span>
              <span className={'fa fa-star ' + ratingsHash[4]}></span>
              <span className={'fa fa-star ' + ratingsHash[5]}></span>
            </div>
            <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                {item.title}
            </div>
            <div class="fan-reviews__user-name">
                By {item.user_name}
            </div>
            <div class="fan-reviews__review">{item.review}</div>
          </li>
        )
      });
      return (
        <ul class="fan-reviews__list">
          { reviews }
        </ul>        
      )
    }
  }

  handleStarClick(e){
    this.setState({rating: parseInt(e.target.dataset.rating)});
  }

  handleTitleChange(e){
    this.setState({ title: e.target.value });
  }

  handleReviewContentChange(e){
    this.setState({ review_content: e.target.value });
  }

  handleBooking(){
    console.log("search clicked", this.state.searchQuery);
    if(window.location.href.includes('/movies')){
      this.props.onSearchData(this.state.searchQuery);
    }else{
      localStorage.setItem('search','title' in this.state.movie? this.state.movie.title: '')
      this.props.history.push('/movies');
    
    }
  }


  handleSessionChange(e){
    this.props.history.push("/login")
  }

  
  


  render() {
     let movie_image, trailer_link, keywords_list, review_link = null;
    if(this.state.movie.movie_logo != undefined){
      movie_image = <img class="movie-details__movie-img visual-thumb" src = {require('../images/' + this.state.movie.movie_logo)} alt="Blumhouse's Truth or Dare (2018) Movie Poster" />
      trailer_link = <a href = "https://www.youtube.com/embed/tgbNymZ7vqY"><img id="img-link" src={require('../images/' + this.state.movie.movie_logo)} alt="Truth or Dare: Trailer 1" itemprop="image" /></a>
    }
    if(this.state.movie.movie_keywords != undefined){
      let keywords =  this.state.movie.movie_keywords.toString().split(",");

      keywords_list = keywords.map((keyword) => {
        return (
          <li>{keyword}
          </li>
        )
    });

    if(this.state.isLoggedIn){
      review_link = <a data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" class="fan-review__write-review-cta cta" href="https://www.fandango.com/blumhouses-truth-or-dare-2018_208538/writeuserreviews">
      Tell Us What You Think</a>
    }
    else{
      review_link =<a href="#" class="fan-review__write-review-cta cta" onClick={this.handleSessionChange.bind(this)}>
      Tell Us What You Think</a>
    }

    
      
    }
    debugger
    return (
    <div>
      <div class="bd dark-background" style={{backgroundColor: '#141414'}} lang="en-US">
        <div class="pinning-header">
          <Header/>
        </div>
      </div>
      
      <div id="page" role="main">
         <div class="mop" style={{backgroundColor: '#141414'}}>
            <div class="mop__details mop__details--has-image">
               <div class="mop__background js-backgroundBlur">
                  <svg width="100%" height="100%">
                     <defs>
                        <filter id="backgroundBlur" width="150%" height="150%" x="-25%" y="-25%" color-interpolation-filters="sRGB">
                           <feGaussianBlur stdDeviation="7"/>
                           <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0 0 0 0 10 0"/>
                           <feComposite in2="SourceGraphic" operator="in"></feComposite>
                        </filter>
                     </defs>
                     <image class="js-backgroundBlur-image" x="0" y="0" width="100%" height="110%" xlinkHref="https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/201129/fmc_mc_RalphBreaksTheInternet.jpg" preserveAspectRatio="xMidYMid slice"/>
                  </svg>
               </div>
               <div class="mop__details-inner">
                  <section class="subnav">
                     <div class="row">
                        <div class="width-100">
                           <h1 class="subnav__title heading-style-1 heading-size-xl">
                              Ralph Breaks the Internet
                              <a
                                 href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_addmovie&amp;action=addmovie&amp;id=201129"
                                 class="follow-add icon icon-follow-white js-heartsAndStars-heart"
                                 data-type="Movie"
                                 data-id="201129"
                                 data-name="Ralph Breaks the Internet"
                                 data-is-favorite="false"
                                 >
                              Favorite Theater Button
                              </a>
                           </h1>
                           <ul class="subnav__link-list">
                              <li class="subnav__link-item"><a class="subnav__link" href="/ralph-breaks-the-internet-201129/movie-overview">Overview</a></li>
                              <li class="subnav__link-item"><a class="subnav__link" href="/ralph-breaks-the-internet-201129/movie-times">Movie Times + Tickets</a></li>
                              <li class="subnav__link-item"><a class="subnav__link" href="/ralph-breaks-the-internet-201129/plot-summary">Synopsis</a></li>
                              <li class="subnav__link-item"><a class="subnav__link" href="/ralph-breaks-the-internet-201129/movie-reviews">Movie Reviews</a></li>
                              <li class="subnav__link-item"><a class="subnav__link" href="https://www.fandango.com/movie-trailer/ralphbreakstheinternet-trailer/201129">Trailers</a></li>
                              <li class="subnav__link-item vertical-dropdown">
                                 <a class="subnav__link" href="#">More</a>
                                 <ul class="dropdown-nav">
                                    <li class="subnav__link-item"><a class="subnav__link" href="https://www.fandango.com/ralphbreakstheinternet_201129/moviephotosposters">Photos + Posters</a></li>
                                    <li class="subnav__link-item"><a class="subnav__link" href="/ralph-breaks-the-internet-201129/cast-and-crew">Cast + Crew</a></li>
                                 </ul>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </section>
                  <div class="row mop__layout" style={{marginLeft:'18%', marginTop:'3%'}}>
                     <div class="mop__details-container">
                        <section class="movie-details">
                           <a class="movie-details__mop-link" href="/ralph-breaks-the-internet-201129/movie-overview">
                           <img class="movie-details__movie-img visual-thumb" src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/201129/WIR2_Payoff_195_B_NT_v70_A_Mech5_FS.jpg" alt="Ralph Breaks the Internet Movie Poster" />
                           </a>
                           <ul class="movie-details__detail">
                              <li>Released</li>
                              <li class="movie-details__release-date">November 21, 2018</li>
                              <li>
                                 PG, 
                                 1 hr 52 min
                              </li>
                              <li>Action/Adventure</li>
                              <li>Animated</li>
                              <li class="fd-star-rating__container">
                                 <div
                                    class="
                                    js-fd-star-rating
                                    fd-star-rating
                                    "
                                    data-star-rating="4.5"
                                    >
                                    <a
                                       href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=5"
                                       class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star"
                                       data-action="rate"
                                       data-id="201129"
                                       data-isnew="true"
                                       data-rate-movie="false"
                                       data-show-caption="true"
                                       data-value="5"
                                       title="Loved It"
                                       >
                                    </a>
                                    <a
                                       href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=4"
                                       class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star"
                                       data-action="rate"
                                       data-id="201129"
                                       data-isnew="true"
                                       data-rate-movie="false"
                                       data-show-caption="true"
                                       data-value="4"
                                       title="Really Liked It"
                                       >
                                    </a>
                                    <a
                                       href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=3"
                                       class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star"
                                       data-action="rate"
                                       data-id="201129"
                                       data-isnew="true"
                                       data-rate-movie="false"
                                       data-show-caption="true"
                                       data-value="3"
                                       title="Liked It"
                                       >
                                    </a>
                                    <a
                                       href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=2"
                                       class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star"
                                       data-action="rate"
                                       data-id="201129"
                                       data-isnew="true"
                                       data-rate-movie="false"
                                       data-show-caption="true"
                                       data-value="2"
                                       title="Disliked It"
                                       >
                                    </a>
                                    <a
                                       href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=1"
                                       class="fd-star-rating__star icon icon-star-rating-small js-heartsAndStars-star"
                                       data-action="rate"
                                       data-id="201129"
                                       data-isnew="true"
                                       data-rate-movie="false"
                                       data-show-caption="true"
                                       data-value="1"
                                       title="Hated It"
                                       >
                                    </a>
                                 </div>
                              </li>
                              <li class="movie-details__fan-ratings">8,147 Fan Ratings</li>

                              <li class="js-rotten-tomatoes"></li>
                           </ul>
                           <ul class="movie-details__film-formats">
                              <h3 class="movie-details__film-formats-header">SEE IT IN</h3>
                              <li class="movie-details__format"><span class="movie-details__format-logo">35MM</span></li>
                              <li class="movie-details__format"><span class="movie-details__format-logo">Digital 3D</span></li>
                              <li class="movie-details__format"><span class="movie-details__format-logo">IMAX</span></li>
                              <li class="movie-details__format"><span class="movie-details__format-logo">IMAX 3D</span></li>
                           </ul>
                        </section>
                        <div class="js-movie-showtimes__location-form mop__location-form hide">
                           <div class="date-picker__location">
                              <div class="date-picker__error js-date-picker__error hide"></div>
                              <div class="date-picker__message">
                                 <h3 class="date-picker__message-title heading-size-l heading-style-1">
                                    <i class="icon icon-location-white"></i>
                                    Tell us where you are
                                 </h3>
                                 <p class="date-picker__details">
                                    Looking for movie tickets? Enter your location to see which
                                    movie theaters are playing Ralph Breaks the Internet near you.
                                 </p>
                              </div>
                              <span class="date-picker__location-text">ENTER CITY, STATE OR ZIP CODE</span>
                              <input
                                 class="date-picker__location-input js-date-input"
                                 placeholder="City, State or Zip Code"
                                 type="text"
                                 />
                              <a href="#" class="date-picker__location-submit js-date-picker-btn">GO</a>
                           </div>
                        </div>
                        <section class="fan-alert js-fan-alert hide" data-movie-id="201129" data-fan-alert-from="">
                           <h3 class="fan-alert__header font-sans-serif font-lg uppercase">
                              <span class="icon icon-alarm-white fan-alert__icon"></span> Fandango Fanalert&#8482
                           </h3>
                           <div class="fan-alert__wrap js-fan-alert-wrap">
                              <p class="fan-alert__description">Sign up for a FanAlert and be the first to know when tickets and other exclusives are available in your area.</p>
                              <div class="js-fan-alert-error page-header-emphasis fan-alert__error"></div>
                              <input type="text" class="fan-alert__input fan-alert__input-email js-fan-alert-email js-keyup" placeholder="Email Address" autocomplete="off" />
                              <input type="text" class="fan-alert__input fan-alert__input-location js-fan-alert-location js-keyup" placeholder="Zip Code or City, State" maxlength="200" />
                              <label class="fan-alert__fan-mail-label">
                              <input type="checkbox" class="fan-alert__fan-mail-checkbox js-checkbox" />
                              Also sign me up for FanMail to get updates on all things movies: tickets, special offers, screenings + more.
                              </label>
                              <a class="fan-alert__privacy-link" href="/policies/privacy-policy">Privacy Policy</a>
                              <button class="fan-alert__btn btn-cta js-fan-alert-btn" type="button" name="button">Sign Up For FanAlert&#8482</button>
                           </div>
                           <div class="js-fan-alert-msg hide fan-alert__link-wrap">
                              <a href="/movietimes">CHECK OUT WHAT'S PLAYING NEAR YOU</a>
                           </div>
                        </section>
                     </div>
                     <div class="mop__content-container">
                        <section class="mop__content">
                           <div class="mop-video">
                              <div
                                 id="vdlpVideoPlayerWrap"
                                 class="media-player"
                                 data-width=""
                                 data-height="350"
                                 style={{height: '350px'}}>
                                 <div
                                    class="media-player__placeholder js-video-placeholder"
                                    data-iframe-url="/videos/player/Ralph-Breaks-the-Internet-1325045827642?autoPlay=true"
                                    data-video-id="1325045827642"
                                    style={{height: '350px'}}>
                                    <img src="https://images.fandango.com/imagerelay/500/0/video.fandango.com/MPX/image/NBCU_Fandango/47/179/wreckitralph_trailer2.jpg/image.jpg/redesign/static/img/noxSquare.jpg" alt="Ralph Breaks the Internet: Trailer 2" itemprop="image" />
                                 </div>
                              </div>
                           </div>
                        </section>
                        <div class="mop__ad-unit">
                           <div class="ad" data-unit="boxadm" data-responsive="true" data-media="mobile">
                           </div>
                           <div class="ad" data-unit="boxaddt" data-responsive="true" data-media="desktop,tablet">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div
               class="mop__synopsis "
               >
               <div class="mop__synopsis-inner">
                  <h2 class="mop__synopsis-title">Ralph Breaks the Internet Synopsis</h2>
                  <p class="mop__synopsis-content">Ralph and Vanellope embark on an adventure inside the internet to find a spare part for a game.</p>
                  <a class="mop__synopsis-link" href="/ralph-breaks-the-internet-201129/plot-summary">
                  Read Full Synopsis
                  </a>
               </div>
            </div>
            <div class="row ad-unit--shop-ad">
               <div class="ad" data-unit="shopad" data-responsive="true" data-media="desktop,tablet">
               </div>
            </div>
            <section class="row">
            </section>
            <section
               class="mop__marketing-spotlight js-marketingSpotlight"
               data-name="movieOverview"
               data-id="201129"
               >
            </section>
            
            <div class="row width-100" style={{marginLeft:'13%'}}>
              <h3 class="inline heading-style-stub heading-style-1 heading-size-l">Movie Reviews</h3>
              <div class="row">
                  <section class="rt-reviews js-reviews__rt-container width-50">
                      <div class="rt-reviews__headline-wrap">
                          <h2 class="rt-reviews__title heading-style-1 heading-size-l">ROTTEN TOMATOES™</h2>
                          <span class="rt-reviews__icon icon-rottom-certified_fresh_text"></span>
                          <span class="rt-reviews__score heading-style-1">86%</span>
                          <span class="rt-tomatometer">
                  <span class="rt-tomatometer__bar rt-tomatometer__bar--certified_fresh_text" style={{width: '86%'}}>
                  </span>
                          </span>
          
                          <a class="rt-reviews__all-link cta" href="/ralph-breaks-the-internet-201129/critic-reviews">ALL CRITICS REVIEWS</a>
          
                      </div>
          
                      <ul class="rt-reviews-list__wrap rt-reviews-list--grid">
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-fresh"></div>
          
                              <div class="rt-reviews-list__date">November 21, 2018</div>
          
                              <div class="rt-reviews-list__quote">It's not every animation that features an eBay-spoofing riff involving a corn chip shaped like Beyoncé.</div>
          
                              <a class="rt-reviews-list__full-link" href="https://www.timeout.com/london/film/ralph-breaks-the-internet" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
          
                                  <span class="rt-reviews-list__reviewer-name">Philip De Semlyen</span>
          
                                  <span class="rt-reviews-list__publication">Time Out</span>
          
                                  <span class="rt-reviews-list__top-critic-label">Top Critic</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-fresh"></div>
          
                              <div class="rt-reviews-list__date">November 20, 2018</div>
          
                              <div class="rt-reviews-list__quote">I am happy to say that the misogynists' worst fears were realized. This is very much a movie whose female characters are equal to their male counterparts...</div>
          
                              <a class="rt-reviews-list__full-link" href="https://www.salon.com/2018/11/21/ralph-breaks-the-internet-has-a-lot-to-say-about-toxic-online-male-behavior/" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
          
                                  <span class="rt-reviews-list__reviewer-name">Matthew Rozsa</span>
          
                                  <span class="rt-reviews-list__publication">Salon.com</span>
          
                                  <span class="rt-reviews-list__top-critic-label">Top Critic</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-fresh"></div>
          
                              <div class="rt-reviews-list__date">November 20, 2018</div>
          
                              <div class="rt-reviews-list__quote">Ralph Breaks the Internet works because it doesn't pander, and it doesn't simplify.</div>
          
                              <a class="rt-reviews-list__full-link" href="https://www.rogerebert.com/reviews/ralph-breaks-the-internet-2018" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
          
                                  <span class="rt-reviews-list__reviewer-name">Brian Tallerico</span>
          
                                  <span class="rt-reviews-list__publication">RogerEbert.com</span>
          
                                  <span class="rt-reviews-list__top-critic-label">Top Critic</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-fresh"></div>
          
                              <div class="rt-reviews-list__date">November 20, 2018</div>
          
                              <div class="rt-reviews-list__quote">Ralph Breaks the Internet is, without a doubt, the best film made about the lives of computer programs since the Wachowskis' Matrix sequels; I mean this as a glowing compliment.</div>
          
                              <a class="rt-reviews-list__full-link" href="https://www.theatlantic.com/entertainment/archive/2018/11/ralph-breaks-internet-sequel-review/576235/" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="image for David Sims" >
                                  </div>
          
                                  <span class="rt-reviews-list__reviewer-name">David Sims</span>
          
                                  <span class="rt-reviews-list__publication">The Atlantic</span>
          
                                  <span class="rt-reviews-list__top-critic-label">Top Critic</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
          
                              <div class="rt-reviews-list__date">November 20, 2018</div>
          
                              <div class="rt-reviews-list__quote">"Ralph Breaks the Internet" doesn't have anything new to say about our online behavior; it just wants us to log on and tune out.</div>
          
                              <a class="rt-reviews-list__full-link" href="https://www.detroitnews.com/story/entertainment/movies/2018/11/20/movie-review-ralph-breaks-internet-wrecks-web/2015082002/" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="image for Adam Graham" >
                                  </div>
          
                                  <span class="rt-reviews-list__reviewer-name">Adam Graham</span>
          
                                  <span class="rt-reviews-list__publication">Detroit News</span>
          
                                  <span class="rt-reviews-list__top-critic-label">Top Critic</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-fresh"></div>
          
                              <div class="rt-reviews-list__date">November 19, 2018</div>
          
                              <div class="rt-reviews-list__quote">The opposing trajectories of Ralph and Vanellope's friendship, fueled by their mutual insecurities and hurt, gives Ralph Breaks the Internet the little bit of heart it needs to keep from becoming mere product.</div>
          
                              <a class="rt-reviews-list__full-link" href="https://www.npr.org/2018/11/21/669240038/toxic-masculinity-is-the-bad-guy-in-ralph-breaks-the-internet?utm_medium=RSS&amp;utm_campaign=movies" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="no critic image available"></div>
          
                                  <span class="rt-reviews-list__reviewer-name">Scott Tobias</span>
          
                                  <span class="rt-reviews-list__publication">NPR</span>
          
                                  <span class="rt-reviews-list__top-critic-label">Top Critic</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-rotten"></div>
          
                              <div class="rt-reviews-list__date">November 22, 2018</div>
          
                              <div class="rt-reviews-list__quote">Why not the automatic alliteration Ralph Wrecks? At just shy of two-hours, many younger kids will end up as bored &amp; restless as their parents &amp; grandparents. </div>
          
                              <a class="rt-reviews-list__full-link" href="https://www.kxl.com/ralph-breaks-the-internet/" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="image for Gary Wolcott" >
                                  </div>
          
                                  <span class="rt-reviews-list__reviewer-name">Gary Wolcott</span>
          
                                  <span class="rt-reviews-list__publication">KXL-FM (Portland, OR)</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-fresh"></div>
          
                              <div class="rt-reviews-list__date">November 22, 2018</div>
          
                              <div class="rt-reviews-list__quote">The scenes where Vanellope inserts herself into the world of Disney Princesses (many of them voiced by the original stars) is worth the price of admission alone.</div>
          
                              <a class="rt-reviews-list__full-link" href="http://athomeinhollywood.com/2018/11/23/ralph-breaks-the-internet-review/" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="image for Lisa Johnson Mandell" >
                                  </div>
          
                                  <span class="rt-reviews-list__reviewer-name">Lisa Johnson Mandell</span>
          
                                  <span class="rt-reviews-list__publication">AtHomeInHollywood.com</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-fresh"></div>
          
                              <div class="rt-reviews-list__date">November 21, 2018</div>
          
                              <div class="rt-reviews-list__quote">It's vibrant and everything moves very quickly, which is great for Vanellope but really discombobulates Ralph. </div>
          
                              <a class="rt-reviews-list__full-link" href="http://www.digitaljournal.com/entertainment/entertainment/review-ralph-breaks-the-internet-has-fun-with-our-virtual-vices/article/537488" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="image for Sarah Gopaul" >
                                  </div>
          
                                  <span class="rt-reviews-list__reviewer-name">Sarah Gopaul</span>
          
                                  <span class="rt-reviews-list__publication">Digital Journal</span>
          
                              </div>
                          </li>
          
                          <li class="rt-reviews-list__item width-50 tablet-width-100">
                              <div class="rt-reviews-list__icon icon-rottom-fresh"></div>
          
                              <div class="rt-reviews-list__date">November 21, 2018</div>
          
                              <div class="rt-reviews-list__quote">Ralph Breaks The Internet is a welcome return for Disney's most unlikely band of misfits, but the style, tone, and creative components all breath life into this turbo charged satire that knows never to take itself too seriously. </div>
          
                              <a class="rt-reviews-list__full-link" href="https://www.theonlycritic.com/single-post/2018/11/22/Review-Sensational-Ralph-Breaks-The-Internet-filled-with-meta-creativity" target="_blank" rel="noopener">Full Review</a>
          
                              <div class="rt-reviews-list__reviewer">
          
                                  <div class="rt-reviews-list__reviewer-img" aria-label="image for Nate Adams" >
                                  </div>
          
                                  <span class="rt-reviews-list__reviewer-name">Nate Adams</span>
          
                                  <span class="rt-reviews-list__publication">The Only Critic</span>
          
                              </div>
                          </li>
          
                      </ul>
          
                  </section>
                  <section class="fan-reviews width-50">
                      <div class="fan-reviews__header">
                          <h2 class="fan-reviews__title heading-style-1 heading-size-l">Fan Reviews</h2>
          
                          <div class="
                  js-fd-star-rating 
                  fd-star-rating
                  stars-large__star-rating 
          
              " data-star-rating="4.5">
          
                              <a href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=5" class="stars-large__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="201129" data-isnew="true" data-rate-movie="false" data-show-caption="true" data-value="5" title="Loved It">
                              </a>
          
                              <a href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=4" class="stars-large__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="201129" data-isnew="true" data-rate-movie="false" data-show-caption="true" data-value="4" title="Really Liked It">
                              </a>
          
                              <a href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=3" class="stars-large__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="201129" data-isnew="true" data-rate-movie="false" data-show-caption="true" data-value="3" title="Liked It">
                              </a>
          
                              <a href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=2" class="stars-large__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="201129" data-isnew="true" data-rate-movie="false" data-show-caption="true" data-value="2" title="Disliked It">
                              </a>
          
                              <a href="https://www.fandango.com/account/joinnow?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet-201129%2Fmovie-overview&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=1" class="stars-large__star icon icon-star-rating-small js-heartsAndStars-star" data-action="rate" data-id="201129" data-isnew="true" data-rate-movie="false" data-show-caption="true" data-value="1" title="Hated It">
                              </a>
          
                          </div>
          
                          <a class="cta fan-reviews__all-reviews" href="/ralph-breaks-the-internet-201129/movie-reviews">See All Fan Reviews</a>
          
                      </div>
                      <div class="fan-reviews__content-wrap">
                          <div class="fan-reviews__decoration-top"></div>
                          <div class="js-reviews__fan-container">
                              <ul class="fan-reviews__list">
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          Ralph Breaks The Internet
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By mjauer04
          
                                      </div>
          
                                      <div class="fan-reviews__review">The movie was hilarious! I liked that there was YouTube, Facebook, Snapchat, Instagram, Twitter, eBay, Fandango, IMDb, Amazon, ect!</div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          Loved it!
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By clindalopez13
          
                                      </div>
          
                                      <div class="fan-reviews__review">Disney out does them selfs again! Great family movie. ??</div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          full great
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By adaron08
          
                                      </div>
          
                                      <div class="fan-reviews__review">i honestly want to watch it 3x</div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          wow!
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By kam035142017340
          
                                      </div>
          
                                      <div class="fan-reviews__review">This movie was better than I expected it to be. Worth going to see!</div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="3">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">&nbsp;</div>
          
                                      <div class="fan-reviews__user-name">
                                          By DHM
          
                                      </div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          Untitled
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By Rdanny321124
          
                                      </div>
          
                                      <div class="fan-reviews__review">Great movie</div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="4">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          Untitled
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By truegrizzlybayer
          
                                      </div>
          
                                      <div class="fan-reviews__review">Pretty good. Some material was derived from modern social issues, though. Like when they were talking about some of the races, a few of the characters said sometimes losing is just as good as winning which isn’t correct at all, but I digress.</div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          LOVED IT!
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By raerae35
          
                                      </div>
          
                                      <div class="fan-reviews__review">So much to love about it, cannot wait to watch it again.</div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          Wow
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By Xerolooper
          
                                      </div>
          
                                      <div class="fan-reviews__review">It was on fleek. Came for a laugh and got some big belly laughs. Feels good to laugh so hard it hurts. But was not expecting to be in tears half the time. Luckily I grabbed a handful of napkins, for the kids, so was able to dry my face. Maybe as a Dad with two daughters it just touched me more. Also be sure to stay till after the credits for a hugh reveal.</div>
          
                                  </li>
          
                                  <li class="fan-reviews__item">
                                      <div class="stars-large__star-rating--no-hover" data-star-rating="5">
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                          <span class="stars-large__star icon icon-star-rating-small"></span>
                                      </div>
          
                                      <div class="fan-reviews__headline heading-style-1 heading-size-l">
                                          Awesome movie!
                                      </div>
          
                                      <div class="fan-reviews__user-name">
                                          By Marissabarashi
          
                                      </div>
          
                                      <div class="fan-reviews__review">Fabulous! Go see it!</div>
          
                                  </li>
          
                              </ul>
          
                          </div>
                          <div class="fan-reviews__decoration-bottom"></div>
                      </div>
          
                      <a class="fan-review__write-review-cta cta" href="https://www.fandango.com/account/signin?from=https%3A%2F%2Fwww.fandango.com%2Fralph-breaks-the-internet_201129%2Fwriteuserreviews&amp;source=web_multiple_ratemovie&amp;action=ratereviewmovie&amp;id=201129&amp;rating=">
                  Tell Us What You Think</a>
          
                  </section>
              </div>
          </div>
         </div>
         <div class="js-flyout fd-amenity-flyout">
            <span class="js-flyout__close fd-amenity-flyout__close">X</span>
            <div class="js-flyout__title fd-amenity-flyout__title"></div>
            <div class="js-flyout__desc fd-amenity-flyout__desc"></div>
         </div>
         <section class="favoriteFlyout js-heartsAndStars-flyout">
            <div class="favoriteFlyout__message js-heartsAndStars-flyout-message"></div>
         </section>
      </div>
      <Footer/>
      
      
    </div>
    )
  }
}



export default MovieDetails;
              