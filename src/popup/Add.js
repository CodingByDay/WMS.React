
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
                        <input type="text" class="form-control" id="ident" placeholder="Ident" />
                    </div>
                    <div class="col-sm-6">
                        <label>Podatki o naročilo</label>

                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputAddressLine1">Naziv</label>
                        <input type="text" class="form-control" id="identName" placeholder="Street Address" />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputAddressLine2">Količina</label>
                        <input type="text" class="form-control" id="inputAddressLine2" placeholder="Line 2" />
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity" placeholder="City" />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputState">State</label>
                        <input type="text" class="form-control" id="inputState" placeholder="State" />
                    </div>

                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label for="inputContactNumber">Contact Number</label>
                        <input type="number" class="form-control" id="inputContactNumber" placeholder="Contact Number" />
                    </div>
                    <div class="col-sm-6">
                        <label for="inputWebsite">Website</label>
                        <input type="text" class="form-control" id="inputWebsite" placeholder="Website" />
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