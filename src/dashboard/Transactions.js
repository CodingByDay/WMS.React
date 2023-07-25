
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import TransactionFilters from './TransactionFilters';
import TransactionHeads from './TransactionHeads';
import TransactionPositions from './TransactionPositions';
import TransactionHeaderButtons from './TransactionHeaderButtons';
import TransactionPositionsButtons from './TransactionPositionsButtons';
import TransactionService from '../services/TransactionService';
import Add from '../popup/Add'
import AddHeadDocument from '../popup/AddHeadDocument'
import Loader from '../loader/Loader';
import $ from 'jquery'; 
import LocationComponent from '../popup/LocationComponent';
import SerialComponent from '../popup/SerialComponent';
import SerialQtyEntry from '../popup/SerialQtyEntry';
import {forwardRef, useImperativeHandle, useRef} from 'react';


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
    const [componentVisibility] = useState(true)
    const [selector, setSelector] = useState({});
    const [documentType, setDocumentType] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const childRef = useRef(null);

    useEffect(() => {

            var loader = document.getElementById("loader");
            loader.style.display = "block";
            $(".main-container").css ("display", "none");
            // window['toggleLoaader']("loader", false);
            TransactionService.getAllTransactions().then(response => { 
            setTransactions(response);
            loader.style.display = "none";
            $(".main-container").css ("display", "block");


           }); 


           setShow(false);


    }, []);


        $('#close_add').on('click', function(){
            setShow(false);
        });
      


      $('.table_responsive_transaction').on('click', 'table tr', function() {
          var selectedList = transactions;
          selectedList.selector = $(this)[0].children[0].innerHTML;
          var id = $(this)[0].children[0].innerHTML;
          setTransactions(selectedList); 
          setSelector($(this)[0].children[0].innerHTML)
          setSelectedRowHeadsTransactions (	this );
          setDocumentType($(this)[0].children[2].innerHTML)   
          TransactionService.getPositionsByHeadId(id).then(response => { 
             setPositions(response);  
          });
        
      });
     

      $('.table_responsive_positions_transactions').on('click', 'table tr', function() {

          var positionsList = positions;
          positionsList.selector = $(this)[0].children[2].innerHTML;       
          setPositions(positionsList);
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

        if(order!== "") {  

         TransactionService.getPositionsByHeadId(order).then(response => { 
            setPositions(response);  
        });

      }
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
                if(selectedRowTransactionsHeads) {
                  var toggled = ! show;
                  setShow(toggled);
              }
            } else {
                var toggledHead = ! show;
                setHead(toggledHead);
            }
        } else if (action === "delete") {
          if(table === "positions") {   
              var idToDelete = selectedRowTransactionsPositions.childNodes[2].innerHTML;      
              deleteItemDocument(idToDelete);       
          } else {
               deleteHeadDocument();
          }
        } else if (action === "finish") {
               finishHeadDocument();
        } else if (action === "edit") {

          if (typeof selectedRowTransactionsPositions.childNodes != "undefined")   {

              var toggled = ! show;
              setShow(toggled);
              // console.log(selectedRowTransactionsPositions);
              var order = selectedRowTransactionsPositions.childNodes[1].innerHTML
              var ident = selectedRowTransactionsPositions.childNodes[4].innerHTML
              var qty = selectedRowTransactionsPositions.childNodes[6].innerHTML
              setIsEdit(false);
              childRef.current.transferData();

          } else {
            return;
          }
          
        }
      } 
   }


   async function finishHeadDocument() {

          window.swal({
            title: 'Potrditev',
            text: "Ali ste sigurni da želite zaključiti dokument?",
            icon: 'warning',
            buttons: ["Ne", "Ja, zaključi"],
          }).then((result) => {
            if (result) {
              TransactionService.finishHeadDocument(selectedRowTransactionsHeads.childNodes[0].innerHTML).then(response => { 
                TransactionService.getAllTransactions().then(response => { 
                    setTransactions(response);
                    window.showAlert("Informacija", "Uspešno zaključeno", "success")
                  }); 
              }); 
            }
          })    

   }


   function deleteHeadDocument() { 
      window.swal({
        title: 'Potrditev',
        text: "Ali ste sigurni da želite pobrisati pozicijo?",
        icon: 'warning',
        buttons: ["Ne", "Ja, pobriši"],

      }).then((result) => {

        if (result) {

          TransactionService.deleteHeadDocument(selectedRowTransactionsHeads.childNodes[0].innerHTML).then(response => { 

            if(response.data.includes("OK!")) {
                    TransactionService.getAllTransactions().then(response => { 
                    setTransactions(response);
                    window.showAlert("Informacija", "Uspešno pobrisano", "success")
              }); 
            }
         }); 
        
        }
      })    
}


function deleteItemDocument(id) { 
  if(window.confirm("Ali ste sigurni da želite zbrisati dokument?")) {

    TransactionService.deleteMoveItem(id).then(response => { 

    if(response.data.includes("OK!")) {

      TransactionService.getPositionsByHeadId(selector).then(response => { 
          setPositions(response);  
          window.showAlert("Informacija", "Uspešno pobrisano", "success")
      });   

    }
 }); 
} 
}

    const renderComponentPositions = () => { 

      TransactionService.getPositionsByHeadId(selector).then(response => { 
          setPositions(response);  
          window.showAlert("Informacija", "Uspešno dodano", "success")
          $("#SerialQtyEntry").toggle();
          setShow(false);
      });

    }

    const renderComponent = () => { 
      TransactionService.getAllTransactions().then(response => { 
          setTransactions(response);
          window.showAlert("Informacija", "Uspešno dodano", "success")
      }); 
    }


    const refresh = () => {
    
      TransactionService.getPositionsByHeadId(selector).then(response => { 
        setPositions(response);  
        window.showAlert("Informacija", "Uspešno spremenjeno", "success")
        $("#SerialQtyEntry").toggle();
        setShow(false);
    });
    
    }


    const changeAddVisibility = (old, data, close) => {

      setShow(close)

      if(data.serial)
      {

        var componentSerial = <SerialQtyEntry document = {documentType} render = {renderComponentPositions} data = {data} show={componentVisibility} />  

        setComponent(componentSerial);

      } else {

        var component = <SerialQtyEntry document = {documentType} render = {renderComponentPositions} old = {old} data = {data} show={componentVisibility} />


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




    const resetEditable = () => { 
      // alert("Testing reset")
      setIsEdit(false)

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
        <TransactionHeads data = {transactions} selector={selector} childToParent = {childToParent} filters = {filters} />

        <div className="down-part">

        <TransactionPositionsButtons reactToFront = {reactToFront} />
        <TransactionPositions data = {positions} childToParent = {childToParent} />

        </div>

        <Add ref={childRef} refresh = {refresh} addVisibility = {changeAddVisibility} resetEdit = {resetEditable} edit = {isEdit} document={documentType} show = {show} selected = {selectedRowTransactionsHeads} selectedPosition = {selectedRowTransactionsPositions} filters = {filters} heads = {transactions} positions = {positions}/>
        {component}
        <AddHeadDocument render = {renderComponent} show = {head} changeVisibility = {changeVisibility}  />

        <Footer />
        </div>
        </div>
        </div>
        
        </div>

    ); 
} 