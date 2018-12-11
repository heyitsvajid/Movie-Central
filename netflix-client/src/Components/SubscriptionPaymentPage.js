
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'
import Footer from './Footer'
import { envURL, reactURL } from '../config/environment';
import swal from 'sweetalert2'
import '../assets/css/payment.css'

class SubscriptionPaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state={
    amount:localStorage.getItem('amount'),
    cardNumber:'',
    expMonth:'',
    expYear:'',
    userId:'',
    movieId:'',
    subscriptionType:'',
    endDate:'',
    subs: false,
    months: 1
    }
  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
}

    componentWillMount(){
    if(localStorage.getItem("subs") == "true"){
        this.setState({subs: true});
        localStorage.removeItem("subs")
    }
    else if(localStorage.getItem("subs") == "false"){
        localStorage.removeItem("subs")
    }
    else{
        window.location.href = reactURL;
    }
    axios.get(envURL + 'isLoggedIn', {withCredentials: true})
        .then((response) => {
            console.log("After checking the session", response.data);
                if(response.data.role.name === 'CUSTOMER'){
                    console.log("Already Logged In")
                }
                else{
                console.log("Error : User is not CUSTOMER")                   
                }
        },
        (error) => { 
            swal({
                type: 'error',
                title: 'Login to Continue',
                text: "error.response.data.errorMessage",
            })
            this.props.history.push('/login');
            console.log(error)})
}
    
    handleSubmit(e) {
        e.preventDefault();

        var type = localStorage.getItem("movieType") ? localStorage.getItem("movieType") : ''
        var amount = localStorage.getItem("amount"); 
        var endDate = new Date(); // Now
        debugger
       if(type == 'SBCR'){
            amount = this.state.amount;
            var d = new Date();
            var m = this.state.months;
            var years = Math.floor(m / 12);
            var months = m - (years * 12);
            if (years) d.setFullYear(d.getFullYear() + years);
            if (months) d.setMonth(d.getMonth() + months);
            d.setHours(0,0,0,0);
            endDate = d.setHours(0,0,0,0); // Set now + 30 days as the new date
        } else if(type == 'PPVO'){
            amount = localStorage.getItem("amount");
            endDate = endDate.setDate(endDate.getDate() + 1); // Set now + 1 days as the new date

        }else if(type = 'PAID'){
            amount = localStorage.getItem("amount");
            endDate = endDate.setDate(endDate.getDate() + 1); // Set now + 1 days as the new date
        }
        var payment = {
            amount:amount,
            cardNumber:this.state.cardNumber,
            expMonth:this.state.expMonth,
            expYear:this.state.expYear,
            userId:localStorage.getItem("userid"),
            movieId:localStorage.getItem("movieid"),
            subscriptionType: type,
            endDate:endDate,
        }

        axios.post(envURL + 'payment',payment,{ headers: { 'Content-Type': 'application/json'}})
            .then((res) => {
                        console.log(res.data);
                        swal({
                        type: 'success',
                        title: 'Payment',
                        text: 'Payment Done Successfully',
                    })                                  
            this.props.history.push('/login');
            },(error) => {
                swal({
                    type: 'error',
                    title: 'Payment',
                    text: error.response.data.errorMessage,
                })
                console.log('Error in Payment.');
            })    
        
        this.setState({
            amount:'',
            cardNumber:'',
            expMonth:'',
            expYear:'',
            userId:'',
            movieId:'',
            subscriptionType:'',
            endDate:'',
        });
        var that = this;
        setTimeout(function () {
            that.loadMovies()
        }, 2000);    
}

    handleMonthsChange(e){
        this.setState({months: e.target.value, amount: e.target.value*10});
    }

  render() {
    var monthsDiv = null;
    if(this.state.subs){
        monthsDiv = <label class="input_id" placeholder="Number of Months"><input placeholder="Subscription Months"  min="1" step="1" onkeypress={ () => {return false}}  style = {{width:'450px'}} value={this.state.months} onChange={this.handleMonthsChange.bind(this)} type="number" name="monthschange" class="nfTextField hasText" id="id_lastName" tabindex="0" dir="ltr"/></label>;
    }
    return (
    <div>
      <div id="appMountPoint">
        <div class="basicLayout modernInApp memberSimplicity-editcreditOptionMode simplicity" lang="en-US" dir="ltr" data-reactroot="">
            <div class="nfHeader noBorderHeader signupBasicHeader">
                <a href="/" class="svg-nfLogo signupBasicHeader">
                    <svg viewBox="0 0 111 30" class="svg-icon svg-icon-netflix-logo" focusable="true">
                        <title></title>
                        <g id="netflix-logo">
                            <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688zM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968z" id="Fill-14"></path>
                        </g>
                    </svg><span class="screen-reader-text">Netflix</span></a><a href="/" class="authLinks signupBasicHeader isMemberSimplicity">Back to Home</a></div>
            <div class="simpleContainer slimWidth">
                <div class="centerContainer firstLoad">
                    <form method="POST">
                        <div class="paymentFormContainer">
                            <div>
                                <div class="stepHeader-container">
                                    <div class="stepHeader">
                                        <h1 class="stepTitle">Update your credit or debit card.</h1></div>
                                </div>
                                <div class="contextContainer">
                                    {/* <div class="changePaymentContainer"><a href="/simplemember/accountpayment" class="changePaymentLink pointer"><i class="icon-thin-caret-back"></i><span class="changePaymentText">Switch payment method</span></a></div> */}
                                </div>
                            </div>
                            <div class="fieldContainer"><span class="logos logos-block"><span class="logoIcon VISA"></span><span class="logoIcon MASTERCARD"></span><span class="logoIcon AMEX"></span><span class="logoIcon DISCOVER"></span></span>
                                <div class="">
                                    <ul class="simpleForm structural ui-grid">
                                    <div class="btn-group">
                                      <button style={{width: '450px', color: 'black'}} type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Card Type
                                      </button>
                                      <div class="dropdown-menu dropdown-menu-right" style={{backgroundColor:'white', color:'black', width: '450px'}}>
                                        <button class="dropdown-item" type="button">Credit Card</button>
                                        <button class="dropdown-item" type="button">Debit Card</button>
                                      </div>
                                    </div>
                                        
                                        <li data-testid="field-lastName" class="nfFormSpace">
                                            <div class="nfInput validated nfInputOversize">
                                                <div class="nfInputPlacement">
                                                    <label class="input_id" placeholder="Amount">
                                                        <input placeholder="Amount"  style = {{width:'450px'}} value={this.state.amount} onChange={this.handleUserInput} type="number" name="amount" class="nfTextField hasText" id="id_lastName" tabindex="0" dir="ltr" disabled/>
                                                        {/* <label for="id_lastName" class="placeLabel">Last Name</label> */}
                                                    </label>
                                                </div>
                                            </div>
                                        </li>

                                        <li data-testid="field-lastName" class="nfFormSpace">
                                            <div class="nfInput validated nfInputOversize">
                                                <div class="nfInputPlacement">
                                                    {monthsDiv}
                                                </div>
                                            </div>
                                        </li>

                                     <li data-testid="field-lastName" class="nfFormSpace">
                                            <div class="nfInput validated nfInputOversize">
                                                <div class="nfInputPlacement">
                                                    <label class="input_id" placeholder="lastName">
                                                        <input  style = {{width:'450px'}} placeholder="Last Name" type="text" name="lastName" class="nfTextField hasText" id="id_lastName" value="Manasawala" tabindex="0" dir="ltr" />
                                                        {/* <label for="id_lastName" class="placeLabel">Last Name</label> */}
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li data-testid="field-firstName" class="nfFormSpace">
                                            <div class="nfInput validated nfInputOversize">
                                                <div class="nfInputPlacement">
                                                    <label class="input_id" placeholder="firstName">
                                                        <input style = {{width:'450px'}} type="text" placeholder="First Name" name="firstName" class="nfTextField hasText" id="id_firstName" value="Murtaza" tabindex="0" dir="ltr" />
                                                        {/* <label for="id_firstName" class="placeLabel">First Name</label> */}
                                                    </label>
                                                </div>
                                            </div>
                                        </li>
                                        <li data-testid="field-creditZipcode" class="nfFormSpace">
                                            <div class="nfInput validated nfInputOversize">
                                                <div class="nfInputPlacement">
                                                    <label class="input_id" placeholder="creditZipcode">
                                                        <input style = {{width:'450px'}} placeholder="Zip Code" type="tel" name="creditZipcode" class="nfTextField hasText" id="id_creditZipcode" value="95110" tabindex="0" minLength="5" dir="ltr" />
                                                        {/* <label for="id_creditZipcode" class="placeLabel">Billing Zip Code</label> */}
                                                    </label>
                                                </div>
                                            </div>
                                        </li> 
                                        <li data-testid="field-creditCardNumber" class="nfFormSpace">
                                            <div class="cardNumberContainer">
                                                <div class="nfInput validated nfInputOversize">
                                                    <div class="nfInputPlacement">
                                                        <label class="input_id" placeholder="creditCardNumber">
                                                            <input style = {{width:'450px'}} type="tel" placeholder="Card Number"  value={this.state.cardNumber} onChange={this.handleUserInput} type="number" name="cardNumber" class="nfTextField hasText" id="id_creditCardNumber"  tabindex="0" maxLength="19" minLength="12" dir="ltr" />
                                                            {/* <label for="id_creditCardNumber" class="placeLabel">Card Number</label> */}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li data-testid="field-creditExpirationMonth" class="nfFormSpace">
                                            <div class="nfInput validated nfInputOversize">
                                                <div class="nfInputPlacement">
                                                    <label class="input_id" placeholder="creditExpirationMonth">
                                                        <input style = {{width:'450px'}} placeholder="Expiration Date (MM)" type="tel" name="expMonth" value={this.state.expMonth} onChange={this.handleUserInput} class="nfTextField hasText" id="id_creditExpirationMonth" tabindex="0" dir="ltr" />
                                                        {/* <label for="id_creditExpirationMonth" class="placeLabel">Expiration Date (MM/YY)</label> */}
                                                    </label>
                                                </div>
                                            </div>
                                        </li>

                                        <li data-testid="field-creditExpirationMonth" class="nfFormSpace">
                                            <div class="nfInput validated nfInputOversize">
                                                <div class="nfInputPlacement">
                                                    <label class="input_id" placeholder="creditExpirationMonth">
                                                        <input style = {{width:'450px'}} placeholder="Expiration Year (YYYY)" type="tel" name="expYear" value={this.state.expYear} onChange={this.handleUserInput} class="nfTextField hasText" id="id_creditExpirationMonth" tabindex="0" dir="ltr" />
                                                        {/* <label for="id_creditExpirationMonth" class="placeLabel">Expiration Date (MM/YY)</label> */}
                                                    </label>
                                                </div>
                                            </div>
                                        </li>

                                        <li data-testid="field-creditExpirationYear" class="nfFormSpace"></li>
                                        <li data-testid="field-creditCardSecurityCode" class="nfFormSpace">
                                            <div class="nfInput nfInputOversize tooltip">
                                                <div class="nfInputPlacement">
                                                    {/* <label class="input_id" placeholder="creditCardSecurityCode">
                                                        <input style = {{width:'450px'}} placeholder="Security Code (CVV)" type="tel" name="cvv" value={this.state.cvv} onChange={this.handleUserInput} class="nfTextField" id="id_creditCardSecurityCode"  tabindex="0" maxLength="4" minLength="3" dir="" />
                                                    </label> */}
                                                </div>
                                                <div class="tooltipWrapper"><span class="nf-svg-icon "><svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g><circle stroke="#A9A6A6" stroke-width="2" cx="18" cy="18" r="17"></circle><path d="M17.051 21.094v-.54c0-.648.123-1.203.369-1.665.246-.462.741-.915 1.485-1.359a7.37 7.37 0 0 0 .981-.657c.222-.186.372-.366.45-.54.078-.174.117-.369.117-.585 0-.384-.177-.714-.531-.99-.354-.276-.831-.414-1.431-.414-.624 0-1.131.135-1.521.405-.39.27-.627.627-.711 1.071h-2.304a4.053 4.053 0 0 1 .738-1.845c.396-.546.924-.981 1.584-1.305.66-.324 1.44-.486 2.34-.486.852 0 1.596.153 2.232.459.636.306 1.134.726 1.494 1.26.36.534.54 1.143.54 1.827 0 .66-.177 1.227-.531 1.701-.354.474-.891.933-1.611 1.377-.42.252-.729.48-.927.684-.198.204-.33.399-.396.585a1.79 1.79 0 0 0-.099.603v.414h-2.268zm1.26 4.158c-.408 0-.762-.15-1.062-.45-.3-.3-.45-.654-.45-1.062 0-.408.15-.762.45-1.062.3-.3.654-.45 1.062-.45.408 0 .762.15 1.062.45.3.3.45.654.45 1.062 0 .408-.15.762-.45 1.062-.3.3-.654.45-1.062.45z" fill="#A9A6A6"></path></g></g></svg></span></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="submitBtnContainer">

                            <button id="simplicityPayment-SAVE" type="submit" autoComplete="off" onClick={this.handleSubmit.bind(this)} class="nf-btn nf-btn-primary nf-btn-solid nf-btn-oversize">Pay</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="site-footer-wrapper centered">
                <div class="footer-divider"></div>
                <div class="site-footer">
                    <p class="footer-top">Questions? Call <a class="footer-top-a" href="tel:1-866-579-7172">1-866-579-7172</a></p>
                    <ul class="footer-links structural">
                        <li class="footer-link-item" placeholder="footer_responsive_link_faq_item"><a class="footer-link" href="https://help.netflix.com/support/412" placeholder="footer_responsive_link_faq"><span id="">FAQ</span></a></li>
                        <li class="footer-link-item" placeholder="footer_responsive_link_help_item"><a class="footer-link" href="https://help.netflix.com" placeholder="footer_responsive_link_help"><span id="">Help Center</span></a></li>
                        <li class="footer-link-item" placeholder="footer_responsive_link_terms_item"><a class="footer-link" href="https://help.netflix.com/legal/termsofuse" placeholder="footer_responsive_link_terms"><span id="">Terms of Use</span></a></li>
                        <li class="footer-link-item" placeholder="footer_responsive_link_privacy_separate_link_item"><a class="footer-link" href="https://help.netflix.com/legal/privacy" placeholder="footer_responsive_link_privacy_separate_link"><span id="">Privacy</span></a></li>
                        <li class="footer-link-item" placeholder="footer_responsive_link_cookies_separate_link_item"><a class="footer-link" href="https://help.netflix.com/legal/privacy#cookies" placeholder="footer_responsive_link_cookies_separate_link"><span id="">Cookie Preferences</span></a></li>
                        <li class="footer-link-item" placeholder="footer_responsive_link_corporate_information_item"><a class="footer-link" href="https://help.netflix.com/en/node/2101" placeholder="footer_responsive_link_corporate_information"><span id="">Corporate Information</span></a></li>
                    </ul>
                </div>
            </div>
            <div id="tmcontainer" class="tmint">
                <p class="tmint" style={{background:'url(https://secured.netflix.com/fp/clear.png?org_id=lg9m47ph&amp;session_id=7d26f5ed-3f01-4d32-a4aa-4585f7090867&amp;m=1)"></p><img class="tmint" src="https://secured.netflix.com/fp/clear.png?org_id=lg9m47ph&amp;session_id=7d26f5ed-3f01-4d32-a4aa-4585f7090867&amp;m=2}'}} />
                <div id="tmswf" class="tmint"></div>
            </div>
            
        </div>
      </div>
      
      
    </div>
    )
  }
}



export default SubscriptionPaymentPage;
              