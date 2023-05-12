import React from "react"
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import  Loader  from "../loader/Loader";
import $ from 'jquery';
export default function Auth(props) {
    var password = ""  
    let navigate = useNavigate();


  
    const handleClick = async () => {
      $("#wrong").css("display", "none");

      var loader = document.getElementById("loader");
      loader.style.display = "block";
      await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=loginUser&password=${password}&i=web`)
      .then(response => {
          if(response.data.Items[1].Name === "Error") {
            setTimeout(function() { 
              
              
              loader.style.display = "none";
              $("#wrong").css("display", "block");

          
          
          }, 2000);             

              
            
          } else {
              setTimeout(function() { navigate('/dashboard'); }, 2000);             


          }
      })
      .catch(error => {
        
      });
    }
    function onChangePassword(e) {
        password = e.target.value;
    }
  return (
    <div>


    <Loader />


    <div className="Auth-form-container">
  
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Prijava</h3>
          
          <div className="form-group mt-3" id="password-div">
            <label>Password</label>
            <input
              id = "password"
              onChange={(e)=> onChangePassword(e)}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
            
          </div>
          <div class="alert alert-danger wrong" id="wrong" role="alert">
        Napačno geslo.
           </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleClick}>
              Submit
            </button>
          </div>
          
        </div>
   
    </div>
    </div>
  )
}