
import $ from 'jquery'; 
import Select from 'react-select'


export default function Interwarehouse(props) { 

   




  
    return ( 




        <div className='layout-interwarehouse-container'>


        <div className='layout-interwarehouse-checkbox'>


        <input type="checkbox" checked />


        </div>






        <div className='layout-interwarehouse-goods'>







        <div className='left-column'>


        <Select className='select-filters' placeholder={"Tip transakcije"} id='documentType'/>
        <Select className='select-filters' placeholder={"Tip transakcije"} id='warehouse'/>
        <Select className='select-filters' placeholder={"Tip transakcije"} id='buyer'/>
        </div>
        <div id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker" inline="true">



        <input placeholder="Select date" type="date" id="example" class="form-control" />

        </div>


        </div>
        </div>


        ); 
} 