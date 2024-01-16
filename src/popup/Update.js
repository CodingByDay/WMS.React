import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TransactionService from '../services/TransactionService';
import ListingService from '../services/ListingService';
import { useSelector, useDispatch } from 'react-redux'
import DataAccess from "../utility/DataAccess";

const Update = (props) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
    
      } catch (error) {
        // Error handling
      }
    };

    fetchData();
  }, []);

  

  if (!props.isVisible) {
     return null;
  }

   function onClose() {
    props.onClose();
  }


  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <button className="popup-close-btn" onClick={onClose} >
            X
          </button>
        </div>
        <div className="popup-body">
          <label htmlFor="ident">Ident:</label>

       


          <label htmlFor="quantity">Količina:</label>

        


          <div className="center-button">
            <center><span  className="actions smallerr">
              Dodaj
            </span>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;