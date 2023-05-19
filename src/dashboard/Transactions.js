import { useNavigate  } from 'react-router-dom';
import HeaderOrderListing from './HeaderOrderListing';
import OrderHeadsListing from './OrderHeadsListing';
import OrderPositions from './OrderPositions';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import ListingService from '../services/ListingService';
import TransactionFilters from './TransactionFilters';
import TransactionHeads from './TransactionHeads';
import TransactionPositions from './TransactionPositions';
import TransactionHeaderButtons from './TransactionHeaderButtons';
import TransactionPositionsButtons from './TransactionPositionsButtons';
import TransactionService from '../services/TransactionService';
import StockService from '../services/StockService';

export default function Transactions() { 

    checkUID ()
    const [transactions, setTransactions] = useState([]);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
              var data =  TransactionService.getAllTransactions().then(response => { 
              setTransactions(response);
           }); 
    }, []);

    function isUUID ( uuid ) {
      let s = "" + uuid;
      s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
      if (s === null) {
        return false;
      }
        return true;
     } 


     const childToParent = (data) => {
        console.log(data)
        window.child = data;
        getPositions(data.childNodes[0].innerHTML)
     }


     async function getPositions(order) {      
        var data =  TransactionService.getPositionsByHeadId(order).then(response => { 
        window.positions = response;
        setPositions(response);  
    });
  }

    function checkUID () {
      const cookies = new Cookies();
      var cookie = cookies.get('uid');
      if (typeof cookie !== "undefined") {     
        if(isUUID(cookie)) {     
          return;
        } 
      } else {
            window.location.href = "/";
      }
    }
  
    return ( 

        <div>
     
        <Header />   
        <TransactionFilters />
        <TransactionHeaderButtons />
        <TransactionHeads data = {transactions} childToParent = {childToParent} />
        <TransactionPositionsButtons />
        <TransactionPositions data = {positions} childToParent = {childToParent} />
        <Footer />

        </div>

    ); 
} 