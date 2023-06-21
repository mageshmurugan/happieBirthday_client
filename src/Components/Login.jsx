import React,{ useRef, useState ,lazy, Suspense} from 'react'
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Cookies from 'js-cookie'

function Login({user,setUser}) {
  const [showOTP, setShowOTP] = useState(false);
  const ph=useRef();
  const otp=useRef();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    console.log(ph.current.value)
    const formatPh = "+91" + ph.current.value;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        console.log("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

 
  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp.current.value)
      .then(async (res) => {
        const loggedInResponse = await fetch("https://happiebirthday.onrender.com/firebase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(res),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn)
    const jwtToken=loggedIn.jwtAccess
    const mobile=loggedIn.mobile
    Cookies.set('jwt', jwtToken, { expires: 20 })
    Cookies.set('mob', mobile, { expires: 20 })
    setUser([jwtToken,mobile]);

      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <section >
      <div>
      <div id="recaptcha-container"></div>
        
          <div >
            
            {showOTP ? (
              <div className='phone-input'>
               
                
                <input 
                  className='ph-input'
                  placeholder='Enter Otp'
                  ref={otp}
                  type="text"
                  name="otp"
                  defaultValue=''
                />
                <button
                className='phone-button'
                  onClick={onOTPVerify}
                >
                  
                  Verify OTP
                </button>
              </div>
            ) : (
              <section className='phone-input'>
                
                <input type="text" ref={ph} placeholder='PhoneNumber'  className='ph-input'  name="mobile"/>

                <button
                  onClick={onSignup}
                  className='phone-button'
                >
                  
                  Send Otp
                </button>
              </section>
            )}
          </div>
        
      </div>
    </section>
  )
}

export default Login
