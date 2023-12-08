import React, { useState } from 'react';
import Directual from 'directual-api';
import { useAuth } from '../auth';
import { Loader } from '../components/loader/loader';
import md5 from 'md5-hash';
import { Link } from 'react-router-dom';

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

 // app define

 const api = new Directual({
  apiHost:
    "https://api.directual.com/good/api/v5/data/request_reg/register?appID=ff949b76-9513-459d-95b3-9dd741fb08e1&sessionID=876082",
});



export default function Register() {
  // API-endpoint details
  const dataStructure = 'request_reg'; // Sysname of your data structure
  const endpoint = 'register'; // Method name of your API-endpoint

  // Connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [response, setResponse] = useState(); // API response
  const [status, setStatus] = useState(); // Request status
  const [badRequest, setBadRequest] = useState(); // API error message
  const [loading, setLoading] = useState(false); // Loader
  const [showForm, setShowForm] = useState(true); // Show/hide the form
  const [formPayload, setFormPayload] = useState({}); // Data to send
  const [emailValid, setEmailValid] = useState(true); // State for email validation

  // Function to validate email using regex
  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  // Function to handle email changes and validation
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormPayload({ ...formPayload, 'email': email });
    setEmailValid(validateEmail(email));
  };

  // POST-request function
  function postData(e) {
    e.preventDefault();

    // Check for email validity
    if (!validateEmail(formPayload.email)) {
      setEmailValid(false);
      return; // Stop form submission if email is invalid
    }

    // Proceed with form submission
    setEmailValid(true);
    setLoading(true);
    setShowForm(false);

    // API call to Directual
    api
      .structure(dataStructure)
      .setData(endpoint, formPayload, { sessionID: auth.sessionID })
      .then((response) => {
        setResponse(response.result);
        setStatus(response.status);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.response);
        setBadRequest({
          httpCode: e.response.status,
          msg: e.response.data.msg
        });
      });
  }

  return (
    <div className="content max-w-lg m-auto">
      <h1 className='text-2xl font-bold text-[#002D74]'>Register New Account</h1>
      {loading && <Loader />}

      {showForm && (
        <form onSubmit={postData}>
          <input
            type="text"
            value={formPayload.name}
            placeholder='Name'
            onChange={(e) => setFormPayload({ ...formPayload, 'name': e.target.value })}
          />

          <input
            type="email"
            value={formPayload.email}
            placeholder='Email'
            onChange={handleEmailChange}
            className={!emailValid ? 'border-red-500' : ''}
          />
          {!emailValid && <p className='text-red-500'>This email is incorrect.</p>}

          <input
            type="password"
            placeholder='Password'
            onChange={(e) => setFormPayload({ ...formPayload, 'password': md5(e.target.value) })}
          />

          <input
            type="password"
            placeholder='Re-enter Password'
            onChange={(e) => setFormPayload({ ...formPayload, 'repeat_pass': md5(e.target.value) })}
          />

          <button type="submit" className='text-white bg-blue-600 hover:hover:text-blue-900 rounded-2xl'>
            Submit
          </button>
        </form>
      )}

      {response && response[0].isvalid && (
        <div>
          <b className='text-xl text-grey-700'>You have been Signed up</b>
          <Link to="/login">
            <button className='border-2 bg-white flex text-sm border-blue-600 text-blue-600 hover:hover:text-blue-900 rounded-2xl'>
              Login then
            </button>
          </Link>
        </div>
      )}

      {response && !response[0].isvalid && (
        <div>
          <b>Error signing up</b>
          <p className='block'>Registration failed. Please try again.</p>
        </div>
      )}

      {badRequest && (
        <div class="error">
          <b>{badRequest.httpCode} error</b>
          {badRequest.httpCode === '400' && <p>API-endpoint is not configured properly.</p>}
          {badRequest.httpCode === '403' && <p>You have to be logged in to submit this form.</p>}
          <p><code>{badRequest.msg}</code></p>
        </div>
      )}

      {!showForm && !loading && (
        <button className='text-blue-600 border-0 text-sm flex' onClick={() => setShowForm(true)}>
          Edit my data
        </button>
      )}
    </div>
  );
}
