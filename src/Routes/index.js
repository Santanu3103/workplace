import React, { useContext} from "react";
import {userContext} from "../context/userContext";
import { Routes,Route,Navigate,Outlet} from 'react-router-dom'
import LandingPage from '../Components/LandingPage'
import Auth from '../Components/Auth'
import CandidateOnboarding from '../Components/Candidate/Onboarding'
import CandidateProfile from '../Components/Candidate/Profile'
import CandidateJobs from '../Components/Candidate/Jobs'
import Applications from '../Components/Candidate/Applications'
import CandidateConversation from '../Components/Candidate/Conversation'
import Applicants from '../Components/Employee/Applicants'
import EmployeeOnboarding from '../Components/Employee/Onboarding'
import EmployeeProfile from '../Components/Employee/Profile'
import JobOffers from '../Components/Employee/Jobs'
import EmployeeConversation from '../Components/Employee/Conversation'


const CustomRoutes = () => {
  const [state,dipatch]=useContext(userContext)
  const CandidateProtectedRoute  = () => {
    const isAuth=state.isAuth
    if (isAuth) {
      return <Navigate to="/candidate/auth" />
    }
    else{
      return <Outlet/>
    }
  }

  const EmployeeProtectedRoute = () => {
    const isAuth=state.isAuth
  
    if (isAuth) {
      return <Navigate to="/employee/auth" />
    }
    else{
      return <Outlet/>
    }
  }
  return (
    <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route element ={<CandidateProtectedRoute />}>
      <Route path='/candidate/auth' element={<Auth type="Candidate"/>}/>
      <Route path='/candidate/onboarding' element={<CandidateOnboarding/>}/>
      <Route path='/candidate/profile' element={<CandidateProfile/>}/>
      <Route path='/candidate/jobs' element={<CandidateJobs/>}/>
      <Route path='/candidate/application' element={<Applications/>}/>
      <Route path='/candidate/conversation' element={<CandidateConversation/>}/>
    </Route>

    <Route element ={<EmployeeProtectedRoute/>}>
    <Route path='/employee/auth' element={<Auth type="Employee"/>}/>
    <Route path='/employee/onboarding' element={<EmployeeOnboarding/>}/>
    <Route path='/employee/profile' element={<EmployeeProfile/>}/>
    <Route path='/employee/jobs' element={<JobOffers/>}/>
    <Route path='/employee/applicants' element={<Applicants/>}/>
    <Route path='/employee/conversation' element={<EmployeeConversation/>}/>
    </Route>
  </Routes>
  )
}

export default CustomRoutes
