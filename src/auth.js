// import React, { useState, useEffect, useContext, createContext } from "react";
// import Directual from 'directual-api';

// const api = new Directual({apiHost: '/'});

// export const authContext = createContext();

// export function ProvideAuth({ children }) {
//   const auth = useProvideAuth();
//   return <authContext.Provider value={auth}>{children}</authContext.Provider>;
// }

// export const useAuth = () => {
//   return useContext(authContext);
// };

// // Provide hook that creates auth object and handles state
// function useProvideAuth() {
//   const [user, setUser] = useState(null);
//   const [sessionID, setSessionID] = useState(null);
//   const [role, setRole] = useState(null);

//   const login = (username, password) => {
//     return api.auth.login(username, password).then(res=>{
//       setUser(res.username)
//       setSessionID(res.sessionID)
//       setRole(res.role)
//       window.localStorage.setItem('sid', res.sessionID)
//     })
//   };

//   const signout = (cb) => {
//     return api.auth.logout('').then(res=>{
//       setUser(null)
//       setRole(null)
//       setSessionID(null)
//       window.localStorage.setItem('sid', null)
//       cb()
//     })
//   };

//   const isAutorised = () => {
//     return !!user
//   }

//   const hasRole = (roleCheck) => {
//     if(!roleCheck){
//       return true
//     }
//     return role === roleCheck
//   }

//   useEffect(() => {
//     let sid = window.localStorage.getItem('sid') || ''
//     api.auth.isAuthorize(sid, (status, token)=>{
//       if(status === true){
//         setUser(token.username)
//         setSessionID(token.token)
//         setRole(token.role)
//       }
//     })
//   }, []);

//   return {
//     user,
//     sessionID,
//     login,
//     isAutorised,
//     signout,
//     hasRole
//   };
// }


// NEW CODE

import React, { useState, useEffect, useContext, createContext } from "react";
import Directual from 'directual-api';
import axios from 'axios';

const api = new Directual({apiHost: '/'});

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};


// Provide hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [sessionID, setSessionID] = useState(null);
  const [role, setRole] = useState(null);

  const login = async (username, password) => {
    const appId = "ff949b76-9513-459d-95b3-9dd741fb08e1"
    try {
      // Make a direct HTTP request to the authentication API
      const response = await axios.post(
        `https://api.directual.com/good/api/v5/auth?appID=${appId}`,
        {
          provider: "rest",
          username: username,
          password: password,
        },

        );
        console.log(response)

      // Check if the authentication response status is "ok"
      if (response.data.status === 'ok') {
        const userData = response.data.result;
        setUser(userData.username);
        setSessionID(userData.token);
        setRole(userData.role);
        window.localStorage.setItem('sid', userData.token);
        return { success: true };
      } else {
        return { success: false, error: 'Authentication failed.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred while logging in.' };
    }
  };

  const signout = (cb) => {
    return api.auth.logout('').then(res=>{
      setUser(null)
      setRole(null)
      setSessionID(null)
      window.localStorage.setItem('sid', null)
      cb()
    })
  };
  
  // const signout = async (cb) => {
  //   const appId = "ff949b76-9513-459d-95b3-9dd741fb08e1";
  //   try {
  //     // Make a direct HTTP request to the logout endpoint of your API
  //     const response = await axios.post(
  //       `https://api.directual.com/good/api/v5/auth/logout?appID=${appId}`,
  //       {
  //         // Include any necessary parameters for logout (if required by your API)
  //       }
  //     );
  
  //     // Check the response status or data to ensure a successful logout
  //     if (response.data.status === 'ok') {
  //       setUser(null);
  //       setRole(null);
  //       setSessionID(null);
  //       window.localStorage.removeItem('sid'); // Use removeItem to clear the localStorage
  //       cb();
  //       return { success: true };
  //     } else {
  //       return { success: false, error: 'Logout failed.' };
  //     }
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //     return { success: false, error: 'An error occurred while logging out.' };
  //   }
  // };
  

  const isAutorised = () => {
    return !!user
  }

  const hasRole = (roleCheck) => {
    if(!roleCheck){
      return true
    }
    return role === roleCheck
  }

  useEffect(() => {
    let sid = window.localStorage.getItem('sid') || ''
    api.auth.isAuthorize(sid, (status, token)=>{
      if(status === true){
        setUser(token.username)
        setSessionID(token.token)
        setRole(token.role)
      }
    })
  }, []);

  return {
    user,
    sessionID,
    login,
    isAutorised,
    signout,
    hasRole
  };
}