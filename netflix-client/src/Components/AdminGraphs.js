import React, { Component } from 'react';
import axios from 'axios';
import { envURL, reactURL } from '../config/environment';
import {BarChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Line, AreaChart, LineChart} from 'recharts';
import '../assets/css/admingraphs.css';


class AdminGraphs extends Component {

    constructor() {
        super();
        this.state = {
            uniqueSubscriptionsCount:0,
            movieMostPlays:[],
            userMostPlays:[],
            moviePlays:[],
            monthlyPaidIncome:0,
            uniquePayPerViewCount:0,
            uniqueRegistrationCount:0,
            uniqueActiveUsers:0,

            movieRevenue: [],
            movieRevenuePerSelectedYear: [],
            cityRevenue: [],
            cityRevenuePerSelectedYear: [],
            monthRevenue: [],
            lastMonthMultiplexRevenue: [],
            userClickAnalytics: [],
            leastPagesVisited: [],
            movieList: [],
            movieReviewGraph: [],
            userSessionAnalytics:[],
            defaultGraph1State: "",
        }
        // this.getMovieRevenuePerYear = this.getMovieRevenuePerYear.bind(this);
        // this.populateSelectBoxForMovieRevenueYears = this.populateSelectBoxForMovieRevenueYears.bind(this);
        // this.handleYearChangeForMovie = this.handleYearChangeForMovie.bind(this);
        // this.handleYearChangeForCity = this.handleYearChangeForCity.bind(this);
        // this.getMultiplexSoldTicketsPerMonth = this.getMultiplexSoldTicketsPerMonth.bind(this);
        // this.filterCurrentMonth = this.filterCurrentMonth.bind(this);
        // this.getUserClickDetails = this.getUserClickDetails.bind(this);
        // this.loadMoviesRatings = this.loadMoviesRatings.bind(this)
    }

    componentWillMount() {
        this.handleUserMostPlays();
        this.handleSubscriptions();
        this.handleMovieMostPlays();
        this. handleSubscriptionsAmount();
        this.handleMoviePlays();

     }

