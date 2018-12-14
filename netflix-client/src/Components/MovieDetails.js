
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert2'
import '../assets/css/movie-details.css'
import ReactPlayer from 'react-player'
import YouTube from 'react-youtube';


class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state={
        movieId: null,
        title: null,
        year:null,
        studio:null,
        genre: null,
        synopsis: null,
        image: null,
        trailer: null,
        actors : null,
	    director: null,
	    country: null,
	    movieRating: null,
	    availability: null, // 'FREE' || 'SBCR' || 'PPVO' || 'PAID'
        price: 0,
        reviews : [],
        movieReviewRating: 0,
        rating : 0,
        review : null,
        userPayments: [],
        userViews: [],
        isLoggedIn: false,
        totalReviews : 0,
        averageRating:0
        // reviewCount:0
    }
    this.fetchDataFromServer = this.fetchDataFromServer.bind(this);
    // this.getMovieReviews = this.getMovieReviews.bind(this);
  }

    componentWillMount(){
      axios.get(envURL + 'isLoggedIn', {withCredentials: true})
      .then((response) => {
          console.log("After checking the session", response.data);
          this.fetchDataFromServer();
          this.getCurrentUserPayments();
          this.getUserViews();
          this.setState({isLoggedIn: true})
      },
      (error) => { 
          this.props.history.push('/login');
          console.log(error)})
    }

    getCurrentUserPayments(){
      axios.get(envURL + 'payment/user/' + localStorage.getItem("userid"),{ headers: { 'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res.data);
            this.setState({userPayments: res.data});
        },(error) => {
            console.log('Error fetching user subscriptions');
        })
    }

    getUserViews(){
      axios.get(envURL + 'view/user/' + localStorage.getItem("userid"),{ headers: { 'Content-Type': 'application/json'}})
        .then((res) => {
            console.log(res.data);
            this.setState({userViews: res.data});
        },(error) => {
            console.log('Error fetching user subscriptions');
        })
    }

  fetchDataFromServer(){

    var url = envURL + 'isLoggedIn'
    const { movieId } = this.props.match.params
    this.setState({
        movieId: this.props.match.params
    })
    axios.get(envURL + 'isLoggedIn', {withCredentials: true})
    .then((response) => {
        console.log("After checking the session", response.data);
            if(response.data.role.name){
                console.log("Already Logged In. Getting movie")
                axios.get(envURL + 'movie/' + movieId,{ headers: { 'Content-Type': 'application/json'}})
                .then((res) => {
                            console.log(res.data);
                            // debugger
                            this.setState({
                                movieId: res.data.id ? res.data.id : null,
                                title: res.data.title ? res.data.title : null,
                                year: res.data.year ? res.data.year : null,
                                studio: res.data.studio ? res.data.studio : null,
                                genre: res.data.genre ? res.data.genre : null,
                                synopsis: res.data.synopsis ? res.data.synopsis : null,
                                image: res.data.image ? res.data.image : null,
                                trailer: res.data.trailer ? res.data.trailer : null,
                                actors : res.data.actors ? res.data.actors : null,
                                director: res.data.director ? res.data.director : null,
                                country: res.data.country ? res.data.country : null,
                                movieRating: res.data.rating ? res.data.rating : null,
                                availability: res.data.availability ? res.data.availability : null, // 'FREE' || 'SBCR' || 'PPVO' || 'PAID'
                                price: res.data.price ? res.data.price : 0
                            })  
                            if(res.data.id){
                                axios.get(envURL + 'review/' + movieId,{ headers: { 'Content-Type': 'application/json'}})
                                .then((response) => {
                                            console.log(response.data);
                                            // debugger
                                            this.setState({
                                                reviews : response.data
                                            })      
                                },(error) => {
                                    console.log('Error fetching the movie.');
                                })
                            }        
                },(error) => {
                    console.log('Error fetching the movie.');
                })
    }else{
                console.log("Error checking session")
            }
    },
    (error) => { 
        this.props.history.push('/login');
        console.log(error)})
    }

  getMovieReviews(){
      var movieReviews = this.state.reviews;
      var totalRating = 0
      var totalReviews = 0
      if(movieReviews.length>0){
        let reviews = movieReviews.map((item, index) => {
          totalRating = totalRating + item.rating
          totalReviews = totalReviews + 1
          // this.setState({
          //   movieReviewRating: this.state.movieReviewRating + item.rating,
          //   totalReviews : this.state.totalReviews + 1
          // })
          if(item.rating!=0 && item.review!=null && item.review!=undefined){
          return (
            <li class="fan-reviews__item">
              <div className="stars-large__star-rating--no-hover" data-star-rating={item.rating}>
                  <span className="stars-large__star icon icon-star-rating-small"></span>
                  <span className="stars-large__star icon icon-star-rating-small"></span>
                  <span className="stars-large__star icon icon-star-rating-small"></span>
                  <span className="stars-large__star icon icon-star-rating-small"></span>
                  <span className="stars-large__star icon icon-star-rating-small"></span>
              </div>
              <div class="fan-reviews__review">{item.review}</div>
            </li>
          )}
        });
        return (
          <ul class="fan-reviews__list">
            { reviews }
          </ul>        
        )
      }
    }
    handleTrailerClick(e){
      if(this.state.movie.trailer_link != undefined){
        window.open(this.state.movie.trailer_link);
      }
    }


    addReview() {
      var review = {
          rating: this.state.rating,
          review: this.state.review != null ? this.state.review : null,
          userId: localStorage.userid,
          movieId: this.state.movieId
      }

      // var apiPayload = { review: review };
      let addReview = envURL + 'review';

      axios.post(addReview, review)
          .then(res => {
              if (res.status == 400) {
                  swal({
                      type: 'error',
                      title: 'Add Review',
                      text: res.data.errorMsg,
                  })
              } else if (res.status == 201) {
                  swal({
                      type: 'success',
                      title: 'Review Added',
                      text: res.data.successMsg,
                  })
              }
              this.fetchDataFromServer();
          })
          .catch(err => {
              console.error(err);
          });
    }
    handleStarClick(e){
      this.setState({rating: parseInt(e.target.dataset.rating)});
    }
    handleReviewContentChange(e){
      this.setState({ review: e.target.value });
    }

    handleSessionChange(e){
      this.props.history.push("/login")
    }

    myCallback(val){

    }

    handlePaymentClick(e){
      localStorage.setItem("amount", e.target.dataset.amount);
      localStorage.setItem("movieType", this.state.availability);
      localStorage.setItem("movieid", this.state.movieId);
      if( e.target.dataset.subscribe != undefined && e.target.dataset.subscribe == "true"){
        localStorage.setItem("subs", true);
      }
      else{
        localStorage.setItem("subs", false);
      }
      window.location.href = reactURL + "payment";
    }

    handleYouTubeButtonClick(e){
      debugger
      if(localStorage.getItem('role')!='ADMIN'){
        var data = {
          userId: localStorage.getItem("userid"),
          movieId: this.state.movieId
        }
        var addEvent = envURL + 'view';
        axios.post(addEvent, data)
            .then(res => {
            })
            .catch(err => {
                console.error(err);
            });
      }


    }


    getUserSubscriptions(){
      var result = []
      if(this.state.userPayments.length != 0){
        this.state.userPayments.forEach(payment => {
          if(payment.endAt > new Date()){
            if(payment.subscription.type == "PPVO" && payment.movie.id == this.state.movieId){
              result.push("PPVO");
            }
            else if(payment.subscription.type == "SBCR"){
              result.push("SBCR");
            }
            else if(payment.subscription.type == "PAID" && payment.movie.id == this.state.movieId){
              result.push("PAID");
            }
          }
        });
      }
      return result;
    }

    watchedMovieAtleastOnce(){
      var userViews = this.state.userViews;
      var result = false;
      var self = this;
      if(userViews.length > 0){
        userViews.forEach(view => {
          if(view.movie.id == self.state.movieId){
            result = true;
          }
        });
      }
      else{
        return false;
      }
      return result;
    }

  render() {
     let movie_image, trailer_link, keywords_list, review_link = null;
    let subscriptionBlock = null;
     if(this.state.availability!=null){
       if(this.state.availability == "FREE" || localStorage.getItem('role')=='ADMIN'){
        trailer_link = <ReactPlayer onStart = {this.handleYouTubeButtonClick.bind(this)} url="https://www.youtube.com/watch?v=lXQgSJsqLyw" onPause/>
       }
       else{
          var subscriptions = this.getUserSubscriptions();
          if(subscriptions.length > 0){
            if(this.state.availability == "SBCR"){
              if(subscriptions.includes("SBCR")){
                trailer_link = <ReactPlayer url={this.state.trailer} onStart = {this.handleYouTubeButtonClick.bind(this)} onPause/>
              }
              else{
                trailer_link = <div style={{backgroundColor: 'black', height:'100%'}}><div class="subscribe" href = "">Please Subscibe to watch this Movie</div><a href="#" data-subscribe={true} data-amount="10" onClick={this.handlePaymentClick.bind(this)} class="subs-anchor">Click Here to subscribe</a></div>
              } 
            }
            else if(this.state.availability == "PPVO"){
              if(subscriptions.includes("PPVO")){
                trailer_link = <ReactPlayer url={this.state.trailer} onStart = {this.handleYouTubeButtonClick.bind(this)} onPause/>
              }
              else{
                if(subscriptions.includes("SBCR")){
                  trailer_link = <div style={{backgroundColor: 'black', height:'100%'}}><div class="subscribe" href = "">Pay for this movie to continue</div><a href="#" data-subscribe={false} data-amount={this.state.price*0.5} onClick={this.handlePaymentClick.bind(this)} class="subs-anchor">Click Here to subscribe</a></div>
                }
                else{
                  trailer_link = <div style={{backgroundColor: 'black', height:'100%'}}><div class="subscribe" href = "">Pay for this movie to continue</div><a href="#" data-subscribe={false} data-amount={this.state.price} onClick={this.handlePaymentClick.bind(this)} class="subs-anchor">Click Here to subscribe</a></div>
                }
              }
            }
            else if(this.state.availability == "PAID"){
              if(subscriptions.includes("PAID") || subscriptions.includes("SBCR")){
                trailer_link = <ReactPlayer url={this.state.trailer} onStart = {this.handleYouTubeButtonClick.bind(this)} onPause/>
              }
              else{
              trailer_link = <div style={{backgroundColor: 'black', height:'100%'}}><div class="subscribe" href = "">Pay or subscribe to watch this movie</div><a href="#" data-subscribe={false} data-amount={this.state.price} onClick={this.handlePaymentClick.bind(this)} class="subs-anchor">Click Here to subscribe</a></div>
              }
            }
          }
          else{
            if(this.state.availability == "SBCR"){
              trailer_link = <div style={{backgroundColor: 'black', height:'100%'}}><div class="subscribe" href = "">Please Subscibe to watch this Movie</div><a href="#" data-subscribe={true} data-amount={this.state.price} onClick={this.handlePaymentClick.bind(this)} class="subs-anchor">Click Here to subscribe</a></div>
            }
            else if(this.state.availability == "PPVO"){
              trailer_link = <div style={{backgroundColor: 'black', height:'100%'}}><div class="subscribe" href = "">Pay for this movie to continue</div><a href="#" data-subscribe={false} data-amount={this.state.price} onClick={this.handlePaymentClick.bind(this)} class="subs-anchor">Click Here to subscribe</a></div>
            }
            else{
              trailer_link = <div style={{backgroundColor: 'black', height:'100%'}}><div class="subscribe" href = "">Pay or subscribe to watch this movie</div><a href="#" data-subscribe={false} data-amount={this.state.price} onClick={this.handlePaymentClick.bind(this)} class="subs-anchor">Click Here to subscribe</a></div>
            }
          }  
       }
     }
     

    if(this.state.image != undefined){
      movie_image = <img className="movie-details__movie-img visual-thumb" src = {this.state.image} alt= {this.state.title} />
    }
    if(this.state.isLoggedIn){
      
      var hasViewedTheMovie = this.watchedMovieAtleastOnce();

      
      if(hasViewedTheMovie){
        review_link = <a style={{color:'white'}} data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" className="fan-review__write-review-cta cta" >Tell Us What You Think</a>
      }
      else{
        review_link = <a style={{color:'white'}} className="fan-review__write-review-cta cta" >Watch the movie before you place any review!</a>
      }
      
    }
    else{
      review_link =<a href="#" className="fan-review__write-review-cta cta" onClick={this.handleSessionChange.bind(this)}>
      Tell Us What You Think</a>
    }

    var movieReviews = this.state.reviews;
    var totalRating = 0
    var totalReviews = 0
    var average = 0
    if(movieReviews.length>0){
      let reviews = movieReviews.map((item, index) => {
        totalRating = totalRating + item.rating
        totalReviews = totalReviews + 1
      })
    }
    average = totalRating / totalReviews

    
    return (
    <div>
      <div className="bd dark-background" style={{backgroundColor: '#141414'}} lang="en-US">
        <div className="pinning-header">
          <Header callbackFromParent={this.myCallback} />
        </div>
      </div>
      
      <div id="page" role="main">
         <div className="mop" style={{backgroundColor: '#141414'}}>
            <div className="mop__details mop__details--has-image">
               <div className="mop__background js-backgroundBlur">
                  <svg width="100%" height="100%">
                     <defs>
                        <filter id="backgroundBlur" width="150%" height="150%" x="-25%" y="-25%" colorInterpolationFilters="sRGB">
                           <feGaussianBlur stdDeviation="7"/>
                           <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0 0 0 0 10 0"/>
                           <feComposite in2="SourceGraphic" operator="in"></feComposite>
                        </filter>
                     </defs>
                     <image className="js-backgroundBlur-image" x="0" y="0" width="100%" height="100%" xlinkHref= {this.state.image} preserveAspectRatio="xMidYMid slice"/>
                  </svg>
               </div>
               <div className="mop__details-inner">
                  <section className="subnav">
                     <div className="row">
                        <div className="width-100" style={{marginLeft:'24%'}}>
                           <h1 className="subnav__title heading-style-1 heading-size-xl">
                                {this.state.title}
                           </h1>
                        </div>
                     </div>
                  </section>
                  <div className="row mop__layout" style={{marginLeft:'18%', marginTop:'3%'}}>
                     <div className="mop__details-container">
                     <a className="movie-details__mop-link" href="#" backgroundImage = {this.state.image}>
                           <img className="movie-details__movie-img visual-thumb"   src={this.state.image} alt={this.state.title} />
                           </a>
                           <ul className="movie-details__detail">
                                <li> <h2 className="mop__synopsis-title movie-details__release-date">{this.state.title}</h2></li>
                                <li>{this.state.movieRating}</li>
                                <li className="mop__synopsis-title">{this.state.year} {this.state.country}</li>
                                <li className="mop__synopsis-title">Genres: {this.state.genre}</li>
                                <li className="mop__synopsis-title">Studio: {this.state.studio}</li>
                                <li className="mop__synopsis-title">Directors:{this.state.director}</li>
                                <li className="mop__synopsis-title">Actors:{this.state.actors}</li>
                              <li className="fd-star-rating__container">
                                 <div className=" js-fd-star-rating fd-star-rating " data-star-rating={this.state.movieReviewRating / this.state.reviews.length}>
                                 </div>
                              </li>
                              <li className="movie-details__fan-ratings">{this.state.totalReview}</li>
                              <li className="js-rotten-tomatoes"></li>
                           </ul>
                     </div>
                     <div className="mop__content-container">
                        <section className="mop__content">
                           <div className="mop-video">
                              <div
                                 id="vdlpVideoPlayerWrap"
                                 className="media-player"
                                 data-width=""
                                 data-height="350"
                                 style={{height: '350px'}}>
                                 {trailer_link}
                              </div>
                           </div>
                        </section>
                        <div className="mop__ad-unit">
                           <div className="ad" data-unit="boxadm" data-responsive="true" data-media="mobile">
                           </div>
                           <div className="ad" data-unit="boxaddt" data-responsive="true" data-media="desktop,tablet">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div
               className="mop__synopsis "
               >
               <div className="mop__synopsis-inner">
                  <h2 className="mop__synopsis-title">{this.state.title}</h2>
                  <p className="mop__synopsis-content">{this.state.synopsis}</p>
               </div>
            </div>
            <div className="row ad-unit--shop-ad">
               <div className="ad" data-unit="shopad" data-responsive="true" data-media="desktop,tablet">
               </div>
            </div>
            <section className="row">
            </section>
            <section
               className="mop__marketing-spotlight js-marketingSpotlight"
               data-name="movieOverview"
               data-id="201129"
               >
            </section>
            
            <div className="row width-100" style={{marginLeft:'13%', width:"1000px"}}>
              <h3 className="inline heading-style-stub heading-style-1 heading-size-l">Movie Reviews</h3>
              <div className="row">
                  
                  <section className="fan-reviews width-100" style = {{width:"1000px"}}>
                      <div className="fan-reviews__header">
                          <h2 className="fan-reviews__title heading-style-1 heading-size-l">Fan Reviews</h2>
                          {/* <li class="fan-reviews__item"> */}
                            <div className="stars-large__star-rating--no-hover" data-star-rating={Math.ceil(average)} >
                                <span className="stars-large__star icon icon-star-rating-small"></span>
                                <span className="stars-large__star icon icon-star-rating-small"></span>
                                <span className="stars-large__star icon icon-star-rating-small"></span>
                                <span className="stars-large__star icon icon-star-rating-small"></span>
                                <span className="stars-large__star icon icon-star-rating-small"></span>
                            </div>
                          {/* </li> */}
                          {/* <div className="js-fd-star-rating fd-star-rating stars-large__star-rating" data-star-rating="4.5">
                          </div> */}
                      </div>
                      <div className="fan-reviews__content-wrap">
                          <div className="fan-reviews__decoration-top"></div>
                          {this.getMovieReviews()}
                          <div className="fan-reviews__decoration-bottom"></div>
                      </div>
          
                      {review_link}
          
                  </section>
              </div>
          </div>
         </div>
         <div className="js-flyout fd-amenity-flyout">
            <span className="js-flyout__close fd-amenity-flyout__close">X</span>
            <div className="js-flyout__title fd-amenity-flyout__title"></div>
            <div className="js-flyout__desc fd-amenity-flyout__desc"></div>
         </div>
         <section className="favoriteFlyout js-heartsAndStars-flyout">
            <div className="favoriteFlyout__message js-heartsAndStars-flyout-message"></div>
         </section>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <section id="writeReviewForm" class="movie-section write-review-form">
                <h2 class="write-review-form__heading heading-style-1 heading-size-l">Please rate this movie from 1-5 stars</h2>
                <div id="writeReviewForm__ratingInput" class="write-review-form__rating-input">
                    <div class="fd-star-rating__container">
                      <div class="js-rating-input__star-wrap fd-star-rating " data-star-rating="" >
                      <input class="star star-5" id="star-5" type="radio" name="star" />
                      <label class="star star-5" for="star-5" data-rating = "5" onClick = {this.handleStarClick.bind(this)}></label>
                      <input class="star star-4" id="star-4" type="radio" name="star"/>
                      <label class="star star-4" for="star-4" data-rating = "4" onClick = {this.handleStarClick.bind(this)}></label>
                      <input class="star star-3" id="star-3" type="radio" name="star"/>
                      <label class="star star-3" for="star-3" data-rating = "3" onClick = {this.handleStarClick.bind(this)}></label>
                      <input class="star star-2" id="star-2" type="radio" name="star"/>
                      <label class="star star-2" for="star-2" data-rating = "2" onClick = {this.handleStarClick.bind(this)}></label>
                      <input class="star star-1" id="star-1" type="radio" name="star"/>
                      <label class="star star-1" for="star-1" data-rating = "1" onClick = {this.handleStarClick.bind(this)}></label>
                      </div>
                    </div>
                </div>
                <hr class="write-review-form__line" />
                <h2 class="heading-style-1 heading-size-l">Write a review</h2>
                <ul id="writeReviewForm__errors"></ul>
                <section class="write-review-form__group">
                    <textarea rows="12" cols="200" id="writeReviewForm__body" onChange = {this.handleReviewContentChange.bind(this)} ></textarea>
                </section>
                <p class="write-review-form__save-btn">
                    <a id="writeReviewForm__cancel-button" class="btn-cancel" href="/blumhouses-truth-or-dare-2018-208538/movie-reviews">Cancel</a>
                    <button class="btn-cta" id="writeReviewForm__button" onClick = {this.addReview.bind(this)}>Save Review</button>
                </p>
              </section>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      <Footer/>
      
      
    </div>
    )
  }
}


export default MovieDetails;
