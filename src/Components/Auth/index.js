import { signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import { auth, db ,app} from "../../FireBase";
import { useNavigate } from "react-router-dom";
import { doc,getDoc,} from "firebase/firestore";
import {userContext} from "../../context/userContext";
import NavBar from '../LandingPage/NavBar'
import { Button, Grid, Pagination } from "@mui/material";
import authimg from '../../imgs/authimg.png'
import googlebtn from '../../imgs/google-btn.png'
import React, { useContext} from "react";
import './auth.css'
function Auth({ type }) {
  const [state, dispatch] = useContext(userContext);
  console.log(state);
  const navigate = useNavigate();
  const signIn = () => {
    console.log("sign in");
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result, "result");
        const { user } = result;
        const { displayName, email, photoURL, uid } = user;
        dispatch({ 
          type: "LOGIN",
          payload: {
            type,
            displayName,
            email,
            photoURL,
            uid,
          },
        });
        
       
        let userData=null

  
          if (type === "candidate") {
            if (
              userData.userType==="candidate"
            ) {
              navigate("/candidate/onboarding");
            } else {
              console.log('error')
            }
          } else {
            if (
              userData.userType==="employer"
              // user is stored as employer
            ) {
              navigate("/employee/onboarding");
              // redirect to employer profile
            } else {
              console.log('error')
              // show error message
            }
          }
        

      })
      .catch((error) => console.log(error, "error"));
  };

  return (
    <>
     <NavBar/>
  <Grid container>
    <Grid className="auth-btn-container" item  md={12}>
    </Grid>
    <Grid className="auth-btn-container" item  md={8}>
      <h1>welcome {type}</h1>
      <h3>please Sign IN</h3>
      <div onClick={signIn} className="auth-btn">
        <img src={googlebtn} alt="googlebtn" />
      </div>
    </Grid>
    <Grid item  md={4}>
      <div>
        <img width="100%" src={authimg} alt="authimg" />
      </div>
    </Grid>
  </Grid>
    </>
   
  );
}
export default Auth
