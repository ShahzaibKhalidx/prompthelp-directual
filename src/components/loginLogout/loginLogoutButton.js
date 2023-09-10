
// import React, { useState, useEffect } from 'react'
// import { useAuth } from '../../auth'
// import {
//     Link, useHistory
// } from 'react-router-dom'

// import { Loader } from '../loader/loader';

// export function LogInLogOutButton() {
//     let history = useHistory()
//     const auth = useAuth();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(false)
//       }, [auth.user]);

//     return (
//         <React.Fragment>
//             {auth.user ? (
//                 <React.Fragment>
//                 { !loading ? (

//                 <button
//                     onClick={() => {
//                         auth.signout(() => history.push('/'));
//                         setLoading(true)
//                     }}
//                 >
//                     Log out
//                 </button>
                
//                 ) :
//                 ( <Loader text='Logging out...'/> )}

//                 </React.Fragment>

//             ) : (
//                     <Link to="/login">
//                         <button>Log in</button></Link>
//                 )}
//         </React.Fragment>)
// }


import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader } from '../loader/loader';

export function LogInLogOutButton() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [auth.user]);

  const handleLogout = () => {
    auth.signout(() => navigate('/', { replace: true }));
    setLoading(true);
  };

  return (
    <React.Fragment>
      {auth.user ? (
        <React.Fragment>
          {!loading ? (
            <button className='bg-violet-900 text-violet-100 hover:bg-violet-800' onClick={handleLogout}>Log out</button>
          ) : (
            <Loader text="Logging out..." />
          )}
        </React.Fragment>
      ) : (
        <Link className='bg-violet-100 text-violet-900 hover:bg-violet-200 rounded' to="/login">Log in</Link>
      )}
    </React.Fragment>
  );
}
