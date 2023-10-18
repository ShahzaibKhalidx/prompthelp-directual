import React, { useEffect, useState } from 'react'
import Directual from 'directual-api';
import { useAuth } from '../auth'
import { Loader } from '../components/loader/loader';
import md5 from 'md5-hash'
import { Link } from 'react-router-dom';

// Example of posting data to Directual

// Connect to Directual api
const api = new Directual({ apiHost: '/' })

export default function Register() {

  // API-endpoint details
  const dataStructure = 'request_reg' // todo: write here sysname of your data structure
  const endpoint = 'register' // todo: write here Method name of your API-endpoint

  // Connect authentication context
  const auth = useAuth();

  // Hooks for handling state
  const [response, setResponse] = useState(); // API response
  const [status, setStatus] = useState(); // Request status
  const [badRequest, setBadRequest] = useState(); // API error message
  const [loading, setLoading] = useState(false); // Loader
  const [showForm, setShowForm] = useState(true); // Show/hide the form
  const [formPayload, setFormPayload] = useState({}); // Data to send. Here we can add userID: auth.user by default

  // Reset the form
  const resetForm = () => {
    setResponse()
    setStatus()
    setBadRequest()
    setShowForm(true)
    setFormPayload({}) // Don't forget to include userID: auth.user, if needed
  }
  const editForm = () => {
    setResponse()
    setStatus()
    setBadRequest()
    setShowForm(true) // Don't forget to include userID: auth.user, if needed
  }
  // POST-request
  function postData(e) {
    e.preventDefault()
    setLoading(true)
    setShowForm(false)
    api
      // Data structure
      .structure(dataStructure)
      // POST request + payload + query params:
      .setData(endpoint, formPayload,
        { sessionID: auth.sessionID })
      .then((response) => {
        setResponse(response.result)
        setStatus(response.status)
        setLoading(false)
      })
      .catch((e) => {
        // handling errors
        setLoading(false)
        console.log(e.response)
        setBadRequest({
          httpCode: e.response.status,
          msg: e.response.data.msg
        })
      })
  }

  return (
    <div className="content max-w-lg m-auto">
      <h1 className='text-2xl font-bold text-[#002D74]'>Register New Account</h1>
      {loading && <Loader />}
      {showForm &&
        <form onSubmit={postData}>
          <input type="text" value={formPayload.name} placeholder='Name' onChange={(e) => {
            // insert here your FIELD_SYSNAME
            setFormPayload({ ...formPayload, 'name': e.target.value })
          }} />
          <input type="email" value={formPayload.email} placeholder='Email' onChange={(e) => {
            // insert here your FIELD_SYSNAME
            setFormPayload({ ...formPayload, 'email': e.target.value })
          }} />
          <input type="password" placeholder='Password' onChange={(e) => {
            // insert here your FIELD_SYSNAME
            setFormPayload({ ...formPayload, 'password': md5(e.target.value) })
          }} />
          <input type="password" placeholder='Re-enter Password' onChange={(e) => {
            // insert here your FIELD_SYSNAME
            setFormPayload({ ...formPayload, 'repeat_pass': md5(e.target.value) })
          }} />
          <button type="submit" className='text-white bg-blue-600 hover:hover:text-blue-900 rounded-2xl'>Submit</button>
        </form>
      }

      {/* Everything is OK */}
      {console.log(response)}
      {response && response[0].isvalid &&
        <div>
          <b className='text-xl text-grey-700'>You have been Signed up</b>
          <Link to="/login"><button className='border-2 bg-white flex text-sm border-blue-600 text-blue-600 hover:hover:text-blue-900 rounded-2xl'>
            Login then</button></Link>
        </div>
      }

      {response && !response[0].isvalid &&
        <div>
          <b>Error signing up</b>
          {/* <p>{response[0].error}</p> */}
          <p className='block'>Registration failed. Please try again.</p>
        </div>
      }

      {/* Something went wrong */}
      {badRequest && <div class="error">
        <b>{badRequest.httpCode} error</b>
        {(badRequest.httpCode == '400') &&
          <p>API-endpoint is not configured properly.</p>}
        {(badRequest.httpCode == '403') &&
          <p>You have to be logged in to submit this form.</p>}
        <p><code>{badRequest.msg}</code></p>
      </div>}

      {/* Reset the form */}
      {!showForm && !loading &&
        <button className='text-blue-600 border-0 text-sm flex' onClick={editForm}>
          Edit my data
        </button>}

    </div>
  )
}
