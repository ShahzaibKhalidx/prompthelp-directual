import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LogInLogOutButton } from "../loginLogout/loginLogoutButton";
import { useAuth } from "../../auth";
import Logo from "../../assets/22.png";

import "./menu.css";

export function MainMenu() {
  const authContext = useAuth();
  return (
    <ul className="main-menu bg-white p-4">
      <li>
        <NavLink exact to="/">
          <img src={Logo} width={"198px"} height={"98px"} className="ml-10 sm:h-14 w-28" />
        </NavLink>
      </li>

      {authContext.isAutorised() && (
        <li>
          <NavLink
            style={{ backgroundColor: "white", color: "#12BF80" }}
            className="button shadow-md "
            exact
            to="/saveprompt"
          >
            Save to Prompts
          </NavLink>
        </li>
      )}

      <li className="rihgt-top">
        <LogInLogOutButton />
      </li>
      <li>
        {!authContext.isAutorised && (
          <Link to="/register">
            <button className="bg-blue-700 text-white hover:hover:bg-blue-900 rounded-2xl p-2 w-full">
              Sign Up Free
            </button>
          </Link>
        )}
      </li>
    </ul>
  );
}
