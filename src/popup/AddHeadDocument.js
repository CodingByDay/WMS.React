
import $ from 'jquery'; 
import { useEffect, useState } from "react";
import Select from 'react-select'

export default function AddHeadDocument(props) { 




    const  [documentType, setDocumentType] = useState([]);
    const [type, setType] = useState();

    useEffect(() => {
        setDocumentType([{value: 'Izdaja blaga', label: 'Izdaja blaga'}, {value: 'Prevzem blaga', label: 'Prevzem blaga'},{value: 'Medskladišnica', label: 'Medskladišnica'},{value: 'Delovni nalog', label: 'Delovni nalog'},{value: 'Inventura', label: 'Inventura'}]);


        alert(type.value)
        switch (type.value) {  


        }



    }, [type]);


    function onChangeTypePopup(e) {
        const mutated = {value: e.value, label:e.label}
        setType (mutated);   
    }
    
    if(props.show) {
        $("#addHeader").css("display", "block");
    } else {
        $("#addHeader").css("display", "none");
    }
  
    return ( 

        <div className="addHeaderClass" id='addHeader'>
     


        <div class="header_part">
            <h1 id='close_add_header'>X</h1>
        </div>


        <div class="body_part">
        <div class="container py-5">





            
    <div class="row">
        <div class="col-md-3 mx-auto">

                <div class="form-group row">
                <Select className='select-filters' onChange={onChangeTypePopup}  placeholder={"Tip transakcije"} options = {documentType} id='transactionTypePopup'/>

                </div>
                
             

        </div>
    </div>





</div>



        </div>



        </div>

    ); 
} 