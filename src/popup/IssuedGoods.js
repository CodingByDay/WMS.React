
import $ from 'jquery'; 
import Select from 'react-select'


export default function IssuedGoods(props) { 

    

    $("date-issued-component").datetimepicker();



  
    return ( 

        <div className='layout-issued-goods'>

        <Select className='select-filters' placeholder={"Tip transakcije"} id='documentType'/>
        <Select className='select-filters' placeholder={"Tip transakcije"} id='warehouse'/>
        <Select className='select-filters' placeholder={"Tip transakcije"} id='buyer'/>

        <div className="date-issued" id ="date-issued-component" >

        </div>


        </div>


        ); 
} 