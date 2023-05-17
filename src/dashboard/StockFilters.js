import { useNavigate  } from 'react-router-dom';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';



const [warehouse, setWarehouse] = useState([]);
const [location, setLocation] = useState([]);
const [ident, setIdent] = useState([]);
 

    return ( 

        <div>
     
        <Select className='select-filters' onChange={(e) => onChangeWarehouse(e)} options={warehouse} id='documentType'/>
        <Select className='select-filters' onChange={(e) => onChangeLocation(e)} options={location} id='documentType'/>
        <Select className='select-filters' onChange={(e) => onChangeIdent(e)} options={ident} id='documentType'/>



        </div>

    ); 
