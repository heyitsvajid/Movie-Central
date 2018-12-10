import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import { post } from 'axios';
import { envURL, reactURL } from '../config/environment';
import '../assets/css/style.css'
import '../assets/css/admin.css'
import swal from "sweetalert";
import Pagination from './Pagination';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Line, AreaChart, LineChart} from 'recharts';

class ListAllUsers extends Component {

    constructor() {
        super();
        this.state = {
            listSubscriptions:[],
            listViews:[],
            showUserViews:false,
            showUserSubscriptions:false,
            multiplex_admins : [],
            users: [],
            searchedUsers: [],
            UserID : '',
            first_name : '',
            last_name : '',
            email : '',
            phone_number : '',
            address : '',
            city : '',
            state_name : 'AL',
            zipcode : '',
            Role_Number : '',
            currentPage: 1,
            perPageRows: 5,
            allUserSessionDetails: [],
            currentSessionUserId: "",
            sessionOptions: [],
            currentSessionObject: [],
            finalGraphData: [],
            update_id: 0,
            update: false,
        };
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        document.getElementById(e.target.name + "_error").innerHTML = "";
        console.log(this.state)
    }

    componentWillMount(){
        this.getAllUsers();
    }


    getAllUserSubscriptions = (e) => {
        debugger
        let userId = e.target.id;
        let url = envURL + 'payment/user/'+ userId;
        axios.get( url, { withCredentials : true } )
            .then((response) => {
                console.log("In Get All Users Subscriptions", response.data);
                this.setState({
                    listSubscriptions : response.data ? response.data : [],
                    showUserViews:false,
                    showUserSubscriptions:true,
        
                }, () => {
                    console.log("Users Array set", this.state.users )
                })
            },(error) => {
                console.log("Error fetching all users")
                console.log(error)
            }
            )
    };
    

    getAllUserViews = (e) => {
        let userId = e.target.id;
        let url = envURL + 'view/user/'+ userId;
        axios.get( url, { withCredentials : true } )
            .then((response) => {
                console.log("In Get All Users Subscriptions", response.data);
                this.setState({
                    listViews : response.data ? response.data : [],
                    showUserViews:true,
                    showUserSubscriptions:false,
                }, () => {
                    console.log("Users Array set", this.state.users )
                })
            },(error) => {
                console.log("Error fetching all users")
                console.log(error)
            }
            )
    };

    getAllUsers = () => {
        let url = envURL + 'users/';
        axios.get( url, { withCredentials : true } )
            .then((response) => {
                console.log("In Get All Users", response.data);
                this.setState({
                    users : response.data ? response.data : [],
                    searchedUsers:  response.data ? response.data : [],
                    currentPage: 1
                }, () => {
                    console.log("Users Array set", this.state.users )
                })
            },(error) => {
                console.log("Error fetching all users")
                console.log(error)
            }
            )
    };

    updateUser(e) {
        e ? e.preventDefault() : ''

    }

