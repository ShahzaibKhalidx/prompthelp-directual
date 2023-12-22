  import React, { useState, useEffect } from 'react';
  import { useAuth } from '../auth';
  import { useNavigate, useLocation } from 'react-router-dom';
  import { Loader } from '../components/loader/loader';
  import { Link } from 'react-router-dom'
  import Data from '../components/Notepad/Data.js';
  

  export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const auth = useAuth();

    useEffect(() => {
      if (auth.isAutorised()) { 
        navigate('/Data');
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
          navigate('/Data');
        } else {
          setError(authResult.error);
        }
      } catch (e) {
        setError('Your login or password is incorrect');
      } finally {
        setLoading(false);
      }
    };

    // if (isLoggedIn) {
    //   return <div>Logged in</div>;
    // }

    return (
      <div className="content form w-full max-w-xs m-auto bg-indigo-100 rounded p-5 mt-5">
        <form onSubmit={login}>
          {(location.state?.from.pathname == "/myprompts") ? <h2>Register, to save prompts</h2>:
          <h2 class="text-2xl font-bold text-[#002D74]">Login</h2>
          }
        
          {/* <p>You must log in to view the page <b>{location.state?.from.pathname || '/'}</b></p> */}
          <input
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            placeholder="login"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && <div className="error">{error}</div>}
          {!loading ? (
            <button className="border-2 border-blue-600 text-blue-600 hover:hover:text-blue-900 rounded-2xl">
              Log in</button>
          ) : (
            <Loader text="Logging in..." />
          )}
        </form>
        <footer className='p-2'>
          <Link to="/register" className="text-violet-800 hover:text-pink-700 text-sm float-left">Register</Link>
      </footer> 
      </div>
    );
  }
