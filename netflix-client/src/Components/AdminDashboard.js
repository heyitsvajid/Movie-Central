import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '../assets/css/admin.css'
import AllBillingDetails from './AllBillingDetails';
import ListAllUsers from './ListAllUsers'
import AdminGraphs from './AdminGraphs';
import MovieForm from './MovieForm';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';


class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMovie: false,
            addDashboard: true,
            addUserTracking: false,
            showBillingDetails: false,
            showMultiplexBillings: false,
            listUsers: false,
            isLoggedIn: false,
            addMovie: false,
            user:{}

        };
        this.handleLogout = this.handleLogout.bind(this);

    }

    componentWillMount() {
        axios.get(envURL + 'isLoggedIn', {withCredentials: true})
            .then((response) => {
                
                console.log("After checking the session", response.data);
                    if(response.data.role.name === 'CUSTOMER'){
                        console.log("Already Logged In. Redirecting to home page")
                        this.props.history.push('/');    
                    }
                    else if(response.data.role.name === 'ADMIN') {
                        localStorage.setItem('roleId',3)
                        console.log("Already Logged In")
                        this.setState({
                           user: response.data,
                        })
                    }else{
                        console.log("Error checking session")
                    }
            },
            (error) => { 
                console.log(error)})
    }

    handleLinkClick = (e) => {
        e.preventDefault();
        this.setState({
            addDashboard: e.currentTarget.value == 1,
            addMultiplex: e.currentTarget.value == 4,
            addMovie: e.currentTarget.value == 3,
            showBillingDetails: e.currentTarget.value == 7,
            listUsers: e.currentTarget.value == 8,
        })
        console.log(this.state);
    }

    render() {
        let addDashboard = 1;
        let addMovie = 3;
        let addMultiplexAdmin = 5;
        let showBillingDetails = 7;
        let listUsers = 8;
        return (
            // </body>
            <body class="app" id="admin-pages">
                <div id="loader" class="fadeOut">
                    <div class="spinner"></div>
                </div>
                
                <div>
                    <div class="sidebar">
                        <div class="sidebar-inner">
                            <div class="sidebar-logo">
                                <div class="peers ai-c fxw-nw">
                                    <div class="peer peer-greed">
                                        <a class="sidebar-link td-n" href="https://colorlib.com/polygon/adminator/index.html">
                                            <div class="peers ai-c fxw-nw">
                                            <div class="peer">
                                                <div class="logo"><img src="https://colorlib.com/polygon/adminator/assets/static/images/logo.png" alt="" /></div>
                                            </div>
                                            <div class="peer peer-greed">
                                                <h5 class="admin-head lh-1 mB-0 logo-text">Administrator</h5>
                                            </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="peer">
                                        <div class="mobile-toggle sidebar-toggle"><a href="" class="td-n"><i class="ti-arrow-circle-left"></i></a></div>
                                    </div>
                                </div>
                            </div>
                            
                            <ul class="sidebar-menu scrollable pos-r ps">

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={addDashboard} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={addMultiplexAdmin} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-indigo-500 ti-bar-chart"></i> 
                                        </span><span class="title"> Analytics Dashboard
                                    </span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={addMovie} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={addMovie} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-red-500 ti-files"></i> 
                                        </span><span class="title">Movie Dashboard</span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={showBillingDetails} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={showBillingDetails} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-orange-500 ti-layout-list-thumb"></i> 
                                        </span><span class="title">Show Billing Details</span>
                                </a>
                            </li> : ''}

                            {localStorage.getItem('roleId')==3 ?
                            <li class="nav-item" value={listUsers} onClick={this.handleLinkClick.bind(this)} data-toggle="tooltip" data-placement="right" title="" data-original-title="Link">
                                <a class="sidebar-link" href="#" value={listUsers} onClick={this.handleLinkClick.bind(this)}>
                                    <span class="icon-holder">
                                        <i class="c-teal-500 ti-view-list-alt"></i> 
                                        </span><span class="title">Show Users List</span>
                                </a>
                            </li> : ''}

                            </ul>
                        </div>
                    </div>
                    <div class="page-container">
                        <div id = "admin-header" class="header navbar">
                            <div class="header-container">
                            <ul class="nav-left">
                            </ul>
                            <ul class="nav-right">
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
                                        <a href="/" onClick={ this.handleLogout } className="hide-logged-in">Sign Out</a>
                                    </a>
                                    <ul class="dropdown-menu fsz-sm">
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-settings mR-10"></i> <span>Setting</span></a></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-user mR-10"></i> <span>Profile</span></a></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-email mR-10"></i> <span>Messages</span></a></li>
                                        <li role="separator" class="divider"></li>
                                        <li><a href="" class="d-b td-n pY-5 bgcH-grey-100 c-grey-700"><i class="ti-power-off mR-10"></i> <span>Logout</span></a></li>
                                    </ul>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <main class="main-content bgc-grey-100">
                            <div id="mainContent">
                            {this.state.addMovie ? this.returnMovie() : ''}
                            {this.state.addDashboard ? this.returnDashboard() : ''}
                            {this.state.listUsers ? this.returnUserList() : ''}
                            {this.state.showBillingDetails ? this.returnBillingDetails(): ''}
                            </div>
                        </main>
                        <footer class="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
                            <span>Copyright © 2018 Designed by <a href="" target="_blank" title="NetflixAdmin">SAAS Admin</a>. All rights reserved.</span>

                        </footer>
                    </div>
                </div>
                <script type="text/javascript" src="./vendor.js"></script><script type="text/javascript" src="./bundle.js"></script>
                </body>
            )
    }

    returnDashboard() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <AdminGraphs />
                    </div>
                </div>
            </div>            
        </div>
        )
    }
    returnUserList() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">User Details Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <ListAllUsers />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    returnBillingDetails() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">All Billing Details</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                    <AllBillingDetails />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    returnMovie() {
        return (
            <div class="container-fluid">
            <h3 class="data-header">Movie Dashboard</h3>
            <br/>
            <div class="row">
                <div class="col-md-12">
                    <div class="admin-list bgc-white bd bdrs-3 p-20 mB-20">
                        <MovieForm />
                    </div>
                </div>
            </div>            
        </div>
        )
    }

    handleLogout() {
        //alert("In handleLogout");
        this.props.history.push('/');
        localStorage.clear();
        axios.post(envURL + 'logout', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                    localStorage.clear();
                    this.setState({
                        isLoggedIn: false
                    }, () => {
                        this.props.history.push('/login');
                    })
            })
    }
}

export default withRouter(AdminDashboard);