    validateEmailFormat(email){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email == ""){
          document.getElementById("email_error").innerHTML = "Please enter your email";
          return false;
        }
        else if(!regex.test(String(email).toLowerCase())){
          document.getElementById("email_error").innerHTML = "Please enter valid email address";
          return false;
        }
        return true;
    }

    validatePhoneNumberFormat(contact_no){
        const regex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
        debugger
        if(contact_no==""){
            return true;
        }
        else if(!regex.test(String(contact_no).toLowerCase())){
          document.getElementById("phone_number_error").innerHTML = "Please enter valid Contact Number";
          return false;
        }
        return true;
      }

    validateZipcodeFormat(zipcode){
        const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
        if(zipcode==""){
            return true;
        }
        else if(!regex.test(String(zipcode).toLowerCase())){
          document.getElementById("zipcode_error").innerHTML = "Please enter valid Zipcode";
          return false;
        }
        return true;
    }    
  
    validateFirstNameFormat(first_name){
        if(first_name.trim() == ""){
          document.getElementById("first_name_error").innerHTML = "Please enter first name";
          return false;
        }
        return true;
    }
    
    handleDeleteUser = (e) => {
        swal({
            title: "Are you sure?",
            text: "We regret leaving you!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log("In handleDeleteUser, id :", e );
                    let id = { id : e };
                    let url = envURL + 'delete';
                    axios.post( url, id, { withCredentials : true } )
                    .then( (response) => {
                        console.log(response.data);
                        swal({
                            type: 'success',
                            title: 'User Deleted Successfully',
                            text: "",
                        });
                        this.getAllUsers();
                    })
                }
            });
    };
    
    handleNextPaginationButton(e) {
        const total_pages = this.state.searchedUsers.length > 0 ? this.state.searchedUsers.length/this.state.perPageRows : 0;
        if(this.state.searchedUsers != [] && this.state.currentPage != Math.ceil(total_pages)){
            this.setState({currentPage: Number(this.state.currentPage + 1)})
        }
    }
    
    handlePrevPaginationButton(e) {
        if(this.state.searchedUsers != [] && this.state.currentPage != 1){
            this.setState({currentPage: Number(this.state.currentPage - 1)})
        }
    }
    
    handlePageChange(e) {
        this.setState({currentPage: Number(e.target.dataset.id)})
    }

    handleSearchBar(e){
        var searched_array = [];
        if(e.target.value != ""){
          if(this.state.users.length > 0){
              for(let i = 0; i < this.state.users.length; i++){
                var strRegExPattern = new RegExp(e.target.value, 'i');
                let list_element = this.state.users[i]
                if(list_element.name.match(strRegExPattern) || list_element.email.match(strRegExPattern)){
                    searched_array.push(list_element);
                }
              }
              this.setState({searchedUsers: searched_array, currentPage: 1})
          }
        }
        else{
          this.getAllUsers();
        }
    }

    setGraphData(e){
        let finalData=[]
        var session = this.state.currentSessionObject.session[e.target.value]

        session.pages.forEach((element,index) => {
            finalData.push({
                page:session.pages[index],
                time:parseInt(session.pageTime[index])/1000 
            });     
        });
        this.setState({finalGraphData: finalData});
    }


    returnUserList() {
        let pagination_list, currentTodos=null;
        if(this.state.searchedUsers != []){
            const indexOfLastTodo = this.state.currentPage * this.state.perPageRows;
            const indexOfFirstTodo = indexOfLastTodo - this.state.perPageRows;
            currentTodos = this.state.searchedUsers.slice(indexOfFirstTodo, indexOfLastTodo);
            const total_pages = this.state.searchedUsers.length > 0 ? this.state.searchedUsers.length/this.state.perPageRows : 0;
            const page_numbers = [];
            for (let i = 1; i <= Math.ceil(this.state.searchedUsers.length / this.state.perPageRows); i++) {
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
                    <th scope="row"> { item.current_index } </th>
                    <td>{ item.name }</td>
                    
                    <td> { item.email } </td>
                    <td> { item.role.name } </td>
                    <td> { new Date(item.role.createdAt).toDateString() } </td>

                    <td>
                        <div class="row">
                            <div className="form-group col-ml-2">
                                <input type="button" id={item.id} class="dashboard-form-btn link-style nav-link btn-info action-link"
                                    value="Subscriptions" required=""  onClick={this.getAllUserSubscriptions.bind(this)} />
                            </div>

                            <div className="form-group col-ml-5">
                                <input type="button" id={item.id} class="dashboard-form-btn link-style nav-link btn-info action-link"
                                    value="Views" required=""  onClick={this.getAllUserViews.bind(this)} />
                            </div>


                            <div className="form-group col-ml-5">
                            <input type="button" id={item.id} class="dashboard-form-btn link-style nav-link btn-danger action-link"
                                    value="Delete" required=""  onClick={this.handleDeleteUser.bind(this)} />
                            </div>
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
                            <th scope="col"> # </th>
                            {/* <th scope="col"> User ID </th> */}
                            <th scope="col"> Name</th>
                            <th scope="col"> Email </th>
                            <th scope="col"> Role </th>
                            <th scope="col"> Registered On </th>
                            <th scope="col"> Admin Actions </th>

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

    returnSubscriptionList() {
        var userSBCRS = this.state.listSubscriptions;
        let rowNodes = userSBCRS.map((item,index) => {
            return (
                <tr>
                    <th scope="row"> { item.current_index } </th>
                    <td>{ item.subscription.type ? item.subscription.type : '' }</td>
                    <td>{ item.subscription.type == 'SBCR' ? '-' : item.movie.title }</td>
                    <td> { new Date(item.startAt).toDateString() } </td>
                    <td> { new Date(item.endAt).toDateString()}  </td>
                    <td> { item.amount } </td>
                </tr>
            )
        });       
        return (
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> # </th>
                            <th scope="col"> Subscription Type</th>
                            <th scope="col"> Movie </th>
                            <th scope="col"> Start At </th>
                            <th scope="col"> End At </th>
                            <th scope="col"> Amount </th>

                        </tr>
                    </thead>
                    <tbody>
                        {rowNodes}
                    </tbody>
                </table>

            </div>
            
        );
    }


    returnViewsList() {
        var userViews = this.state.listViews;        
        const sortBy = fn => (a, b) => -(fn(a) < fn(b)) || +(fn(a) > fn(b))
        const getTimestamp = o => o.getTimestamp
        const sortByTimestamp = sortBy(getTimestamp)
        userViews.sort(sortByTimestamp)
        userViews.reverse()
        let rowNodes = userViews.map((item,index) => {
            return (
                <tr>
                    <th scope="row"> { item.current_index } </th>
                    <td>{ item.movie.title }</td>
                    <td> { new Date(item.timestamp).toString() } </td>
                    <td>{ item.movie.availability }</td>
                    <td> { item.movie.price } </td>
                </tr>
            )
        });

        return (
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> # </th>
                            <th scope="col"> Movie </th>
                            <th scope="col"> Viewed At </th>
                            <th scope="col"> Availability </th>
                            <th scope="col"> Amount </th>

                        </tr>
                    </thead>
                    <tbody>
                        {rowNodes}
                    </tbody>
                </table>

            </div>
            
        );

    }


    render() {
        return(
            <div className='AllBillingDetails container-fluid'>
                <br/>
                <div class="row">
                    <div class="col-lg-2">
                    <h4 class="c-grey-900 mB-20">All Users</h4>
                    </div>
                    <div class="col-lg-10">
                    <div id = "search_bar">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search User By Name or Email" onChange = {this.handleSearchBar.bind(this)}/>
                        </div>
                    </div>
                    </div>
                    
                </div>
                <hr/>
                {this.returnUserList()}


            <div class="row">
                    <div class="col-lg-4">
                    <h4 class="c-grey-900 mB-5">User {this.state.showUserSubscriptions ? 'Subscriptions' : this.state.showUserViews ? 'Views' : 'Activity'} </h4>
                    </div>
                    <div class="col-lg-10">
                    <div id = "user_activity">
                    </div>
                    </div>
                </div>
                <hr/>
                {this.state.showUserSubscriptions ? this.returnSubscriptionList() : ''}
                {this.state.showUserViews ? this.returnViewsList() : ''}



</div>                   

        );
    }
}

export default withRouter(ListAllUsers);