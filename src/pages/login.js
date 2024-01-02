import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "../components/loader/loader";
import { Link } from "react-router-dom";
import Data from "../components/Notepad/Data.js";
import "../components/menu/menu.css";
import Background from "../components/img/bg.png";
export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const auth = useAuth();

  useEffect(() => {
    if (auth.isAutorised()) {
      navigate("/Data");
    }
  }, [auth, navigate]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the login function from the auth context
      const authResult = await auth.login(username, password);

      // await auth.login(username, password);
      if (authResult.success) {
        navigate("/Data");
      } else {
        setError(authResult.error);
      }
    } catch (e) {
      setError("Your login or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  // if (isLoggedIn) {
  //   return <div>Logged in</div>;
  // }

  return (
    <div className="register" style={{ backgroundImage: `url(${Background})` }}>
      <div className="login-form  shadow-xl  content max-w-lg m-auto ">
      <div className="login-form-1">
        <form onSubmit={login}>
       
          <h1
            style={{ fontFamily: "Poppins", fontSize: "36px" }}
            className="text-2xl  font-bold text-[#030E32]"
          >
            Log in to your Account
          </h1>

          <h5
            style={{
              fontFamily: "Poppins",
              fontSize: "15px",
              letterSpacing: "0.15px",
            }}
            className="text-[#7E7E7E]"
          >
            Enter your email to receive your reset password link.
          </h5>
          {/* <p>You must log in to view the page <b>{location.state?.from.pathname || '/'}</b></p> */}
          <input
            className="register-input"
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="register-input mt-4"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && <div className="error">{error}</div>}
          {!loading ? (
            <button  style={{ backgroundColor: "#12BF80", color: "white" }}
            className="button-login shadow-md "
          >
              Log in
            </button>
          ) : (
            <Loader text="Logging in..." />
          )}
           <Link
            to="/register"
           
          >
          <button  style={{ backgroundColor: "white", color: "#7E7E7E" }}
            className="button-login shadow-md "> Register</button>
           
          </Link>
        </form>
         
        
      </div>
      
    </div>
    </div>
  );
}
