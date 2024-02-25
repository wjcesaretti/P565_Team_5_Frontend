import React, { useState } from 'react';
import './styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import firebaseapp from './firebase-config';
import ForgotPassword from './ForgotPassword'; // Adjust the path as necessary

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Added state for modal visibility
  const navigate = useNavigate();
  const handleLogin = () => {
    // Your login logic here
    console.log("Logging in with username:", username, "and password:", password);
  };

  const handleGoogleLogin = () => {
    // Google login logic

    // from https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk
    
    const auth =getAuth(firebaseapp);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        console.log("Google sign in successful", user);
      }).catch((error) => {
        // handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
      
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Google sign in error", errorCode, errorMessage);
      });
  };


  const handleFacebookLogin = () => {
    // Facebook login logic
    //docs: https://firebase.google.com/docs/auth/web/facebook-login
    const auth =getAuth(firebaseapp);
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        
        const user = result.user;

        console.log("Google sign in successful", user);
      }).catch((error) => {
        // handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
      
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.error("Google sign in error", errorCode, errorMessage);
      });
  };



  const navigateToRegister = () => {
    navigate('/register');
  };
  const toggleForgotPassword = () => setShowForgotPassword(!showForgotPassword); // Toggle modal visibility


  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div className="social-login">
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <button onClick={handleFacebookLogin}>Login with Facebook</button>
      </div>
      <button onClick={navigateToRegister}>Register</button>
      <button onClick={toggleForgotPassword}>Forgot Password?</button> {/* Added "Forgot Password?" button */}
      {showForgotPassword && <ForgotPassword onClose={toggleForgotPassword} />} {/* Conditionally render ForgotPassword */}
    </div>
  );
};
export default LoginPage;
