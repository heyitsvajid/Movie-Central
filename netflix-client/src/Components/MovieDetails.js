
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert2'
import '../assets/css/movie-details.css'
import ReactPlayer from 'react-player'

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
        review : null
        // reviewCount:0
    }
    this.fetchDataFromServer = this.fetchDataFromServer.bind(this);
    // this.getMovieReviews = this.getMovieReviews.bind(this);
  }

    componentWillMount(){
        this.fetchDataFromServer();
        // this.fetchReviews();
    }

  fetchDataFromServer(){

    // var url = envURL + 'isLoggedIn'
    const { movieId } = this.props.match.params
    // this.setState({
    //     movieId: this.props.match.params
    // })
    // alert(movieId)

    // axios.get(envURL + 'isLoggedIn', {withCredentials: true})
    // .then((response) => {
    //     console.log("After checking the session", response.data);
            // if(response.data.role.name === 'CUSTOMER'){
                // console.log("Already Logged In. Getting movie")
                axios.get(envURL + 'movie/' + movieId,{ headers: { 'Content-Type': 'application/json'}})
                .then((res) => {
                            console.log(res.data);
                            // debugger
                            this.setState({
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
    }
    //         else if(response.data.role.name === 'ADMIN') {
    //             console.log("Already Logged In. Redirecting to admin dashboard")
    //             this.props.history.push('/adminDashboard');
    //         }else{
    //             console.log("Error checking session")
    //         }
    // },
//     (error) => { 
//         this.props.history.push('/login');
//         console.log(error)})

//   }





getMovieReviews(){
    var movieReviews = this.state.reviews;
    if(movieReviews.length>0){
      let reviews = movieReviews.map((item, index) => {
    //     let ratingsHash = { 1: "", 2: "",  3: "", 4: "", 5: "" };
    //     var item_ratings = item.rating;
    //     for(let i = Object.keys(ratingsHash).length; i > 0 ; i--){
    //       if(item_ratings > 0){
    //         ratingsHash[i] = "checked"
    //         item_ratings-=1;
    //       }
    //     }
        this.state.movieReviewRating  = this.state.movieReviewRating + item.rating
        return (
          <li class="fan-reviews__item">
            <div className="stars-large__star-rating--no-hover" data-star-rating={item.rating}>
                <span className="stars-large__star icon icon-star-rating-small"></span>
                <span className="stars-large__star icon icon-star-rating-small"></span>
                <span className="stars-large__star icon icon-star-rating-small"></span>
                <span className="stars-large__star icon icon-star-rating-small"></span>
                <span className="stars-large__star icon icon-star-rating-small"></span>
            </div>
            {/* <div className="fan-reviews__headline heading-style-1 heading-size-l">
                Ralph Breaks The Internet
            </div>

            <div className="fan-reviews__user-name">
                By mjauer04

            </div>
            <div className="fan-reviews__review">The movie was hilarious! I liked that there was YouTube, Facebook, Snapchat, Instagram, Twitter, eBay, Fandango, IMDb, Amazon, ect!</div> */}
            {/* <div class="stars-large__star-rating--no-hover" data-star-rating="4">
              <span className={'fa fa-star ' + ratingsHash[1]} ></span>
              <span className={'fa fa-star ' + ratingsHash[2]}></span>
              <span className={'fa fa-star ' + ratingsHash[3]}></span>
              <span className={'fa fa-star ' + ratingsHash[4]}></span>
              <span className={'fa fa-star ' + ratingsHash[5]}></span>
            </div> */}
            {/* <div class="user-review-heading fan-reviews__headline heading-style-1 heading-size-l">
                {item.title}
            </div>
            <div class="fan-reviews__user-name">
                By {item.user_name}
            </div> */}

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
  handleTrailerClick(e){
    if(this.state.movie.trailer_link != undefined){
      window.open(this.state.movie.trailer_link);
    }
  }


  addReview() {
      debugger
    var review = {
        rating: this.state.rating,
        review: this.state.review != "" ? this.state.review : "No Content Supplied!",
        userId: localStorage.userid,
        movieId: this.state.movieId
    }

    // var apiPayload = { review: review };
    let addReview = envURL + 'review';

    axios.post(addReview, review)
        .then(res => {
            debugger
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
    debugger
  }

//   handleTitleChange(e){
//     this.setState({ title: e.target.value });
//   }

  handleReviewContentChange(e){
    this.setState({ review: e.target.value });
  }


  handleSessionChange(e){
    this.props.history.push("/login")
  }

  render() {
     let movie_image, trailer_link, keywords_list, review_link = null;
    if(this.state.image != undefined){
    //   movie_image = <img className="movie-details__movie-img visual-thumb" src = {require('../images/' + this.state.image)} alt= {this.state.title} />
      movie_image = <img className="movie-details__movie-img visual-thumb" src = {this.state.image} alt= {this.state.title} />
      trailer_link = <a href = {this.state.trailer}><img id="img-link" src={this.state.image} alt={this.state.title} itemprop="image" /></a>
    }
    if(this.state.isLoggedIn){
      review_link = <a data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" className="fan-review__write-review-cta cta" href="https://www.fandango.com/blumhouses-truth-or-dare-2018_208538/writeuserreviews">
      Tell Us What You Think</a>
    }
    else{
      review_link =<a href="#" className="fan-review__write-review-cta cta" onClick={this.handleSessionChange.bind(this)}>
      Tell Us What You Think</a>
    }

    
      
    // }

    // debugger
    return (
    <div>
      <div className="bd dark-background" style={{backgroundColor: '#141414'}} lang="en-US">
        <div className="pinning-header">
          <Header/>
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
                     {/* <video className="js-backgroundBlur-image" x="0" y="0" width="100%" height="100%" src={this.state.trailer}></video> */}
                     <image className="js-backgroundBlur-image" x="0" y="0" width="100%" height="100%" xlinkHref= {this.state.image} preserveAspectRatio="xMidYMid slice"/>
                  </svg>
               </div>
               <div className="mop__details-inner">
                  <section className="subnav">
                     <div className="row">
                        <div className="width-100">
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
                                <li>{this.state.rating}</li>
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
                                 <ReactPlayer url={this.state.trailer} onPause/>
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
            
            <div className="row width-100" style={{marginLeft:'13%'}}>
              <h3 className="inline heading-style-stub heading-style-1 heading-size-l">Movie Reviews</h3>
              <div className="row">
                  
                  <section className="fan-reviews width-100">
                      <div className="fan-reviews__header">
                          <h2 className="fan-reviews__title heading-style-1 heading-size-l">Fan Reviews</h2>
                          <div className="js-fd-star-rating fd-star-rating stars-large__star-rating" data-star-rating="4.5">
                          </div>
                          {/* <a className="cta fan-reviews__all-reviews" href="/ralph-breaks-the-internet-201129/movie-reviews">See All Fan Reviews</a> */}
                      </div>
                      <div className="fan-reviews__content-wrap">
                          <div className="fan-reviews__decoration-top"></div>
                          {this.getMovieReviews()}
                          <div className="fan-reviews__decoration-bottom"></div>
                      </div>
          
                      <a data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" className="fan-review__write-review-cta cta" >Tell Us What You Think</a>
          
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
                {/* <section class="write-review-form__group">
                    <label for="writeReviewForm__title">Title:</label>
                     <input type="text" maxlength="200" id="writeReviewForm__title" onChange = {this.handleTitleChange.bind(this)}/>
                </section> */}
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