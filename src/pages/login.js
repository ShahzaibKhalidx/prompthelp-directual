// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../auth';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Loader } from '../components/loader/loader';
// import { Link } from 'react-router-dom'

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const auth = useAuth();

//   useEffect(() => {
//     if (auth.isAutorised()) { 
//       navigate('/');
//     }
//   }, [auth, navigate]);

//   const login = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await auth.login(username, password);
//       navigate('/');
//     } catch (e) {
//       setError('Your login or password is incorrect');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="content form w-full max-w-xs m-auto bg-indigo-100 rounded p-5 mt-5">
//       <form onSubmit={login}>
//         {(location.state?.from.pathname == "/myprompts") ? <h2>Register, to save prompts</h2>:
//         <h2 class="text-2xl font-bold text-[#002D74]">Login</h2>
//         }
      
//         {/* <p>You must log in to view the page <b>{location.state?.from.pathname || '/'}</b></p> */}
//         <input
//          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
//           type="text"
//           placeholder="login"
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//         />
//         <input
//         className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
//           type="password"
//           placeholder="password"
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//         />
//         {error && <div className="error">{error}</div>}
//         {!loading ? (
//           <button className="w-full bg-violet-800 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded">
//             Log in</button>
//         ) : (
//           <Loader text="Logging in..." />
//         )}
//       </form>
//       <footer className='p-4'>
//         <Link to="/register" className="text-violet-800 hover:text-pink-700 text-sm float-left">Register</Link>
//      </footer> 
//     </div>
//   );
// }


// NEW CODE


import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader } from '../components/loader/loader';
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = useAuth();

  useEffect(() => {
    if (auth.isAutorised()) { 
      navigate('/');
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
        navigate('/');
      } else {
        setError(authResult.error);
      }
    } catch (e) {
      setError('Your login or password is incorrect');
    } finally {
      setLoading(false);
    }
  };

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
          <button className="w-full bg-violet-800 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded">
            Log in</button>
        ) : (
          <Loader text="Logging in..." />
        )}
      </form>
      <footer className='p-4'>
        <Link to="/register" className="text-violet-800 hover:text-pink-700 text-sm float-left">Register</Link>
     </footer> 
    </div>
  );
}
