import React from "react"
import {login} from "../services/AuthService"


export default function Auth(props) {


    function loginHandler(event, password) {
        var response = login(3232);
        alert(response);
    }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Prijava</h3>
          
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={event => loginHandler(event, 'hello world')}>
              Submit
            </button>
          </div>
          
        </div>
      </form>
    </div>
  )
}