import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterOptions from './components/Registeroptions/options.js';
import User_Register from './components/Homepage/User_Register.js';
import Parkin_Register from './components/Homepage/Parking_Register.js';
import SignIn from './components/Loginpage/SignIn.js';
import Home from './components/Home.js';
import CommentBox from './components/Comment/Comment.js';
import Profile from './components/Homepage/Profile.js';
import Reserve from './components/Reservepage/Reserver.js';
import EstablecimientoForm from './components/Establishmentpage/Establishment.js';
import CommentsPage from './components/Reviewpage/Review.js';
import ResetPasswordPage from './components/Passwordreset/env_email.js';
import ResetPassword  from './components/Restablishpage/Restablish.js';
import CommentList  from './components/Comment/Commentarary.js';

function AppRoutes() {
  return (
    <Router>
      <div className='Routes'>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/commentBox" element={<CommentBox />} />
          <Route path="/registerOptions" element={<RegisterOptions />} />
          <Route path="/user_register" element={<User_Register />} />
          <Route path="/parking_register" element={<Parkin_Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/Reserve" element={<Reserve />} />
          <Route path="/establishment" element={<EstablecimientoForm/>} />
          <Route path="/commentsPage" element={<CommentsPage/>} />
          <Route path="/reset" element={<ResetPasswordPage/>} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/commentlist" element={< CommentList/>} />



        </Routes>
      </div>
    </Router>
  );
}

export default AppRoutes;
