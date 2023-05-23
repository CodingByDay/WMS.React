
import $ from 'jquery'; 


export default function Inventory(props) { 

    
    if(props.show) {

        $("#edit").css("display", "block");

    } else {

        $("#edit").css("display", "none");

    }
  
    return ( 

    <h1>Test</h1>     

    ); 
} 