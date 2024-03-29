//UserDetailsForm.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/login-netflix.css'
import '../assets/js/login-netflix.js'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert2'
import Facebook from './Facebook'
import Google from './Google'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAdmin:false,
            isLoggedIn: false,
            errorMsg: '',
            role:''
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value })
        console.log(this.state)
    }

    handleCheck = (e) => {
        this.setState({
            isAdmin: !this.state.isAdmin
        }, () => {
            console.log(this.state)
        });
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
                        console.log("Already Logged In. Redirecting to admin dashboard")
                        this.props.history.push('/adminDashboard');
                    }else{
                        console.log("Error checking session")
                    }
            },
            (error) => { 
                console.log(error)})
    }

    componentDidMount() {
            document.getElementsByClassName("kep-login-facebook small")[0].innerHTML = "Login with FB"
    }

    facebooklogin(response){
        this.setState({
            email:response.email,
            password:'facebook-signup',
            isAdmin:false
        }, () => {
            console.log(this.state)
            this.handleLogin("")
        });    }

    googlelogin(response){
        this.setState({
            email:response.email,
            password:'google-signup',
            isAdmin:false
        }, () => {
            console.log(this.state)
            this.handleLogin("")
        });    
    }

    handleLogin(e) {
        e ? e.preventDefault():'';

        //validation of email
        var patt = new RegExp('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]+');
        var res = patt.test(this.state.email);

        var url = envURL + 'login/'
        if(this.state.isAdmin == true){
            url = url+"admin"
        }else{
            url = url+"customer"
        }
        if(res && this.state.password.length > 0 ) {
            console.log("In Login");
            var user = {
                email: this.state.email,
                password: this.state.password
            };
            axios.post(url, user, { withCredentials: true})
                .then((response) => {
                    debugger
                    console.log("In Login Component handleLogin",response.data);
                        localStorage.setItem('userid', response.data.id );
                        localStorage.setItem('email', response.data.email );
                        localStorage.setItem('name', response.data.name ); 
                        localStorage.setItem('role', response.data.role.name ); 

                        this.setState({
                            email: response.data.email,
                            role: response.data.role.name,
                            isLoggedIn: true,
                        }, () => {
                            if(this.state.role === 'CUSTOMER') {
                                this.props.history.push('/');
                            } else if(this.state.role === 'ADMIN'){
                                this.props.history.push('/adminDashboard');
                            }else{
                                console.log("Invalid Role")
                            }

                        }) //redirect to userhome from here
                },
                (error) => { 
                    swal({
                        type: 'error',
                        title: 'SignUp',
                        text: error.response.data.errorMessage,
                    })
                    console.log(error)})
        } else {
            alert("Invalid Email or Password length is < 8");
            this.setState({
                errorMsg: 'Invalid Email or password'
            })
        }
    }

    renderRows() {

    }
    render() {
        return (
        <div>
            <div id="appMountPoint">
                <div className="login-wrapper hybrid-login-wrapper" data-reactroot="">
                    <div className="login-wrapper-background"><img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/69439350-cf76-4043-ad83-f8b86fbc8c92/84dd8020-962a-48ba-bb97-32f535210095/US-en-20181112-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/69439350-cf76-4043-ad83-f8b86fbc8c92/84dd8020-962a-48ba-bb97-32f535210095/US-en-20181112-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/69439350-cf76-4043-ad83-f8b86fbc8c92/84dd8020-962a-48ba-bb97-32f535210095/US-en-20181112-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/69439350-cf76-4043-ad83-f8b86fbc8c92/84dd8020-962a-48ba-bb97-32f535210095/US-en-20181112-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" /></div>
                    <div className="nfHeader login-header signupBasicHeader">
                        <a href="/" className="svg-nfLogo signupBasicHeader">
                            <svg viewBox="0 0 111 30" className="svg-icon svg-icon-netflix-logo" focusable="true">
                                <title></title>
                                <g id="netflix-logo">
                                    <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688zM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968z" id="Fill-14"></path>
                                </g>
                            </svg><span className="screen-reader-text">Netflix</span></a>
                    </div>
                    <div className="login-body">
                        <div>
                            <noscript>
                                <div className="ui-message-container ui-message-error">
                                    <div className="ui-message-icon"></div>
                                    <div className="ui-message-contents">Looks like you have disabled JavaScript. Please enable JavaScript to restore full page functionality.</div>
                                </div>
                            </noscript>
                            <div className="login-content login-form hybrid-login-form hybrid-login-form-signup">
                                <div className="hybrid-login-form-main">
                                    <h1>Sign In</h1>
                                    <form method="post" className="login-form" action="">
                                        <div className="nfInput nfEmailPhoneInput login-input login-input-email">
                                            <div className="nfInputPlacement">
                                                <div className="nfEmailPhoneControls">
                                                    <label className="input_id">
                                                        <input type="text" placeholder="Enter Email" name="email" className="nfTextField" id="id_userLoginId" style={{width:"145%"}} value={this.state.email} onChange={this.handleUserInput} tabindex="0" autoComplete="email" dir="" />
                                                        {/* <label for="id_userLoginId" className="placeLabel">Enter Email</label> */}
                                                    </label>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nfInput nfPasswordInput login-input login-input-password">
                                            <div className="nfInputPlacement">
                                                <div className="nfPasswordControls">
                                                    <label className="input_id">
                                                        <input type="password" placeholder="Password" style={{backgroundColor:'#333'}} name="password" className="nfTextField" id="id_password" value={this.state.password} onChange={this.handleUserInput} tabindex="0" autoComplete="password" dir="" />
                                                        {/* <label for="id_password" className="placeLabel">Password</label> */}
                                                    </label>
                                                    <button id="id_password_toggle" type="button" className="nfPasswordToggle" title="Show Password">SHOW</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hybrid-login-form-help">
                                            <div className="ui-binary-input login-remember-me">
                                                <input type="checkbox" className="" name="isAdmin" id="isAdmin" onChange={this.handleCheck.bind(this)} value={this.state.isAdmin} style={{zIndex:2}} />
                                                <label for="bxid_rememberMe_true"><span className="login-remember-me-label-text">Is Admin?</span></label>
                                                <div className="helper"></div>
                                        </div></div>

                                        <button className="btn login-button btn-submit btn-small" type="submit" autoComplete="off" onClick={this.handleLogin.bind(this)} tabindex="0">Sign In</button>
                                        <div className="hybrid-login-form-help">
                                            <div className="ui-binary-input login-remember-me">
                                                {/* <input type="checkbox" className="" name="rememberMe" id="bxid_rememberMe_true" value="true" tabindex="0" checked="" />
                                                <label for="bxid_rememberMe_true"><span className="login-remember-me-label-text">Remember me</span></label>
                                                <div className="helper"></div> */}

                                            </div>
</div>

                                        <input type="hidden" name="flow" value="websiteSignUp" />
                                        <input type="hidden" name="mode" value="login" />
                                        <input type="hidden" name="action" value="loginAction" />
                                        <input type="hidden" name="withFields" value="rememberMe,nextPage,userLoginId,password,countryCode,countryIsoCode" />
                                        <input type="hidden" name="authURL" value="1542680094463.5uqmyDMu64jhbjI1uS+xp0vcLQs=" />
                                        <input type="hidden" name="nextPage" value="" />
                                        <input type="hidden" name="showPassword" value="" />
                                        <input type="hidden" name="countryCode" value="+1" />
                                        <input type="hidden" name="countryIsoCode" value="US" />
                                    </form>
                                </div>
                                <div className="hybrid-login-form-other">
                                    <form method="post" className="login-form" action="">
                                        <div className="facebookForm regOption mt-5 ml-4">
                                            <div className="fb-minimal">
                                                <Facebook login={this.facebooklogin.bind(this)}/>
                                            </div>
                                             
                                        </div>
                                        <div className="facebookForm regOption mt-5 ml-4">
                                            <div className="fb-minimal">
                                                <Google login={this.googlelogin.bind(this)}/>
                                            </div> 
                                        </div>

                                    </form>
                                    <div className="login-signup-now">New to Netflix? <a className=" " target="_self" href="/signup">Sign up now</a>.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="site-footer-wrapper login-footer">
                        <div className="footer-divider"></div>
                        <div className="site-footer">
                            <p className="footer-top">Questions? Call <a className="footer-top-a" href="tel:1-866-579-7172">1-866-579-7172</a></p>
                            <ul className="footer-links structural">
                                <li className="footer-link-item" placeholder="footer_responsive_link_gift_card_terms_item"><a className="footer-link" href="/giftterms" placeholder="footer_responsive_link_gift_card_terms"><span id="">Gift Card Terms</span></a></li>
                                <li className="footer-link-item" placeholder="footer_responsive_link_terms_item"><a className="footer-link" href="https://help.netflix.com/legal/termsofuse" placeholder="footer_responsive_link_terms"><span id="">Terms of Use</span></a></li>
                                <li className="footer-link-item" placeholder="footer_responsive_link_privacy_item"><a className="footer-link" href="https://help.netflix.com/legal/privacy" placeholder="footer_responsive_link_privacy"><span id="">Privacy Statement</span></a></li>
                            </ul>
                            <div className="lang-selection-container" id="lang-switcher">
                                <div className="ui-select-wrapper">
                                    <label className="ui-label no-display"><span className="ui-label-text"></span></label>
                                    <div className="select-arrow medium prefix globe">
                                        <select className="ui-select medium" tabindex="0" placeholder="lang-switcher">
                                            <option selected="" value="/login" data-language="en" data-country="US">English</option>
                                            <option value="/us-es/login" data-language="es" data-country="US">Español</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(SignIn);
