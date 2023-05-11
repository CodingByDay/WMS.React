import { useNavigate  } from 'react-router-dom';
import HeaderOrderListing from './HeaderOrderListing';
import OrderHeadsListing from './OrderHeadsListing';
import OrderPositions from './OrderPositions';
import { useEffect, useState } from "react";


export default function Listing() { 

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // data fetching here
        // http://wms-skisea-test.in-sist.si/Services/Device/?mode=list&table=oodtw&pars=0100|Veleprodajno skladišče|&i=web
        // Continue with this request
        // TODO: implement data fetching here
    }, []);

  
    return ( 

        <div>
        <HeaderOrderListing />
        <OrderHeadsListing />
        <OrderPositions />     
        </div>

    ); 
} 