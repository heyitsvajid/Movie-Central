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
import { ClipLoader } from 'react-spinners';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email : '',
            fname: '',
            password: '',
            role : '' ,
            isLoggedIn: false,
            isAdmin: false
        };
        this.handleSignUp = this.handleSignUp.bind(this);
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

    facebookSignUp(response){
        this.setState({
            fname: response.name,
            email:response.email,
            password:'facebook-signup'
        }, () => {
            console.log(this.state)
            this.handleSignUp("")
        });
    }

    googleSignUp(response){
        this.setState({
            fname: response.name,
            email:response.email,
            password:'google-signup'
        }, () => {
            console.log(this.state)
            this.handleSignUp("")
        });
    }

    handleSignUp(e) {
        e? e.preventDefault():'';
        debugger
        //validation of email
        var patt = new RegExp('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z]+');
        var res = patt.test( this.state.email );

        var url = envURL + 'signup/'
        if(this.state.isAdmin == true){
            url = url+"admin"
        }else{
            url = url+"customer"
        }

        
        if( res && this.state.password.length >= 6 ) {

            this.setState({
                loading: true,
            }, () => {
            });

            var user = {
                    name : this.state.fname,
                    email: this.state.email,
                    password: this.state.password,
                };
                console.log("In Signup : ", this.state );
                axios.post(url, user, { withCredentials: true} )
                    .then((response) => {
                        this.setState({
                            loading: true,
                        }, () => {
                        });
            
                        console.log("SignUp response", response.data );
                            swal("Account Created Successfully. Check email and activate account", "", "success");
                            this.props.history.push('/login')
                    },
                    (error) => { 
                        this.setState({
                            loading: true,
                        }, () => {
                        });
            
                        swal({
                            type: 'error',
                            title: 'SignUp',
                            text: error.response.data.errorMessage,
                        })
                    })
            }else{
                swal({
                    type: 'error',
                    title: 'SignUp',
                    text: "Invalid username or password",
                })
            }
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
        document.getElementsByClassName("kep-login-facebook small")[0].innerHTML = "SignUp with FB"
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
                                    <h1>Sign Up</h1>
                                    <form method="post" className="login-form" action="">
                                        <div className="nfInput nfEmailPhoneInput login-input login-input-email">
                                            <div className="nfInputPlacement">
                                                <div className="nfEmailPhoneControls">
                                                    <label className="input_id">
                                                        <input placeholder="Name" style={{width: '145%'}} type="text" name="fname" className="nfTextField" id="id_userLoginId" value={this.state.fname} onChange={this.handleUserInput.bind(this)}  dir="" />
                                                        {/* <label for="id_userLoginId" className="placeLabel">Enter name</label> */}
                                                    </label>
                                                    <div className="ui-select-wrapper country-select">
                                                        <a href="#" className="ui-select-wrapper-link">
                                                            <div className="ui-select-current" placeholder="{&quot;current_selected_country&quot;:&quot;US&quot;}"><span className="country-select-flag nf-flag nf-flag-us"></span></div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nfInput nfEmailPhoneInput login-input login-input-email">
                                            <div className="nfInputPlacement">
                                                <div className="nfEmailPhoneControls">
                                                    <label className="input_id">
                                                        <input placeholder="Email" style={{width: '145%'}} type="text" name="email" className="nfTextField" id="id_userLoginId" value={this.state.email} onChange={this.handleUserInput.bind(this)}  tabindex="0" autoComplete="email" dir="" />
                                                        {/* <label for="id_userLoginId" className="placeLabel">Enter Email</label> */}
                                                    </label>
                                                    <div className="ui-select-wrapper country-select">
                                                        <a href="#" className="ui-select-wrapper-link">
                                                            <div className="ui-select-current" placeholder="{&quot;current_selected_country&quot;:&quot;US&quot;}"><span className="country-select-flag nf-flag nf-flag-us"></span></div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="nfInput nfPasswordInput login-input login-input-password">
                                            <div className="nfInputPlacement">
                                                <div className="nfPasswordControls">
                                                    <label className="input_id">
                                                        <input placeholder="Password" style={{backgroundColor:'#333'}} type="password" name="password" className="nfTextField" id="id_password" value={this.state.password} onChange={this.handleUserInput}  tabindex="0" autoComplete="password" dir="" />
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
                                        
                                        <button className="btn login-button btn-submit btn-small" type="submit" autoComplete="off" tabindex="0" onClick={this.handleSignUp.bind(this)}>Sign Up</button>
                                        <div className="hybrid-login-form-help"></div>
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

      <div className='sweet-loading ml-4'>
        <ClipLoader
          className={this.state.override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>

                                <div className="hybrid-login-form-other">
                                <form method="post" className="login-form" action="">
                                        <div className="facebookForm regOption mt-5 ml-4">
                                            <div className="fb-minimal">
                                                <Facebook signUp={this.facebookSignUp.bind(this)}/>
                                            </div>
                                             
                                        </div>
                                        <div className="facebookForm regOption mt-5 ml-4">
                                            <div className="fb-minimal">
                                                <Google text="SignUp With Google" signUp={this.googleSignUp.bind(this)} />
                                            </div> 
                                        </div>

                                    </form>
                                    <div className="login-signup-now">Have account? <a className=" " target="_self" href="/login">Login Now!</a>.</div>
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

export default withRouter(SignUp);
