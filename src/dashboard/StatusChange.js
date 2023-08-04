import DataAccess from "../utility/DataAccess";

import $ from 'jquery'; 
import Select from 'react-select'
import PopupService from '../services/PopupService';
import { useEffect, useState } from "react";
import { MdAdd} from "react-icons/md";
import ListingService from "../services/ListingService";
import TransactionService from "../services/TransactionService";

export default function TakeOver(props) { 


    const [statusList, setStatusList] = useState([]);
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState(1);

    useEffect(() => {
        setStatusList([{value: "1", label: "Vpisan"}, {value: "2", label: "Potrjen"}, {value: "3", label: "Delno izdan"}, {value: "Z", label: "Zaključen"}, {value: "X", label: "Storno"}])
}, []);


    function changeStatus() {
        var users = TransactionService.getUsers().then(response=> { 
            var users = [];
            for (var i=0; i<response.Items.length; i++) {
                var user = DataAccess.getData(response.Items[i], "Subject", "StringValue");
                users.push({ label: user, value: user });
            }          




            console.log(response);
        });




        
    }
    function onChangeStatus(e) {
       setStatus(e.value)
    }

    function closeWindow() {
        $(".chooseStatus").css("display", "none");
    }

    return ( 
        <div className="chooseStatus">

                   <div className="header_part" onClick={closeWindow}>
                        <h1 id='close_add_header'>X</h1>
                   </div>

                    <div className="changeStatusOuter">

                    <div className="main-part">
                         <Select className='select-filterss' placeholder={"Status"}  onChange={(e) => onChangeStatus(e)} options={statusList} id='statusChange'/>
                    </div>


                    <center><span className='actions smallerr status' onClick={changeStatus} id='createDocument'>   
                           
             <p>Potrdi</p>
             <MdAdd />
             </span></center> 

        </div>     


        </div>
    ); 
}


