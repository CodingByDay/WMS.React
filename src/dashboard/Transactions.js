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
import Loader from '../loader/Loader';
import $ from 'jquery'; 
import DataAccess from '../utility/DataAccess';
import LocationComponent from '../popup/LocationComponent';
import SerialComponent from '../popup/SerialComponent';



export default function Transactions() { 

    checkUID ()
    const [selectedRowTransactionsHeads, setSelectedRowHeadsTransactions] = useState({});
    const [selectedRowTransactionsPositions, setSelectedRowHeadsTransactionsPositions] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [positions, setPositions] = useState([]);
    const [show, setShow] = useState(false);
    const [head, setHead] = useState(false);
    const [filters, setFilters] = useState();
    const [component, setComponent] = useState();
    const [componentVisibility, setVisibilityComponent] = useState(true)
    useEffect(() => {
      var loader = document.getElementById("loader");

      loader.style.display = "block";
      $(".main-container").css ("display", "none");
      // window['toggleLoaader']("loader", false);
      var data =  TransactionService.getAllTransactions().then(response => { 
      setTransactions(response);
      loader.style.display = "none";
      $(".main-container").css ("display", "block");


           }); 
    }, [selectedRowTransactionsPositions]);


        $('#close_add').on('click', function(){
            setShow(false);
        });
    

      $(".table_responsive_transaction tr").click(function () {
        $(selectedRowTransactionsHeads).css("background-color", "unset")
        $(this).css("background-color", "rgba(237, 232, 235, 0.8)")
   
        setSelectedRowHeadsTransactions (	this );
      });

      $(".table_responsive_positions_transactions tr").click(function () {
        $(selectedRowTransactionsPositions).css("background-color", "unset")
        $(this).css("background-color", "rgba(237, 232, 235, 0.8)")
        setSelectedRowHeadsTransactionsPositions ( this );
      });

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


  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
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

     

                if(!isObjectEmpty(selectedRowTransactionsHeads)) {
                var toggled = ! show;
                setShow(toggled);
              }
            } else {
                var toggled = ! show;
                setHead(toggled);
            }
        } else if (action === "delete") {
          if(table === "positions") {   
              var idToDelete = selectedRowTransactionsPositions.childNodes[0].innerHTML
              deleteItemDocument(idToDelete);       
          } else {
               deleteHeadDocument();
          }
        } else if (action === "finish") {
               finishHeadDocument();
        }
      } 
   }


   async function finishHeadDocument() {
        if(window.confirm("Ali ste sigurni da želite zaključiti dokument?")) {
              var data =  TransactionService.finishHeadDocument(selectedRowTransactionsHeads.childNodes[0].innerHTML).then(response => { 
                var data =  TransactionService.getAllTransactions().then(response => { 
                  setTransactions(response);
                  window.showAlert("Informacija", "Uspešno zaključeno", "success")
                  }); 
           }); 
      }      
   }


   function deleteHeadDocument() { 
    if(window.confirm("Ali ste sigurni da želite zbrisati dokument?")) {
 
      var data =  TransactionService.deleteHeadDocument(selectedRowTransactionsHeads.childNodes[0].innerHTML).then(response => { 

      if(response.data.includes("OK!")) {
              var data =  TransactionService.getAllTransactions().then(response => { 
              setTransactions(response);
              window.showAlert("Informacija", "Uspešno pobrisano", "success")
        }); 
      }
   }); 
  } 
}


function deleteItemDocument(id) { 
  if(window.confirm("Ali ste sigurni da želite zbrisati dokument?")) {

    var data =  TransactionService.deleteMoveItem(id).then(response => { 

    if(response.data.includes("OK!")) {
            var data =  TransactionService.getAllTransactions().then(response => { 
            setTransactions(response);
            window.showAlert("Informacija", "Uspešno pobrisano", "success")
            }); 
    }
 }); 
} 
}


    const renderComponent = () => { 
      var data =  TransactionService.getAllTransactions().then(response => { 
        setTransactions(response);
        window.showAlert("Informacija", "Uspešno dodano", "success")
  }); 
    }

    const changeAddVisibility = (old, data, close) => {

      setShow(close)

      if(data.serial)
      {

        var component = <SerialComponent  data = {data} show={componentVisibility} />
        setComponent(component);

      } else {

        var component = <LocationComponent old = {old} data = {data} show={componentVisibility} />
        setComponent(component);

      }
    }

    const changeVisibility = (data) => {
        setHead(data)
    }

    const bringBackFilters = (sorting) => {
      // Sorting object comes back from the children component
      // Pass the sorting object down through the children
      setFilters(sorting)
    }

    return ( 
      
        <div>

        <div>
        <Loader />
        <div className='main-container'>
        <Header />   
        <div className="content-transactions">
        <TransactionFilters bringBackFilters = {bringBackFilters} />
        <TransactionHeaderButtons reactToFront = {reactToFront}  />
        <TransactionHeads data = {transactions} childToParent = {childToParent} filters = {filters} />
        <TransactionPositionsButtons reactToFront = {reactToFront} />
        <TransactionPositions data = {positions} childToParent = {childToParent} />
        <Add addVisibility = {changeAddVisibility} show = {show} selected = {selectedRowTransactionsHeads} filters = {filters} heads = {transactions} positions = {positions}/>
        {component}
        <AddHeadDocument render = {renderComponent} show = {head} changeVisibility = {changeVisibility}  />

        <Footer />
        </div>
        </div>
        </div>
        
        </div>

    ); 
} 