
import $ from 'jquery'; 
import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { useEffect, useState } from "react";
import Select from 'react-select'
import _ from 'lodash';
import TransactionService from '../services/TransactionService';
import { Dropdown, Stack } from '@fluentui/react'
import DataAccess from '../utility/DataAccess';
import PopupService from '../services/PopupService';


export default function LocationComponent (props) { 


    if (props.show) {
        $(".locationComponent").css("display", "block");
    } else {
        $(".locationComponent").css("display", "none");

    }

    return ( 
        <div className='locationComponent'>
            <h1>LocationComponent</h1>
        </div>
      
        

    ); 

} 
