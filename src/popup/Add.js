
import $ from 'jquery'; 
import { useNavigate  } from 'react-router-dom';
import Table from '../table/Table';
import { useEffect, useState } from "react";
import Select from 'react-select'
import _ from 'lodash';
import TransactionService from '../services/TransactionService';




export default function Add(props) { 

    const [ident, setIdent] = useState("");
    const [identList, setIdentsList] = useState([]);


    useEffect(() => {

        var idents = TransactionService.getIdents().then(response=> { 

            var identObjects = []
            identObjects.push({value: '', label: ''})
            // This is the place to check if all of the idents are correctly rendered.
            for(var i=0;i<response.data.length;i++) {
              identObjects.push({label: response.data[i],  value: response.data[i]});
            }
            window.identity = identObjects;
            setIdentsList(identObjects);
    
          });


          console.log("Component rendering");
          console.log(props.selected);
}, []);





 
  

    function onChangeIdent(e) {
        setIdent(e.value);
    }


    if(props.show) {

        $("#edit").css("display", "block");

    } else {

        $("#edit").css("display", "none");

    }
  
    return ( 

        <div className="edit" id='edit'>
     


        <div class="header_part">
            <h1 id='close_add'>X</h1>
        </div>


        <div class="body_part">

        <div class="container py-5">
    <div class="row">
        <div class="col-md-3 mx-auto">

                <div class="form-group row">
                                <label for="transactionId">Transakcija</label>
                                <input type="text" class="form-control" id="transactionIdAdd" disabled />
                </div>
                <div class="form-group row">
                                <label for="inputFirstname">Tip</label>
                                <input type="text" class="form-control" id="typeAdd" disabled/>
                </div>
                <div class="form-group row">
                                <label for="inputFirstname">Posl. Dog.</label>
                                <input type="text" class="form-control" id="documentTypeAdd" disabled />
                </div>
                <div class="form-group row">
                                <label for="inputFirstname">Naročnik</label>
                                <input type="text" class="form-control" id="clientAdd" disabled />
                </div>
                <div class="form-group row">
                                <label for="inputFirstname">Skladišče</label>
                                <input type="text" class="form-control" id="warehouseAdd" disabled />
                </div>


                <div class="form-group row">
                    <div class="col-sm-6">
                  
                    </div>
                    <div class="col-sm-6">


                    </div>
                </div>



                <div className='editable-group'>

                <div class="form-group row">
                    <div class="col-sm-6">
                    <label for="inputFirstname">Ident</label>
                        <Select 
                        placeholder={"Ident"}
                        id='identListControl'
                        options={identList}
                        onChange={(e) => onChangeIdent(e)} 
                    />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputAddressLine2">Pozicija</label>
                        <input type="text" class="form-control" id="quantityForm" placeholder="Pozicija" />
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                    <label for="inputCity">Naročilo</label>
                        <input type="text" class="form-control" id="orderForm" placeholder="Naročilo" />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputState">Odprta količina</label>
                        <input type="text" class="form-control" id="quantityForm" placeholder="Količina" />
                    </div>

                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                    <label for="inputContactNumber">Količina</label>
                        <input type="number" class="form-control" id="inputContactNumberForm" placeholder="Količina" />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputWebsite">Datum dobave</label>
                        <input type="text" class="form-control" id="dateShipping" placeholder="Datum dobave" />
                    </div>
                </div>
                </div>



                <button type="button" class="btn btn-primary px-4 float-right">Dodaj poziciju</button>

        </div>
    </div>
</div>



        </div>



        </div>

    ); 
} 