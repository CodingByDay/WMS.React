import React from "react"
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';


export default function Auth(props) {
    var password = ""  
    let navigate = useNavigate();

  
    const handleClick = async () => {
      await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=loginUser&password=${password}&i=web`)
      .then(response => {
          if(response.data.Items[1].Name === "Error") {
              alert("Nepravilno geslo")
          } else {
              navigate('/dashboard');
          }
      })
      .catch(error => {
        
      });
    }
    function onChangePassword(e) {
        password = e.target.value;
    }
  return (
    <div className="Auth-form-container">
  
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Prijava</h3>
          
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id = "password"
              onChange={(e)=> onChangePassword(e)}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleClick}>
              Submit
            </button>
          </div>
          
        </div>
   
    </div>
  )
}