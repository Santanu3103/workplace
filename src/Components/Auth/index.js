import { signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import { auth, db ,app} from "../../FireBase";
import { useNavigate } from "react-router-dom";
import { doc,getDoc,} from "firebase/firestore";
import {userContext} from "../../context/userContext";
import NavBar from '../LandingPage/NavBar'
import {Grid} from "@mui/material";
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
        console.log(user)
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
        })
        if (type === "Candidate") {
          navigate("/candidate/onboarding");
        }      
        else if(type === "Employee") {
        navigate("/employee/onboarding");
        }
      })
        .catch((error) => console.log(error, "error"));
    }
  return (
    <>    
  <Grid container>
    <Grid className="auth-btn-container" item xs={12}>
    <NavBar/>
    </Grid>
    <Grid className="auth-btn-container" item  xs={8}>
      <h1>Welcome {type}</h1>
      <h3>please Sign IN</h3>
      <div onClick={signIn} className="auth-btn">
        <img src={googlebtn} alt="googlebtn" />
      </div>
    </Grid>
    <Grid item  xs={4}>

    </Grid>
  </Grid>
    </>
   
  );
}
export default Auth
