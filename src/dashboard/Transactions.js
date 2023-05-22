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
import Add from '../popup/Add'
import AddHeadDocument from '../popup/AddHeadDocument'




export default function Transactions() { 
    checkUID ()



    const [transactions, setTransactions] = useState([]);
    const [positions, setPositions] = useState([]);
    const [show, setShow] = useState(false);
    const [head, setHead] = useState(false);
 
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
        getPositions(data.childNodes[0].innerHTML)
     }


     async function getPositions(order) {      
        var data =  TransactionService.getPositionsByHeadId(order).then(response => { 
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



    const reactToFront = (data) => {
      var type = data.type;
      var action = data.action;
      var table = data.table;
      if(type === "transaction") { 

        if(action === "add") { 

            if(table === "positions") {    
                var toggled = ! show;
                setShow(toggled);
            } else {
                var toggled = ! show;
                setHead(toggled);
            }
        }
      } else {

      }
   }

  
    return ( 
      
        <div>



        <Header />   
        <TransactionFilters />
        <TransactionHeaderButtons reactToFront = {reactToFront}   />
        <TransactionHeads data = {transactions} childToParent = {childToParent} />
        <TransactionPositionsButtons reactToFront = {reactToFront} />
        <TransactionPositions data = {positions} childToParent = {childToParent} />


        <Add show = {show} />
        <AddHeadDocument show = {head}  />

        <Footer />


        
        </div>

    ); 
} 