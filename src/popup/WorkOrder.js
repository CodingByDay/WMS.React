
import $ from 'jquery'; 
import Select from 'react-select'


export default function WorkOrder(props) { 


    if(props.show) {
        $("#edit").css("display", "block");
    } else {
        $("#edit").css("display", "none");
    }

    return ( 

    <div className='add-container-workorder'> 


       <div className='first-row'> 
            <Select className='select-filters' placeholder={"Tip transakcije"} id='documentType'/>
            <input type="text" id="example" class="form-control" /> 
       </div>


       <input type="text" id="example" class="form-control" />
       <input type="text" id="example" class="form-control" />
       <input type="text" id="example" class="form-control" />
       <input type="text" id="example" class="form-control" />


    </div>
    
    ); 
    };