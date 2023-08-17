import HeaderOrderListing from './HeaderOrderListing';
import OrderHeadsListing from './OrderHeadsListing';
import OrderPositions from './OrderPositions';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import ListingService from '../services/ListingService';
import Loader from '../loader/Loader';
import $ from 'jquery'; 
import ListingPositionsButtons from './ListingPositionsButtons';
import DataAccess from "../utility/DataAccess";
import StatusChange from "./StatusChange";
import { useSelector, useDispatch } from 'react-redux'
import * as redux from '../features/data';
import AddOrderPosition from '../popup/AddOrderPosition';

export default function Listing() { 
    checkUID ()
    const dispatch = useDispatch()


   
    const name = useSelector((state) => state.user.fullName)
    const [popupVisible, setPopupVisible] = useState(false);

    const handlePopupClose = () => {

      setPopupVisible(false);
    };

    // alert(name);
  
    function isUUID ( uuid ) {
      let s = "" + uuid;
      s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
      if (s === null) {
        return false;
      }
      return true;
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
  
    // orders
    const [orders, setOrders] = useState([]);
    // positions
    const [positions, setPositions] = useState([]);
    const [selectedHeadOrder, setSelectedHeadOrder] = useState();
    const [selectedPosition, setSelectedPosition] = useState();
    const [showStatusAlert, setShowStatusAlert] = useState(false)
    useEffect(() => {
      var loader = document.getElementById("loader");

              loader.style.display = "block";
              $(".main-container").css ("display", "none");
              ListingService.getAllListings().then(response => { 
              // console.log(response);
              setOrders(response);
              loader.style.display = "none";
              $(".main-container").css ("display", "block");
           }); 
    }, []);

  async function getPositions(order) {
    ListingService.getAllPositions(order).then(response => { 
      response.Items = response.Items.sort(function(a, b) {
          var aValue = DataAccess.getData(a, "No", "IntValue")
          var bValue = DataAccess.getData(b, "No", "IntValue")


          return aValue - bValue;
      });
      setPositions(response);  
    });
  }

  const [sort, setSort] = useState();
  const [refresh, setRefresh] = useState("refresh");
  const  childToParent = (data) => {

      if(data.childElementCount > 7)  {
          getPositions(data.childNodes[5].innerHTML)
          orders.selector = data.childNodes[5].innerHTML;
          setOrders(orders);
          setSelectedHeadOrder(data);
          dispatch(redux.order(data.childNodes[5].innerHTML));
      } else {
          var toChange = positions;
          toChange.selector = data.childNodes[2].innerHTML;
          // positions.selector = data.childNodes[2].innerHTML;
          setPositions([]);
          var positionsInner = {};
          Object.assign(positionsInner, positions);
          positionsInner.selector = data.childNodes[3].innerHTML;
          setPositions(positionsInner);
          // console.log(positions);
          setSelectedPosition(data);
      }


  }


  const getSortingObject = (sorting) => {
    setSort(sorting);
  }

    const communicate = (type, event, data) => {       
 
        if(type == "status") {
          if(typeof selectedHeadOrder != "undefined") {
            setShowStatusAlert(!showStatusAlert)
          }
        }

        if(type == "position" && event == "create") {
            setPopupVisible(!popupVisible) 
        }
        if(type == "position" && event == "update") {
          var objectToUpdate = {}

          console.log (selectedHeadOrder);

          // Getting the correct object;
      }

        if(type === 'head') {
          if(event ==="delete") {
            


            window.swal({
              title: 'Potrditev',
              text: "Ali ste sigurni da želite pobrisati naročilo?",
              icon: 'warning',
              buttons: ["Ne", "Ja, pobriši"],
      
            }).then((result) => {
      
              if (result) {
      
                ListingService.deleteHeadDocumentOrder(selectedHeadOrder.childNodes[0].innerHTML).then(response => { 
                    if(response.data.includes("OK!")) {

                              ListingService.getAllListings().then(response => { 
                                // console.log(response);
                                setOrders(response);
                                window.showAlert("Informacija", "Uspešno pobrisano", "success")
                      }); 
                  }
               });    
              }
            })    
          }
        } else {
          if(event ==="delete") {
            window.swal({
              title: 'Potrditev',
              text: "Ali ste sigurni da želite pobrisati pozicijo?",
              icon: 'warning',
              buttons: ["Ne", "Ja, pobriši"],
            }).then((result) => { 
            })    
          } else if (event ==="edit") {
            var editObject = {
              HeadID: selectedPosition
            }
          }
        }
    }
    const currentHead = selectedHeadOrder?.childNodes[5]?.innerHTML ?? -1;

    return ( 

        <div>


            <Loader />

            <div className='main-container'>

            <Header/>

            <div className='listing-bg' >

            <HeaderOrderListing communicate = {communicate} getSortingObject = {getSortingObject} />
            <OrderHeadsListing  data = {orders} childToParent = {childToParent} sort={sort} />
            <ListingPositionsButtons communicate = {communicate} />
            <OrderPositions data = {positions} childToParent = {childToParent} />   
            <AddOrderPosition current = {currentHead} isVisible={popupVisible} onClose={handlePopupClose} />


            {
                showStatusAlert && typeof selectedHeadOrder != "undefined"  && (
                  <StatusChange order = {selectedHeadOrder.childNodes[5].innerHTML} />
                )
            }
   

            <Footer />


        </div>
        



        </div>

        </div>

        

    ); 
} 