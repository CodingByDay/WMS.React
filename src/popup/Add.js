
import $ from 'jquery'; 


export default function Settings(props) { 

    
    if(props.show) {

        $("#edit").css("display", "block");

    } else {

        $("#edit").css("display", "none");

    }
  
    return ( 

        <div className="edit" id='edit'>
     
        <h1>I am a header component </h1>

        </div>

    ); 
} 