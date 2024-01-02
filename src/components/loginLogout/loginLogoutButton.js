import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Loader } from "../loader/loader";
import "../menu/menu.css";

export function LogInLogOutButton() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [auth.user]);

  const handleLogout = () => {
    auth.signout(() => navigate("/", { replace: true }));
    setLoading(true);
  };

  return (
    <React.Fragment>
      {auth.user ? (
        <React.Fragment>
          {!loading ? (
            <button
            style={{ backgroundColor: "#12BF80", color: "white" }}
            className="button shadow-md  "
              onClick={handleLogout}
            >
              Log out
            </button>
          ) : (
            <Loader text="Logging out..." />
          )}
          {/* <Note /> */}
        </React.Fragment>
      ) : (
        <> 
          <Link
            style={{ backgroundColor: "#12BF80", color: "white" }}
            className="button shadow-md "
            to="/register"
          >
            Register
          </Link>
          <Link
            style={{ backgroundColor: "white", color: "#12BF80" }}
            className="button shadow-md "
            to="/login"
          >
            Log in
          </Link>
        </>
      )}
    </React.Fragment>
  );
}

// border-2 border-blue-600 text-blue-600 hover:hover:text-blue-900 rounded-2x

// border-2 border-blue-600 text-blue-600 hover:hover:text-blue-900 rounded-2xl mx-4
