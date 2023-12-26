import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LogInLogOutButton } from '../loginLogout/loginLogoutButton'
import { useAuth } from '../../auth'
import Logo from '../../assets/22.png'

import './menu.css'


export function MainMenu() {
  const authContext = useAuth();
  return (
    <ul className="main-menu bg-white p-4">
      <li>
        <NavLink exact to="/"><img src={Logo} width={'100px'} className='ml-4'/></NavLink>
      </li>
      {/* <li>
        <NavLink exact to="/page2">Post data</NavLink>
      </li>
      <li>
        <NavLink exact to="/page3">Hidden content</NavLink>
      </li> */}

      {/* JSX visible for authorised users only */}
      
      {authContext.isAutorised() && <li>
        <NavLink exact to="/saveprompt">Save to Prompts</NavLink>
      </li>}
      {/* {authContext.isAutorised() && <li>
        <NavLink exact to="/websocket">Websocket Page</NavLink>
      </li>} */}

      {/* JSX visible for users, who have role == 'admin'. You can apply any other value here */}
      {/* {authContext.hasRole('admin') && <li>
        <NavLink exact to="/admin">Admin Page</NavLink>
      </li>} */}
      <li className="rihgt-top">
        <LogInLogOutButton />
      </li>
      <li >
        {!authContext.isAutorised &&
          <Link to="/register" >
            <button className='bg-blue-700 text-white hover:hover:bg-blue-900 rounded-2xl p-2 w-full'>Sign Up Free</button>
          </Link>}
      </li>
    </ul>
  )
}
