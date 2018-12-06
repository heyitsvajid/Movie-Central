import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { post } from 'axios';
import swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import Creatable from './CreatableDemo'
import { envURL, reactURL } from '../config/environment';
import "react-datepicker/dist/react-datepicker.css"
import Pagination from './Pagination';

var moment = require('moment');

class MovieForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            year:'',
            studio:'',
            synopsis: '',
            genre:"",
            image: '',
            trailer_link: '',
            actors: [],
            director: [],
            ratings: 'G', //PG and R
            country: 'AF',
            availability:'FREE', //Free SubscriptionOnly  PayPerViewOnly Paid
            price:'',
            update: false,
            movieList: [],
            searchedMovieList: [],
            movie_keywords: [],
            update_id: 0,
            currentPage: 1, 
            perPageRows: 10,
        }
    }

    componentWillMount() {
        this.loadMovies()
    }

    handleSubmit(e) {
        e.preventDefault();
        if(localStorage.getItem('roleId')!='3'){
            swal({
                type: 'error',
                title: 'Add Movie',
                text: 'Access Denied.',
            })
        }
        else{
            // let titleErrorPresent = !this.validateTitleFormat(this.state.title) ? true : false; 
            // let trailerLinkErrorPresent = !this.validateTrailerLinkFormat(this.state.trailer_link) ? true : false;
            // let movieTimeErrorPresent = !this.validateMovieTimeFormat(this.state.movie_length) ? true : false;
            // let keywordsErrorPresent = !this.validateKeywordsFormat(this.state.movie_keywords) ? true : false;
            // let synopsisErrorPresent = !this.validateSynopsisFormat(this.state.synopsis) ? true : false;
            // let timeErrorPresent = !this.validateTimeFormat(this.state.release_date) ? true : false;

            // if (timeErrorPresent || titleErrorPresent || trailerLinkErrorPresent || movieTimeErrorPresent || keywordsErrorPresent
            //     || synopsisErrorPresent) {
            //     return;
            // }

            var movie = {
                image:this.state.image,
                title: this.state.title,
                trailer: this.state.trailer_link,
                year: this.state.year,
                rating: this.state.mpaa_ratings,
                synopsis:this.state.synopsis,
                studio:this.state.studio,
                actors:this.state.actors,
                director:this.state.director,
                country:this.state.country,
                availability:this.state.availability,
                price:this.state.price,
                genre: this.state.genre,
            }
            debugger

            axios.post(envURL + 'movie',movie,{ headers: { 'Content-Type': 'application/json'}})
                .then((res) => {
                            console.log(res.data);
                            swal({
                            type: 'success',
                            title: 'Add Movie',
                            text: 'Movie Added Successfully',
                        })    
                        this.loadMovies()          
                },(error) => {
                    swal({
                        type: 'error',
                        title: 'Add Movie',
                        text: error.response.data.errorMessage,
                    })
                    console.log('Error adding movies.');
                })    
            
            this.setState({
                title: '',
                year:'',
                genre:'',
                studio:'',
                synopsis: '',
                image: '',
                trailer_link: '',
                actors: [],
                director: [],
                ratings: 'G', //PG and R
                country: 'AF',
                availability:'FREE', //Free SubscriptionOnly  PayPerViewOnly Paid
                price:'',
                update: false,
                update_id: 0
            });
            var that = this;
            setTimeout(function () {
                that.loadMovies()
            }, 2000);
        }
    }

    validateTitleFormat(title){
        if(title.trim() == ""){
          document.getElementById("title_error").innerHTML = "Please enter movie name";
          return false;
        }
        return true;
    }

    validateMovieTimeFormat(movie_length){
        if(movie_length.toString().trim() == ""){
          document.getElementById("movie_length_error").innerHTML = "Please enter movie length";
          return false;
        }
        return true;
    }

    validateTimeFormat(date){
        if(this.state.release_date == null){
            document.getElementById("time_error").innerHTML = "Please enter a release date"
            return false;
        }
        return true;
    }

    validateFile(file){
        if(file == ""){
          document.getElementById("file_error").innerHTML = "Please enter File";
          return false;
        }
        return true;
    }
    
    validateKeywordsFormat(keywords){
        if(keywords.length == 0){
          document.getElementById("keywords_error").innerHTML = "Please enter keywords";
          return false;
        }
        return true;
    }

    validateSynopsisFormat(synopsis){
        if(synopsis == ""){
          document.getElementById("synopsis_error").innerHTML = "Please enter synopsis";
          return false;
        }
        return true;
    }

    validateTrailerLinkFormat(trailer_link){
        const regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        if(trailer_link == ""){
          document.getElementById("trailer_link_error").innerHTML = "Please enter trailer link";
          return false;
        }
        else if(!regex.test(String(trailer_link).toLowerCase())){
          document.getElementById("trailer_link_error").innerHTML = "Please enter valid trailer link";
          return false;
        }
        return true;
    }

    loadMovies() {
            axios.get(envURL + 'movies',{ headers: { 'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log('Fetching all movies');
                            console.log(res.data);
                            this.setState({
                                movieList: res.data ? res.data : [],
                                searchedMovieList: res.data ? res.data : [],
                                currentPage: 1
                            })          
                },(error) => {
                    console.log('Error fetching all movies.');
                })
    }

    multiValueChangeKeywords(val) {
        var multiValues = []
        document.getElementById("keywords_error").innerHTML = "";
        val.forEach(element => {
            multiValues.push(element.value)
        });
        this.setState({
            movie_keywords: multiValues.join(',')
        })
    }

    multiValueChangeActor(val) {
        var multiValues = []
//        document.getElementById("actors_error").innerHTML = "";
        val.forEach(element => {
            multiValues.push(element.value)
        });
        this.setState({
            actors: multiValues.join(',')
        })
    }

    multiValueChangeDirector(val) {
        var multiValues = []
//        document.getElementById("keywords_error").innerHTML = "";
        val.forEach(element => {
            multiValues.push(element.value)
        });
        this.setState({
            director: multiValues.join(',')
        })
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    //    document.getElementById(e.target.name + "_error").innerHTML = "";
        this.setState({ [name]: value })
    }

    handleNextPaginationButton(e) {
        const total_pages = this.state.searchedMovieList.length > 0 ? this.state.searchedMovieList.length/this.state.perPageRows : 0;
        if(this.state.searchedMovieList != [] && this.state.currentPage != Math.ceil(total_pages)){
          this.setState({currentPage: Number(this.state.currentPage + 1)})      
        }
      }
    
    handlePrevPaginationButton(e) {
        if(this.state.searchedMovieList != [] && this.state.currentPage != 1){
            this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
    }

    handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
    }

    returnMovieList() {
        let pagination_list, currentTodos=null;
        if(this.state.searchedMovieList != []){
            const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
            const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
            currentTodos = this.state.searchedMovieList.slice(indexOfFirstTodo, indexOfLastTodo);
            const total_pages = this.state.searchedMovieList.length > 0 ? this.state.searchedMovieList.length/this.state.perPageRows : 0;
            const page_numbers = [];
            for (let i = 1; i <= Math.ceil(this.state.searchedMovieList.length / this.state.perPageRows); i++) {
                page_numbers.push(i);
            }  
            pagination_list = page_numbers.map(number => {
                return (
                <li class="page-item" key= {number} data-id={number} onClick={this.handlePageChange.bind(this)}  ><a data-id={number} class="page-link" href="#">{number}</a></li>
                );
            });
            for(let i = 0; i< currentTodos.length; i++){
                currentTodos[i].current_index = indexOfFirstTodo + i + 1;
            }
        }
        
        let rowNodes = currentTodos.map((item, index) => {
            return (
                <tr>
                    <th scope="row">{item.current_index}</th>
                    <td>{item.title}</td>
                    <td>{item.year}</td>
                    <td>{item.studio}</td>
                    <td>{item.rating}</td>
                    <td>{item.country}</td>
                    <td>{item.availability}</td>
                    <td>
                        <div class = "row">
                            <input type="button" class="dashboard-form-btn link-style nav-link btn-info action-link"
                            value="Update" required="" id={item.id} onClick={this.handleMovieUpdate.bind(this)} />

                            <input style={{marginLeft:"5px"}} type="button" class="dashboard-form-btn link-style nav-link btn-info action-link"
                            value="Delete" required="" id={item.id} onClick={this.handleMovieDelete.bind(this)} />
                        </div>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Year</th>
                            <th scope="col">Studio</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Country</th>
                            <th scope="col">Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowNodes}
                    </tbody>
                </table>
                <Pagination handlePrevPaginationButton = {this.handlePrevPaginationButton.bind(this)} handleNextPaginationButton = {this.handleNextPaginationButton.bind(this)}
                        handlePageChange = {this.handlePageChange.bind(this)} pagination_list = {pagination_list}/>
            </div>
            
        );

    }

    updateMovie(e) {
        e ? e.preventDefault() : ''

        // let titleErrorPresent = !this.validateTitleFormat(this.state.title) ? true : false; 
        // let trailerLinkErrorPresent = !this.validateTrailerLinkFormat(this.state.trailer_link) ? true : false;
        // let movieTimeErrorPresent = !this.validateMovieTimeFormat(this.state.movie_length) ? true : false;
        // let keywordsErrorPresent = !this.validateKeywordsFormat(this.state.movie_keywords) ? true : false;
        // let synopsisErrorPresent = !this.validateSynopsisFormat(this.state.synopsis) ? true : false;
        // let timeErrorPresent = !this.validateTimeFormat(this.state.release_date) ? true : false;

        // if (timeErrorPresent || titleErrorPresent || trailerLinkErrorPresent || movieTimeErrorPresent
        //     || synopsisErrorPresent) {
        //     return;
        // }
 
        var movie = {
            id: this.state.update_id,
            image:this.state.image,
            genre:this.state.genre,
            title: this.state.title,
            trailer: this.state.trailer_link,
            year: this.state.year,
            rating: this.state.mpaa_ratings,
            synopsis:this.state.synopsis,
            studio:this.state.studio,
            actors:this.state.actors,
            director:this.state.director,
            country:this.state.country,
            availability:this.state.availability,
            price:this.state.price,
        }
        debugger
        axios.put(envURL + 'movie/'+this.state.update_id,movie,{ headers: { 'Content-Type': 'application/json'}})
        .then((res) => {
                    console.log(res.data);
                    swal({
                        type: 'success',
                        title: 'Update Movie',
                        text: "Movie Updated Successfully",
                    })
                this.loadMovies()          
        },(error) => {
            swal({
                type: 'error',
                title: 'Update Movie Error',
                text: error.response.data.errorMessage,
            })
            console.log('Error adding movies.');
        })    

        this.setState({
            title: '',
            year:'',
            studio:'',
            synopsis: '',
            image: '',
            trailer_link: '',
            actors: [],
            director: [],
            ratings: 'G', //PG and R
            country: 'AF',
            availability:'FREE', //Free SubscriptionOnly  PayPerViewOnly Paid
            price:'',
            update: false,
            update_id: 0
        });
        var that = this;
        setTimeout(function () {
            that.loadMovies()
        }, 2000);
    }

        handleMovieDelete(e) {
        axios.delete(envURL + 'movie/'+e.target.id,{ headers: { 'Content-Type': 'application/json'}})
        .then((res) => {
                    console.log(res.data);
                    swal({
                        type: 'success',
                        title: 'Delete Movie',
                        text: "Movie Deleted Successfully",
                    })
                this.loadMovies()          
        },(error) => {
            swal({
                type: 'error',
                title: 'Delete Movie Error',
                text: error.response.data.errorMessage,
            })
            console.log('Error adding movies.');
        })    
    }

    
    handleCancel() {
        var message = "To be Implemented: "
        alert(message)
    }

    handleMovieUpdate(e) {
        e ? e.preventDefault() : ''

        // document.getElementById("title_error").innerHTML = "";
        // document.getElementById("trailer_link_error").innerHTML = "";
        // document.getElementById("time_error").innerHTML = "";
        // document.getElementById("movie_length_error").innerHTML = "";
        // document.getElementById("synopsis_error").innerHTML = "";
        // document.getElementById("keywords_error").innerHTML = "";
        // document.getElementById("file_error").innerHTML = "";

        debugger
        this.state.movieList.forEach(element => {
            if (element.id == e.target.id) {
                this.setState({
                    update_id: e.target.id,
                    update: !this.state.update,
                    title: element.title,
                    trailer_link: element.trailer,
                    year: element.year,
                    price: element.price,
                    studio: element.studio,
                    genre: element.genre,
                    ratings: element.ratings,
                    availability: element.availability,
                    country: element.country,
                    actors: element.actors,
                    director: element.director,
                    synopsis : element.synopsis,
                    image: element.image,
                })
                return;
            }
        });

    }

    handleSearchBar(e){
        var searched_array = [];
        if(e.target.value != ""){
            debugger
          if(this.state.movieList.length > 0){
              for(let i = 0; i < this.state.movieList.length; i++){
                var strRegExPattern = new RegExp(e.target.value, 'i');
                var list_element = this.state.movieList[i]
                debugger
                if(list_element.title.match(strRegExPattern) || list_element.studio.match(strRegExPattern) || list_element.rating.match(strRegExPattern) || list_element.availability.match(strRegExPattern)){
                    searched_array.push(list_element);
                }
              }
              this.setState({searchedMovieList: searched_array, currentPage: 1})
          }
        }
        else{
          this.loadMovies();
        }
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-lg-2">
                    <h4 class="c-grey-900 mB-20">All Movies</h4>
                    </div>
                    <div class="col-lg-10">
                    <div id = "search_bar">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search Movie By Name" onChange = {this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                </div>
                <hr/>

                {this.returnMovieList()}
                <br/>
                <hr />
                <hr class='mt-5 mb-5' />
                <h3>{this.state.update ? 'Update' : 'Add New'} Movie</h3>
                <hr />
                <div class="row gap-20 masonry pos-r" style={{position: 'relative', height: '800px'}}>
                    <div class="masonry-item col-md-6" style={{position: 'absolute', top: '0px'}}>
                        <div class="bgc-white p-20 bd">
                            <div class="mT-30">
                                <form id="dashboard-form" className='form-multiplexadmin'>        

                                    <div className="form-group">
                                        <label class="dashboard-label">Title</label>
                                        <input class="form-control" type="text" name="title" placeholder="Enter Movie Title" required="" value={this.state.title} onChange={this.handleUserInput} />
                                        <div id = "title_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Link</label>
                                        <input class="form-control" type="text" name="trailer_link" placeholder="Link" 
                                        required="" value={this.state.trailer_link} onChange={this.handleUserInput} />
                                        <div id = "trailer_link_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Year</label>
                                        <input class="form-control" type="number" name="year" placeholder="Enter Year" 
                                        required="" value={this.state.year} onChange={this.handleUserInput} />
                                        <div id = "year_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Price</label>
                                        <input class="form-control" type="number" name="price" placeholder="Enter Price" 
                                        required="" value={this.state.price} onChange={this.handleUserInput} />
                                        <div id = "price_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Studio</label>
                                        <input class="form-control" type="text" name="studio" placeholder="Enter Studio" 
                                        required="" value={this.state.studio} onChange={this.handleUserInput} />
                                        <div id = "studio_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Genre</label>
                                        <input class="form-control" type="text" name="genre" placeholder="Enter Genre" 
                                        required="" value={this.state.genre} onChange={this.handleUserInput} />
                                        <div id = "genre_error" class= "error"></div>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">MPAA Ratings</label>
                                            <br/>
                                            <select class="form-control col-sm-5" value={this.state.mpaa_ratings}
                                                onChange={this.handleUserInput} name="mpaa_ratings" id="mpaa_ratings">
                                                <option value="G">General Audience</option>
                                                <option value="PG">PG – Parental Guidance Suggested</option>
                                                <option value="PG-13">PG-13 – Parents Strongly Cautioned</option>
                                                <option value="R">R – Restricted</option>
                                                <option value="NC-17">NC-17 – Adults Only</option>
                                            </select>
                                            <div id = "mpaa_ratings_error" class= "error"></div>
                                        </div>
                                        </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Availability</label>
                                            <br/>
                                            <select class="form-control col-sm-5" value={this.state.availability}
                                                onChange={this.handleUserInput} name="availability" id="availability">
                                                <option value="FREE">Free</option>
                                                <option value="SBCR">Subscription</option>
                                                <option value="PPVO">Pay per view</option>
                                                <option value="PAID">Paid</option>
                                            </select>
                                            <div id = "availability_error" class= "error"></div>
                                        </div>
                                        </div>


                                        <div class="form-row">
                                        <div className="form-group col-md-6">
                                            <label class="dashboard-label">Country</label>
                                            <br/>
                                            <select class="form-control col-sm-5" value={this.state.country}
                                                onChange={this.handleUserInput} name="country" id="country">
<option value="AF">Afghanistan</option>
	<option value="AX">Åland Islands</option>
	<option value="AL">Albania</option>
	<option value="DZ">Algeria</option>
	<option value="AS">American Samoa</option>
	<option value="AD">Andorra</option>
	<option value="AO">Angola</option>
	<option value="AI">Anguilla</option>
	<option value="AQ">Antarctica</option>
	<option value="AG">Antigua and Barbuda</option>
	<option value="AR">Argentina</option>
	<option value="AM">Armenia</option>
	<option value="AW">Aruba</option>
	<option value="AU">Australia</option>
	<option value="AT">Austria</option>
	<option value="AZ">Azerbaijan</option>
	<option value="BS">Bahamas</option>
	<option value="BH">Bahrain</option>
	<option value="BD">Bangladesh</option>
	<option value="BB">Barbados</option>
	<option value="BY">Belarus</option>
	<option value="BE">Belgium</option>
	<option value="BZ">Belize</option>
	<option value="BJ">Benin</option>
	<option value="BM">Bermuda</option>
	<option value="BT">Bhutan</option>
	<option value="BO">Bolivia, Plurinational State of</option>
	<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
	<option value="BA">Bosnia and Herzegovina</option>
	<option value="BW">Botswana</option>
	<option value="BV">Bouvet Island</option>
	<option value="BR">Brazil</option>
	<option value="IO">British Indian Ocean Territory</option>
	<option value="BN">Brunei Darussalam</option>
	<option value="BG">Bulgaria</option>
	<option value="BF">Burkina Faso</option>
	<option value="BI">Burundi</option>
	<option value="KH">Cambodia</option>
	<option value="CM">Cameroon</option>
	<option value="CA">Canada</option>
	<option value="CV">Cape Verde</option>
	<option value="KY">Cayman Islands</option>
	<option value="CF">Central African Republic</option>
	<option value="TD">Chad</option>
	<option value="CL">Chile</option>
	<option value="CN">China</option>
	<option value="CX">Christmas Island</option>
	<option value="CC">Cocos (Keeling) Islands</option>
	<option value="CO">Colombia</option>
	<option value="KM">Comoros</option>
	<option value="CG">Congo</option>
	<option value="CD">Congo, the Democratic Republic of the</option>
	<option value="CK">Cook Islands</option>
	<option value="CR">Costa Rica</option>
	<option value="CI">Côte d'Ivoire</option>
	<option value="HR">Croatia</option>
	<option value="CU">Cuba</option>
	<option value="CW">Curaçao</option>
	<option value="CY">Cyprus</option>
	<option value="CZ">Czech Republic</option>
	<option value="DK">Denmark</option>
	<option value="DJ">Djibouti</option>
	<option value="DM">Dominica</option>
	<option value="DO">Dominican Republic</option>
	<option value="EC">Ecuador</option>
	<option value="EG">Egypt</option>
	<option value="SV">El Salvador</option>
	<option value="GQ">Equatorial Guinea</option>
	<option value="ER">Eritrea</option>
	<option value="EE">Estonia</option>
	<option value="ET">Ethiopia</option>
	<option value="FK">Falkland Islands (Malvinas)</option>
	<option value="FO">Faroe Islands</option>
	<option value="FJ">Fiji</option>
	<option value="FI">Finland</option>
	<option value="FR">France</option>
	<option value="GF">French Guiana</option>
	<option value="PF">French Polynesia</option>
	<option value="TF">French Southern Territories</option>
	<option value="GA">Gabon</option>
	<option value="GM">Gambia</option>
	<option value="GE">Georgia</option>
	<option value="DE">Germany</option>
	<option value="GH">Ghana</option>
	<option value="GI">Gibraltar</option>
	<option value="GR">Greece</option>
	<option value="GL">Greenland</option>
	<option value="GD">Grenada</option>
	<option value="GP">Guadeloupe</option>
	<option value="GU">Guam</option>
	<option value="GT">Guatemala</option>
	<option value="GG">Guernsey</option>
	<option value="GN">Guinea</option>
	<option value="GW">Guinea-Bissau</option>
	<option value="GY">Guyana</option>
	<option value="HT">Haiti</option>
	<option value="HM">Heard Island and McDonald Islands</option>
	<option value="VA">Holy See (Vatican City State)</option>
	<option value="HN">Honduras</option>
	<option value="HK">Hong Kong</option>
	<option value="HU">Hungary</option>
	<option value="IS">Iceland</option>
	<option value="IN">India</option>
	<option value="ID">Indonesia</option>
	<option value="IR">Iran, Islamic Republic of</option>
	<option value="IQ">Iraq</option>
	<option value="IE">Ireland</option>
	<option value="IM">Isle of Man</option>
	<option value="IL">Israel</option>
	<option value="IT">Italy</option>
	<option value="JM">Jamaica</option>
	<option value="JP">Japan</option>
	<option value="JE">Jersey</option>
	<option value="JO">Jordan</option>
	<option value="KZ">Kazakhstan</option>
	<option value="KE">Kenya</option>
	<option value="KI">Kiribati</option>
	<option value="KP">Korea, Democratic People's Republic of</option>
	<option value="KR">Korea, Republic of</option>
	<option value="KW">Kuwait</option>
	<option value="KG">Kyrgyzstan</option>
	<option value="LA">Lao People's Democratic Republic</option>
	<option value="LV">Latvia</option>
	<option value="LB">Lebanon</option>
	<option value="LS">Lesotho</option>
	<option value="LR">Liberia</option>
	<option value="LY">Libya</option>
	<option value="LI">Liechtenstein</option>
	<option value="LT">Lithuania</option>
	<option value="LU">Luxembourg</option>
	<option value="MO">Macao</option>
	<option value="MK">Macedonia, the former Yugoslav Republic of</option>
	<option value="MG">Madagascar</option>
	<option value="MW">Malawi</option>
	<option value="MY">Malaysia</option>
	<option value="MV">Maldives</option>
	<option value="ML">Mali</option>
	<option value="MT">Malta</option>
	<option value="MH">Marshall Islands</option>
	<option value="MQ">Martinique</option>
	<option value="MR">Mauritania</option>
	<option value="MU">Mauritius</option>
	<option value="YT">Mayotte</option>
	<option value="MX">Mexico</option>
	<option value="FM">Micronesia, Federated States of</option>
	<option value="MD">Moldova, Republic of</option>
	<option value="MC">Monaco</option>
	<option value="MN">Mongolia</option>
	<option value="ME">Montenegro</option>
	<option value="MS">Montserrat</option>
	<option value="MA">Morocco</option>
	<option value="MZ">Mozambique</option>
	<option value="MM">Myanmar</option>
	<option value="NA">Namibia</option>
	<option value="NR">Nauru</option>
	<option value="NP">Nepal</option>
	<option value="NL">Netherlands</option>
	<option value="NC">New Caledonia</option>
	<option value="NZ">New Zealand</option>
	<option value="NI">Nicaragua</option>
	<option value="NE">Niger</option>
	<option value="NG">Nigeria</option>
	<option value="NU">Niue</option>
	<option value="NF">Norfolk Island</option>
	<option value="MP">Northern Mariana Islands</option>
	<option value="NO">Norway</option>
	<option value="OM">Oman</option>
	<option value="PK">Pakistan</option>
	<option value="PW">Palau</option>
	<option value="PS">Palestinian Territory, Occupied</option>
	<option value="PA">Panama</option>
	<option value="PG">Papua New Guinea</option>
	<option value="PY">Paraguay</option>
	<option value="PE">Peru</option>
	<option value="PH">Philippines</option>
	<option value="PN">Pitcairn</option>
	<option value="PL">Poland</option>
	<option value="PT">Portugal</option>
	<option value="PR">Puerto Rico</option>
	<option value="QA">Qatar</option>
	<option value="RE">Réunion</option>
	<option value="RO">Romania</option>
	<option value="RU">Russian Federation</option>
	<option value="RW">Rwanda</option>
	<option value="BL">Saint Barthélemy</option>
	<option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
	<option value="KN">Saint Kitts and Nevis</option>
	<option value="LC">Saint Lucia</option>
	<option value="MF">Saint Martin (French part)</option>
	<option value="PM">Saint Pierre and Miquelon</option>
	<option value="VC">Saint Vincent and the Grenadines</option>
	<option value="WS">Samoa</option>
	<option value="SM">San Marino</option>
	<option value="ST">Sao Tome and Principe</option>
	<option value="SA">Saudi Arabia</option>
	<option value="SN">Senegal</option>
	<option value="RS">Serbia</option>
	<option value="SC">Seychelles</option>
	<option value="SL">Sierra Leone</option>
	<option value="SG">Singapore</option>
	<option value="SX">Sint Maarten (Dutch part)</option>
	<option value="SK">Slovakia</option>
	<option value="SI">Slovenia</option>
	<option value="SB">Solomon Islands</option>
	<option value="SO">Somalia</option>
	<option value="ZA">South Africa</option>
	<option value="GS">South Georgia and the South Sandwich Islands</option>
	<option value="SS">South Sudan</option>
	<option value="ES">Spain</option>
	<option value="LK">Sri Lanka</option>
	<option value="SD">Sudan</option>
	<option value="SR">Suriname</option>
	<option value="SJ">Svalbard and Jan Mayen</option>
	<option value="SZ">Swaziland</option>
	<option value="SE">Sweden</option>
	<option value="CH">Switzerland</option>
	<option value="SY">Syrian Arab Republic</option>
	<option value="TW">Taiwan, Province of China</option>
	<option value="TJ">Tajikistan</option>
	<option value="TZ">Tanzania, United Republic of</option>
	<option value="TH">Thailand</option>
	<option value="TL">Timor-Leste</option>
	<option value="TG">Togo</option>
	<option value="TK">Tokelau</option>
	<option value="TO">Tonga</option>
	<option value="TT">Trinidad and Tobago</option>
	<option value="TN">Tunisia</option>
	<option value="TR">Turkey</option>
	<option value="TM">Turkmenistan</option>
	<option value="TC">Turks and Caicos Islands</option>
	<option value="TV">Tuvalu</option>
	<option value="UG">Uganda</option>
	<option value="UA">Ukraine</option>
	<option value="AE">United Arab Emirates</option>
	<option value="GB">United Kingdom</option>
	<option value="US">United States</option>
	<option value="UM">United States Minor Outlying Islands</option>
	<option value="UY">Uruguay</option>
	<option value="UZ">Uzbekistan</option>
	<option value="VU">Vanuatu</option>
	<option value="VE">Venezuela, Bolivarian Republic of</option>
	<option value="VN">Viet Nam</option>
	<option value="VG">Virgin Islands, British</option>
	<option value="VI">Virgin Islands, U.S.</option>
	<option value="WF">Wallis and Futuna</option>
	<option value="EH">Western Sahara</option>
	<option value="YE">Yemen</option>
	<option value="ZM">Zambia</option>
	<option value="ZW">Zimbabwe</option>
                                            </select>
                                            <div id = "country_error" class= "error"></div>
                                        </div>
                                        </div>

                                        {/* <div className="form-group col-md-6">
                                            <label class="dashboard-label">Definition</label>
                                            <br/>
                                            <select class="form-control col-sm-5" value={this.state.movie_definition}
                                                onChange={this.handleUserInput} name="movie_definition" id="movie_definition">
                                                <option value="HD">HD</option>
                                                <option value="HHD">HHD</option>
                                            </select>
                                            <div id = "movie_definition_error" class= "error"></div>
                                        </div> */}
                                    

                                    {/* // <div className="form-group">
                                    //     <label class="dashboard-label">Movie Keywords</label>
                                    //     <Creatable amenities={this.state.movie_keywords} multiValueChange={this.multiValueChangeKeywords.bind(this)} />
                                    //     <div id = "keywords_error" class= "error"></div>  
                                    // </div> */}

                                    <div className="form-group">
                                        <label class="dashboard-label">Actors</label>
                                        <Creatable amenities={this.state.actors} multiValueChange={this.multiValueChangeActor.bind(this)} />
                                        <div id = "actors_error" class= "error"></div>  
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Directors</label>
                                        <Creatable amenities={this.state.director} multiValueChange={this.multiValueChangeDirector.bind(this)} />
                                        <div id = "director_error" class= "error"></div>  
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Synopsis</label>
                                        <input class="form-control" type="textarea" name="synopsis" placeholder="Short Movie Description" 
                                        required="" value={this.state.synopsis} onChange={this.handleUserInput} />
                                        <div id = "synopsis_error" class= "error"></div>
                                    </div>

                                    <div className="form-group">
                                        <label class="dashboard-label">Movie Logo</label>
                                        <input class="form-control" placeholder="Provide Movie Image URL" name = "image" value={this.state.image} type="text" onChange={this.handleUserInput}  />
                                        <div id = "image_error" class= "error"></div>
                                    </div>

                                    <div class="form-row">
                                        <div className="form-group col-md-3">
                                        {this.state.update ? <input type="submit" class="dashboard-form-btn btn btn-primary"
                                                value="Update Movie" required="" onClick={this.updateMovie.bind(this)} /> : <input type="submit" class="dashboard-form-btn btn btn-primary"
                                                    value="Add Movie" required="" onClick={this.handleSubmit.bind(this)} />}
                                        </div>

                                        <div className="form-group col-md-3">
                                            <input type="reset" class="dashboard-form-btn btn btn-default" value="Cancel" onClick={this.handleCancel.bind(this)} />
                                            
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }



}

export default withRouter(MovieForm);
