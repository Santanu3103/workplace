import { Button, Grid, Pagination } from "@mui/material";
import React from "react";
import authimg from "../../assets/authimg.png";
import googlebtn from "../../assets/google-btn.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import {auth, db} from '../../Firebase'
import { doc, getDoc } from "firebase/firestore";
function Auth({ type }) {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(userContext);

  const redirectUser = async(email) => {
    //call firestore userInfo collection and see if doc id=== user eamil exists or not
    const docref=doc(db,'userInfo',email)
    const userData=await getDoc(docref)
    let userInformation=null
    if(userData.exists()){
      userInformation=userData.data()
    }
    if (
      // user exists
      userInformation
    ) {
      if (
        // user exist as candidate but trying to login as employer or vice versa
        userInformation.userType===type
      ) {
        dispatch({
          type:'AddUSERINFO',
          payload:userInformation
        })
        // redirect to candidate profile
        navigate(`/${type}/profile`);
      
      
      }
      else{
        alert(`this ID exist as ${userInformation.userType} but you are tring to signIn as ${type}`)
      }
    }
     else {
      // user doesn't exist
      if (type === "candidate") {
        // redirect to candidate onboarding
        navigate("/candidate/onboarding");
      } else {
        // redirect to employer onboarding
        navigate("/employer/onboarding");
      }
    }
  };
  const singIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
       console.log(result,'result')
        const user = result.user;
        const { displayName, email, photoURL,uid } = user;

        dispatch({
          type: "LOGIN",
          payload: {
            displayName,
            email,
            photoURL,
            uid,
          }
        })
        redirectUser(email);

      })
      .catch((error) => {
        // Handle Errors here.
       console.log(error,'error')
      });
  };
  return (
    <Grid container>
      <Grid className="auth-btn-container" item xs={12} md={8}>
        <h1>welcome {type}</h1>
        <h3>please Sign IN</h3>
        <div onClick={singIn} className="auth-btn">
          <img src={googlebtn} alt="googlebtn" />
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div>
          <img width="100%" src={authimg} alt="authimg" />
        </div>
      </Grid>
    </Grid>
  );
}

export default Auth;
