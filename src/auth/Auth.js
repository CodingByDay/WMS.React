import React from "react"
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import  Loader  from "../loader/Loader";
import $ from 'jquery';
import Cookies from 'universal-cookie';


export default function Auth(props) {







  function onKeyDownPassword(e) {
    if(e.key == "Enter") {
      handleClick();
    }
  }




  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

    var password = ""  
    let navigate = useNavigate();
    const handleClick = async () => {
      $("#wrong").css("display", "none");

      $(".whole-auth").css("display", "none");

      $(".login").toggleClass("disabled");
      var loader = document.getElementById("loader");
      loader.style.display = "block";
      await axios.get(process.env.REACT_APP_API_URL + `/Services/Device/?mode=loginUser&password=${password}&i=web`)
      .then(response => {
       // $(".login").toggleClass("disabled");
          if(response.data.Items[1].Name === "Error") {
            setTimeout(function() {              
              loader.style.display = "none";
              $("#wrong").css("display", "block"); 
              $(".whole-auth").css("display", "block");
 
          }, 2000);                        
          } else {
              // Successful login 
              var ts = Math.round(new Date().getTime() / 1000);
              const cookies = new Cookies();
              cookies.set('uid', uuidv4(), { path: '/' });
              setTimeout(function() {        $(".whole-auth").css("display", "block");
              navigate('/dashboard'); }, 2000);      
          }
      })
      .catch(error => {
        
      });
    }
    function onChangePassword(e) {
        password = e.target.value;
    }
  return (
    <div className="login"
    

    
    
    
    >
    <Loader />



    <div className="whole-auth">
    <div className="navbar auth">
            <center><div className='logo '>
                <img src='logo-wms.png'  className='logo' alt='Riko WMS' height={90} />
            </div></center>
     
            
        </div>


    <div className="Auth-form-container">
  
        <div className="Auth-form-content">
          <center><h1 className="riko-blue">Prijava</h1></center>
          <h3 className="Auth-form-title" style={{marginTop: 1 + "em"}}></h3>
          
          <div className="form-group mt-3" id="password-div" >

            <label for="password" className="label-gray">VNESITE GESLO</label>

            <input
              id = "password"
              onChange={(e)=> onChangePassword(e)}
              type="password"
              onKeyDown={onKeyDownPassword}
              className="form-control mt-1"
            
            />
            
          </div>
          <div class="alert alert-danger wrong" id="wrong" role="alert">
        Napačno geslo.
           </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" id="loginButton" onClick={handleClick}>
              Prijava
            </button>
          </div>
          
        </div>
   
    </div>
    </div>
    </div>

  )
}