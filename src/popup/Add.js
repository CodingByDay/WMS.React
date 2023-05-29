
import $ from 'jquery'; 


export default function Add(props) { 

    
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
                        <label for="inputFirstname">Ident</label>
                        <input type="text" class="form-control" id="identForm" placeholder="Ident" />
                    </div>
                    <div class="col-sm-6">
                        <label>Podatki o naročilo</label>

                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputAddressLine1">Naziv</label>
                        <input type="text" class="form-control" id="naziv" placeholder="Naziv" />
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
                        <label for="inputContactNumber">Kontaktna številka</label>
                        <input type="number" class="form-control" id="inputContactNumberForm" placeholder="Kontakt" />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputWebsite">Datum dobave</label>
                        <input type="text" class="form-control" id="dateShipping" placeholder="Datum dobave" />
                    </div>
                </div>
                <button type="button" class="btn btn-primary px-4 float-right">Save</button>

        </div>
    </div>
</div>



        </div>



        </div>

    ); 
} 