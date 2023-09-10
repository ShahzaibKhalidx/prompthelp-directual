import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LogInLogOutButton } from '../loginLogout/loginLogoutButton'
import { useAuth } from '../../auth'

import './menu.css'


export function MainMenu() {
  const authContext = useAuth();
  return (
    <ul className="main-menu bg-indigo-100">
      <li>
        <NavLink exact to="/">Prompts</NavLink>
      </li>
      {/* <li>
        <NavLink exact to="/page2">Post data</NavLink>
      </li>
      <li>
        <NavLink exact to="/page3">Hidden content</NavLink>
      </li> */}

      {/* JSX visible for authorised users only */}
      {authContext.isAutorised() && <li>
        <NavLink exact to="/myprompts">My Prompts</NavLink>
      </li>}
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
      <li>
        {!authContext.isAutorised &&
          <Link to="/register">
            <button className='bg-violet-800 text-violet-100 hover:bg-violet-600'>Register</button>
          </Link>}
      </li>
    </ul>
  )
}
