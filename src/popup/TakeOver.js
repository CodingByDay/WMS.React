
import $ from 'jquery'; 
import Select from 'react-select'

export default function TakeOver(props) { 
  
    return ( 

        <div className='layout-takeover-container'>
        <div className='layout-takeover-checkbox'>
        <input type="checkbox" />
        </div>


        <div className='layout-takeover-goods'>

        <div className='left-column'>
        <Select className='select-filters' placeholder={"Vrsta dokumenta"} id='documentType'/>
        <Select className='select-filters' placeholder={"Tip Skladišče"} id='warehouse'/>
        <Select className='select-filters' placeholder={"Skladišče"} id='buyer'/>

        </div>


        <div id="date-picker-example" class="md-form md-outline input-with-post-icon datepicker" inline="true">

        <input placeholder="Select date" type="date" id="example" class="form-control" />

        </div>


        </div>
        </div>


        ); 
}