    handleUserMostPlays() {
        axios.get(envURL + 'userMostPlays', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                var count = {};
                
                var e = document.getElementById("mostUserPlays");
                var value = e.options[e.selectedIndex].value;
                var dateGreater = new Date();
                dateGreater.setDate(dateGreater.getDate() - value);
                for (var i = 0; i < data.length; i++) { 
                    //text += cars[i] + "<br>";
                    if(data[i].timestamp >= dateGreater.getTime()){
                        if(data[i].user.name in count){
                            count[data[i].user.name] = count[data[i].user.name]+1
                        }else{
                            count[data[i].user.name] = 1
                        }
    
                    }                                     
                  }
                var graphData = [];
                Object.keys(count).forEach(e => 
                    {
                        console.log(`key=${e}  value=${count[e]}`)
                        graphData.push({"name" : e,"count" : count[e]})
                    }
                );
                this.setState({
                    userMostPlays: graphData
                })
            },error =>{
                console.log(error);
            })
    }

    handleSubscriptionsAmount(){
        var totalIncome= 0;
        var ppvIncome = 0;
        var sbcrIncome = 0;
        var paidIncome = 0;
        axios.get(envURL + 'payments', null, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            var data = response.data;

            var e = document.getElementById("financeReport");
            var value = e.options[e.selectedIndex].value;
            for (var i = 0; i < data.length; i++) { 
                if(new Date(data[i].startAt).getMonth() == (value-1)){
 
                    if(data[i].subscription.type=='SBCR'){
                            sbcrIncome = sbcrIncome + data[i].amount;
                        }else if(data[i].subscription.type=='PPVO'){
                            ppvIncome = ppvIncome + data[i].amount;
                        }else if(data[i].subscription.type=='PAID'){
                            paidIncome = paidIncome + data[i].amount;
                        }

                        totalIncome = totalIncome + data[i].amount;

                }                                     
              }
            this.setState({
                monthlySubscriptionIncome : sbcrIncome,
                monthlyPayPerViewIncome:ppvIncome,
                monthlyTotalIncome:totalIncome,
                monthlyPaidIncome:paidIncome
            })
        },error =>{
            console.log(error);
        })
    }

    handleSubscriptions() {
        axios.get(envURL + 'uniqueSubscriptionUsers', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                var count = 0;
                
                var e = document.getElementById("countReport");
                var value = e.options[e.selectedIndex].value;
                for (var i = 0; i < data.length; i++) { 
                    if(new Date(data[i].startAt).getMonth() == (value-1)){
                            count++;
                    }                                     
                  }
                this.setState({
                    uniqueSubscriptionsCount: count
                })
            },error =>{
                console.log(error);
            })

            axios.get(envURL + 'uniqueActiveUsers', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                var count = 0;
                
                var e = document.getElementById("countReport");
                var value = e.options[e.selectedIndex].value;
                for (var i = 0; i < data.length; i++) { 
                    if(new Date(data[i].timestamp).getMonth() == (value-1)){
                            count++;
                    }                                     
                  }
                this.setState({
                    uniqueActiveUsers: count
                })
            },error =>{
                console.log(error);
            })

            axios.get(envURL + 'uniquePayPerViewUsers', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                var count = 0;
                var e = document.getElementById("countReport");
                var value = e.options[e.selectedIndex].value;
                for (var i = 0; i < data.length; i++) { 
                    if(new Date(data[i].startAt).getMonth() == (value-1)){
                            count++;
                    }                                     
                  }
                this.setState({
                    uniquePayPerViewCount: count
                })
            },error =>{
                console.log(error);
            })

            axios.get(envURL + 'users/', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                var count = 0;                
                var e = document.getElementById("countReport");
                var value = e.options[e.selectedIndex].value;
                for (var i = 0; i < data.length; i++) { 
                    if(new Date(data[i].createdAt).getMonth() == (value-1)){
                            count++;
                    }                                     
                  }
                this.setState({
                    uniqueRegistrationCount: count
                })
            },error =>{
                console.log(error);
            })
    }

    handleMovieMostPlays() {
        axios.get(envURL + 'movieMostPlays', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                var count = {};
                
                var e = document.getElementById("movieMostPlays");
                var value = e.options[e.selectedIndex].value;
                var dateGreater = new Date();
                dateGreater.setDate(dateGreater.getDate() - value);
                for (var i = 0; i < data.length; i++) { 
                    if(data[i].timestamp > dateGreater.getTime()){
                        if(data[i].movie.title in count){
                            count[data[i].movie.title] = count[data[i].movie.title]+1
                        }else{
                            count[data[i].movie.title] = 1
                        }
    
                    }                                     
                  }
                var graphData = [];
                Object.keys(count).forEach(e => 
                    {
                        console.log(`key=${e}  value=${count[e]}`)
                        graphData.push({"name" : e,"count" : count[e]})
                    }
                );
                this.setState({
                    movieMostPlays: graphData
                })
            },error =>{
                console.log(error);
            })
    }


    handleMoviePlays() {
        
        axios.get(envURL + 'views', null, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                var data = response.data;
                var count = {};
                
                var e = document.getElementById("moviePlays");
                var value = e.options[e.selectedIndex].value;
                var dateGreater = new Date();
                dateGreater.setDate(dateGreater.getDate() - value);
                for (var i = 0; i < data.length; i++) { 
                    if(data[i].timestamp > dateGreater.getTime()){
                        if(data[i].movie.title in count){
                            count[data[i].movie.title] = count[data[i].movie.title]+1
                        }else{
                            count[data[i].movie.title] = 1
                        }
    
                    }                                     
                  }
                var graphData = [];
                Object.keys(count).forEach(e => 
                    {
                        console.log(`key=${e}  value=${count[e]}`)
                        graphData.push({"name" : e,"count" : count[e]})
                    }
                );
                this.setState({
                    moviePlays: graphData
                })
            },error =>{
                console.log(error);
            })
    }
    
    loadMoviesRatings() {
        var finalArrayToShowInGraph = [];
        let findAllMovieAPI = envURL + 'findAllMovie';
        axios.get(findAllMovieAPI)
            .then(res => {
                if (res.data.successMsg != '') {
                    console.log('Fetching all movies');
                    console.log(res.data.data);
                    var resultArray = res.data.data;
                    for(var i = 0; i < resultArray.length; i++) {
                        if( resultArray[i].review_ratings.length > 0 ) {
                            var ratingsArray = resultArray[i].review_ratings;
                            var tempRating = 0;
                            for( var k = 0; k < ratingsArray.length; k++ ) {
                                tempRating += ratingsArray[k].rating;
                            }
                            var averageRating = tempRating/ratingsArray.length;
                            var finalObject = {
                                averageRating: Number(averageRating.toFixed(2)),
                                movie_name: resultArray[i].title
                            }
                            finalArrayToShowInGraph.push(finalObject);
                        }
                    }

                    console.log("FinalArray in movie ratings", finalArrayToShowInGraph);
                    this.setState({
                        movieList: res.data.data ? res.data.data : [],
                        movieReviewGraph: finalArrayToShowInGraph
                    })
                } else {
                    console.error('Error Fetching all movie');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }




    render() {
        var data = [];  
        this.state.userClickAnalytics.forEach(element => {
            data.push(element);
        });

        var data1 = [];
        this.state.movieReviewGraph.forEach(element => {
            if (element.movie_name == "BLUMHOUSE'S TRUTH OR DARE"){
                element.movie_name = "TRUTH OR DARE"
            }
            data1.push(element);
        })
        return (
            <div>
                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Top 10 User Most Plays</h3>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">Time Period</label>
                            </div>
                            <div className="form-group col-md-2">
                                <select id="mostUserPlays" onChange={ this.handleUserMostPlays.bind(this) }>
                                <option value='1'>Last 24 Hours</option>
                                <option value='7'>Last Week</option>
                                <option value='30'>Last Month</option>

                                </select>
                            </div>
                        </div>

                 
                       <br/>                            
                        <BarChart width={1250} height={350} data={this.state.userMostPlays}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>

                            <defs>
                            <linearGradient id="colorUv5" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#4DD0E1" stopOpacity={0.9}/>
                                    <stop offset="70%" stopColor="#4DD0E1" stopOpacity={0.5}/>
                                </linearGradient>


                            </defs>

                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="count" fill="url(#colorUv1)" fillOpacity={0.7} />
                    </BarChart>
                    </div>
                </div>



                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Top 10 Movie Most Plays</h3>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">Time Period</label>
                            </div>
                            <div className="form-group col-md-2">
                                <select id="movieMostPlays" onChange={ this.handleMovieMostPlays.bind(this) }>
                                <option value='1'>Last 24 Hours</option>
                                <option value='7'>Last Week</option>
                                <option value='30'>Last Month</option>

                                </select>
                            </div>
                        </div>

                 
                       <br/>                            
                        <BarChart width={1250} height={350} data={this.state.movieMostPlays}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>

                            <defs>
                                <linearGradient id="colorUv6" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#4FC3F7" stopOpacity={0.9}/>
                                    <stop offset="70%" stopColor="#4FC3F7" stopOpacity={0.5}/>
                                </linearGradient>

                            </defs>

                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="count" fill="url(#colorUv2)" fillOpacity={0.7} />
                    </BarChart>
                    </div>
                </div>



                                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Movie Plays</h3>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">Time Period</label>
                            </div>
                            <div className="form-group col-md-2">
                                <select id="moviePlays" onChange={ this.handleMoviePlays.bind(this) }>
                                <option value='1'>Last 24 Hours</option>
                                <option value='7'>Last Week</option>
                                <option value='30'>Last Month</option>

                                </select>
                            </div>
                        </div>

                 
                       <br/>                            
                        <BarChart width={1250} height={350} data={this.state.moviePlays}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>

                            <defs>
                                <linearGradient id="colorUv6" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#4FC3F7" stopOpacity={0.9}/>
                                    <stop offset="70%" stopColor="#4FC3F7" stopOpacity={0.5}/>
                                </linearGradient>

                            </defs>

                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="count" fill="url(#colorUv3)" fillOpacity={0.7} />
                    </BarChart>
                    </div>
                </div>


             <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Count Report</h3>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">Time Period</label>
                            </div>
                            <div className="form-group col-md-2">
                                <select id="countReport" onChange={ this.handleSubscriptions.bind(this) }>
                                <option value='1'>January {new Date().getYear() + 1900}</option>
                                <option value='2'>February {new Date().getYear() + 1900}</option>
                                <option value='3'>March {new Date().getYear() + 1900}</option>
                                <option value='4'>April {new Date().getYear() + 1900}</option>
                                <option value='5'>May {new Date().getYear() + 1900}</option>
                                <option value='6'>June {new Date().getYear() + 1900}</option>
                                <option value='7'>July {new Date().getYear() + 1900}</option>
                                <option value='8'>August {new Date().getYear() + 1900}</option>
                                <option value='9'>September {new Date().getYear() + 1900}</option>
                                <option value='10'>October {new Date().getYear() + 1900}</option>
                                <option value='11'>November {new Date().getYear() + 1900}</option>
                                <option value='12'>December {new Date().getYear() + 1900}</option>
                                </select>
                            </div>
                        </div>       

                        <br/>
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h4 class="c-grey-900 mB-20">Unique Subscriptions Count</h4>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">{this.state.uniqueSubscriptionsCount}</label>
                            </div>
                            <div className="form-group col-md-2">

                            </div>
                        </div>       
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h4 class="c-grey-900 mB-20">Unique Pay-Per-View Count</h4>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">{this.state.uniquePayPerViewCount}</label>
                            </div>
                            <div className="form-group col-md-2">

                            </div>
                        </div>       
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h4 class="c-grey-900 mB-20">Unique Active Users Count</h4>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">{this.state.uniqueActiveUsers}</label>
                            </div>
                            <div className="form-group col-md-2">

                            </div>
                        </div>       
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h4 class="c-grey-900 mB-20">Users Registration Count</h4>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">{this.state.uniqueRegistrationCount}</label>
                            </div>
                            <div className="form-group col-md-2">

                            </div>
                        </div>       



                    </div>
                </div>





                         <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Finance Report</h3>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">Time Period</label>
                            </div>
                            <div className="form-group col-md-2">
                                <select id="financeReport" onChange={ this.handleSubscriptionsAmount.bind(this) }>
                                <option value='1'>January {new Date().getYear() + 1900}</option>
                                <option value='2'>February {new Date().getYear() + 1900}</option>
                                <option value='3'>March {new Date().getYear() + 1900}</option>
                                <option value='4'>April {new Date().getYear() + 1900}</option>
                                <option value='5'>May {new Date().getYear() + 1900}</option>
                                <option value='6'>June {new Date().getYear() + 1900}</option>
                                <option value='7'>July {new Date().getYear() + 1900}</option>
                                <option value='8'>August {new Date().getYear() + 1900}</option>
                                <option value='9'>September {new Date().getYear() + 1900}</option>
                                <option value='10'>October {new Date().getYear() + 1900}</option>
                                <option value='11'>November {new Date().getYear() + 1900}</option>
                                <option value='12'>December {new Date().getYear() + 1900}</option>
                                </select>
                            </div>
                        </div>       

                        <br/>
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h4 class="c-grey-900 mB-20">Subscription Income</h4>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">{this.state.monthlySubscriptionIncome}</label>
                            </div>
                            <div className="form-group col-md-2">

                            </div>
                        </div>       
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h4 class="c-grey-900 mB-20">Pay Per View Income</h4>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">{this.state.monthlyPayPerViewIncome}</label>
                            </div>
                            <div className="form-group col-md-2">

                            </div>
                        </div>       
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h4 class="c-grey-900 mB-20">Paid Income</h4>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">{this.state.monthlyPaidIncome}</label>
                            </div>
                            <div className="form-group col-md-2">

                            </div>
                        </div>       

                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h4 class="c-grey-900 mB-20">Total Income</h4>
                            </div>
                            <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">{this.state.monthlyTotalIncome}</label>
                            </div>
                            <div className="form-group col-md-2">

                            </div>
                        </div>       


                    </div>
                </div>























 <div>


                <div class="row">
                    
                </div>
                <hr/>

                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-6">
                                <h3 class="c-grey-900 mB-20">Multiplex Revenue of Month($)</h3>
                            </div>
                            <div className="form-group col-md-2 ">
                                {/* <label class="dashboard-label center-head">Trailer Link</label> */}
                            </div>
                            <div className="form-group col-md-2">
                                {/* <select id="mySelectMovie" onChange={ this.handleYearChangeForMovie }>
                                </select> */}
                            </div>
                        </div>
                        
                        <br/>                            
                        <BarChart width={1250} height={350} data={this.state.lastMonthMultiplexRevenue}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="multiplex_name"/>
                            <YAxis/>

                            <defs>
                                <linearGradient id="colorUv4" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#7986CB" stopOpacity={0.9}/>
                                    <stop offset="70%" stopColor="#7986CB" stopOpacity={0.6}/>
                                </linearGradient>

                            </defs>

                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="total_revenue" fill="url(#colorUv4)" fillOpacity={0.7} />
                        </BarChart>
                    </div>
                </div>
                <hr/>

                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Clicks Per Page</h3>
                            </div>
                            {/* <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">Trailer Link</label>
                            </div> */}
                            <div className="form-group col-md-2">
                                {/* <select id="mySelectMovie" onChange={ this.handleYearChangeForMovie }>
                                </select> */}
                            </div>
                        </div>
                        
                        <br/>
                        <ComposedChart width={1250} height={350} data={data.reverse()}>
                            <XAxis dataKey="pageName" />
                            <YAxis />

                            <defs>
                                <linearGradient id="colorUv3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#81C784" stopOpacity={1}/>
                                    <stop offset="70%" stopColor="#81C784" stopOpacity={0.5}/>
                                </linearGradient>

                            </defs>

                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area type="monotone" dataKey="count" fill="url(#colorUv3)" stroke="#8884d8" />
                    
                        </ComposedChart>

                    </div>
                </div>
                <hr/>

                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                <h3 class="c-grey-900 mB-20">Least Clicked Pages</h3>
                            </div>
                            {/* <div className="form-group col-md-2 ">
                                <label class="dashboard-label center-head">Trailer Link</label>
                            </div> */}
                            <div className="form-group col-md-2">
                                {/* <select id="mySelectMovie" onChange={ this.handleYearChangeForMovie }>
                                </select> */}
                            </div>
                        </div>
                        <br/>             
                        <RadarChart cx={650} cy={250} outerRadius={150} width={1250} height={400} data={this.state.leastPagesVisited}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="pageName" />
                            <defs>
                                <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#FF5252" stopOpacity={0.8}/>
                                    <stop offset="70%" stopColor="#FF5252" stopOpacity={0.3}/>
                                </linearGradient>

                            </defs>
                            <PolarRadiusAxis angle={90}/>
                        
                            <Radar name="Count" dataKey="count" stroke="#D50000" fill="#FF5252" fillOpacity={0.7}/>
                            <Legend />
                            
                        </RadarChart>          
                        
                        {/* <ComposedChart width={1300} height={250} data={this.state.userClickAnalytics}>
                            <XAxis dataKey="pageName" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area type="monotone" dataKey="count" fill="#8884d8" stroke="#8884d8" />
                        </ComposedChart> */}
                    </div>
                </div>
                <hr/>

                <div class="row">
                    <div className="form-group col-md-12">
                        <div class="row">
                            <div className="form-group col-md-4 ">
                                {/* <h3 class="c-grey-900 mB-20">Movie Clicks</h3> */}
                            </div>
                            <div className="form-group col-md-2 ">
                                {/* <label class="dashboard-label center-head"></label> */}
                            </div>
                            <div className="form-group col-md-2">
                                {/* <select id="mySelectMovie" onChange={ this.handleYearChangeForMovie }>
                                </select> */}
                            </div>
                        </div>
                        <br/>        
                        <BarChart width={1250} height={350} data={this.state.movieClickAnalytics}
                          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <defs>
                                <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#5C6BC0" stopOpacity={0.8}/>
                                    <stop offset="70%" stopColor="#5C6BC0" stopOpacity={0.5}/>
                                </linearGradient>

                            </defs>
                            <XAxis dataKey="movieName"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="count"  fillOpacity={0.7} fill="url(#colorUv1)" />
                        </BarChart>
                    </div>
                </div>
                <hr/>

                <hr/>

</div> 



                
            </div>

        );
    }
}

export default AdminGraphs;