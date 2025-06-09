import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import HomeLogo from "../assets/images/home_logo.png";
import LeftDecor from "../assets/images/left decor.png";
import RightDecor from "../assets/images/right_decor.png";
import { ReactComponent as ShareIcon } from "../assets/images/share-icon.svg";
import { ReactComponent as FeedbackIcon } from "../assets/images/feedback-icon.svg";
import { auth, googleProvider, signInWithPopup } from "../config/firebase";


interface FeedbackPromptProps {
  message: string;
  placeholder?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

function FeedbackPrompt({message, placeholder = "", onConfirm, onCancel}: FeedbackPromptProps) {
  const [value, setValue] = useState("");
  return (
    <div className='prompt-overlay'>
      <div className='prompt-box'>
        <h3 className="prompt-message">{message}</h3>
        <textarea
          className="prompt-input"
          rows={3}                    // gives you 3 text‐lines of height automatically
          placeholder="Type here…"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <div className="prompt-actions">
          <button
            className="prompt-btn prompt-confirm"
            disabled={!value.trim()}
            onClick={() => onConfirm(value)}>
            Send
          </button>
          <button className="prompt-btn prompt-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const navigate = useNavigate();
  
  const navigateToPhotobooth = () => {
    navigate('/photobooth');
  }

  const navigateToPhotostrip = () => {
    navigate('/photostrip');
  }

  // const handleSendFeedback = () => {
  //   const response = window.prompt("Share with us your thoughts!", "");
  //   if (response !== null) {
  //     console.log("Use feedback", response);
  //     alert("Thank you for your feedback!");
  //   }
  // }

  // LOGIN
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleOpenLogin = () => {
    setIsSignUp(false);
    setShowAuthOptions(true);
  };

  const handleSignUpClick = () => setIsSignUp(true);
  const handleSignInClick = () => setIsSignUp(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocalLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const credentials = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem('authToken', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Redirect to dashboard or home page
      navigate('/home');
    } 
    catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
    } 
    finally {
      setIsLoading(false);
    }
  };

  const handleLocalSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirm = formData.get("confirm")?.toString();
    const email = formData.get("email")?.toString().trim();

    if (!username || !password || !confirm || !email) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5050/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          accountName: username, 
          birthYear: null, // optional, can leave out or add another field
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        setShowAuthOptions(false);
      } 
      else {
        alert(data.error || "Registration failed.");
      }
    } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong during registration.");
    }
};


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      alert(`Welcome ${result.user.displayName}!`);
      setShowAuthOptions(false);
    } catch (error) {
      console.error("Google login error:", error);
      alert("Login failed. Please try again.");
    }
  };

// const handleFacebookLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       alert(`Welcome ${result.user.displayName}!`);
//       setShowAuthOptions(false);
//     } catch (error) {
//       console.error("Facebook login error:", error);
//       alert("Login failed. Please try again.");
//     }
//   };

  // FEEDBACK
  const [showPrompt, setShowPrompt] = useState(false);
  const handleClickFeedback = () => setShowPrompt(true);
  const handleConfirm = (text: string) => {
    console.log("User feedback", text);
    setShowPrompt(false);
  }
  const handleCancel = () => setShowPrompt(false);

  // const url = window.location.href;
  // const smsHref = `sms:?&body=${encodeURIComponent(url)}`;

  // SHARE
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          text: "Checkout this photobooth!",
          url: window.location.href,
          title: "",
        })
      }
      catch (err) {
        console.warn("share failed", err);
      }
    }
    else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }

  return (
    <div className="background-container">

      <div className="info-container">
        <button onClick={handleShare} style={{background: "transparent", border: "none", cursor: "pointer"}}>
          <ShareIcon
            className='share-icon'
            width={30}
            height={30}
          />
        </button>
        <button onClick={handleClickFeedback} style={{background: "transparent", border: "none", cursor: "pointer"}}>
          <FeedbackIcon
            className='feedback-icon'
            width={30}
            height={30}
            style = {{ color: "var(--color-pink)", stroke: "var(--color-pink)"}}
          />
        </button>
        <span className="auth-text" onClick={handleOpenLogin}>
          Log In
        </span>
      </div>

      {showPrompt && (
        <FeedbackPrompt
          message="Share with us your thoughts!"
          placeholder="Type here…"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {showAuthOptions && (
        <div className="auth-popup-overlay">
          <div className="auth-popup">
            {isSignUp ? (
              <>
                <h3 className="auth-title">Sign Up</h3>
                <form className="auth-form" onSubmit={handleLocalSignUp}>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="auth-input"
                    required
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    required
                  />
                  <input
                    name="confirm"
                    type="password"
                    placeholder="Confirm password"
                    className="auth-input"
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="E-mail address"
                    className="auth-input"
                    required
                  />
                  <button type="submit" className="auth-submit">
                    Sign Up
                  </button>
                </form>

                <div className="auth-divider">or sign up with</div>
                <button
                  className="auth-button google"
                  onClick={handleGoogleLogin}
                >
                  Continue with Google
                </button>

                <div className="auth-switch">
                  Have an account?{' '}
                  <button className="auth-link" onClick={handleSignInClick}>
                    Sign In
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="auth-title">Log In</h3>
                <form className="auth-form" onSubmit={handleLocalLogin}>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username or E-mail"
                    className="auth-input"
                    required
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    required
                  />
                  <button type="submit" className="auth-submit">
                    Sign In
                  </button>
                </form>

                <div className="auth-divider">or</div>
                <button
                  className="auth-button google"
                  onClick={handleGoogleLogin}
                >
                  Continue with Google
                </button>

                <div className="auth-switch">
                  New user?{' '}
                  <button className="auth-link" onClick={handleSignUpClick}>
                    Sign Up
                  </button>
                </div>
              </>
            )}

            <button
              className="auth-close"
              onClick={() => setShowAuthOptions(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}


      <div className='decor-container'>
        
        <img src={RightDecor} alt="Right Decor" style = {{width: "100px", height: "150px", marginTop: "100px"}}/>

        <div className="container">
          <img src={HomeLogo} alt="home_logo" style={{ width: "200px", height: "200px"}}/>
          <div className="main-page-name">The Photobooth</div>
          <div className="button-container">
            <button className="button" onClick={navigateToPhotobooth}>
              <span>Take Photos</span>
            </button>
            <button className="button" onClick={navigateToPhotostrip}>
              <span>Upload Photos</span>
            </button>
            
          </div>
        </div>

        <img src={LeftDecor} alt="Left Decor" style = {{width: "150px", height: "200px", marginTop: "150px"}}/>
        
      </div>

    </div>
  );
}

export default Home;