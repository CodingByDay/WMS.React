
import $ from 'jquery'; 
import { useEffect, useState } from "react";
import Select from 'react-select'
import IssuedGoods from '../popup/IssuedGoods';
import Interwarehouse from '../popup/Interwarehouse';
import TakeOver from './TakeOver';
import WorkOrder from './WorkOrder';
import Inventory from './Inventory';
import { MdAdd} from "react-icons/md";


export default function AddHeadDocument(props) { 


    var component = null;


    const  [documentType, setDocumentType] = useState([]);
    const [type, setType] = useState();
    const [conditional, setConditional] = useState();

    useEffect(() => {
        
    setDocumentType([{value: 'Izdaja blaga', label: 'Izdaja blaga'}, {value: 'Prevzem blaga', label: 'Prevzem blaga'},{value: 'Medskladišnica', label: 'Medskladišnica'}]);

    if(type !== undefined) {
        switch (type.value) {  
            case "Izdaja blaga":          
                component = <IssuedGoods close={close} type = {props.type} render={props.render} />;
                setConditional(component);
                break;
            case "Prevzem blaga":             
                component = <TakeOver close={close} type = {props.type} render={props.render} />;
                setConditional(component);
                break;
            case "Medskladišnica":       
                component = <Interwarehouse close={close} type = {props.type} render={props.render}/>;
                setConditional(component);
                break;
            case "Inventura":
                component = <Inventory close={close} type = {props.type} render={props.render}/>;
                setConditional(component);
                break;
            case "Delovni nalog":
                component = <WorkOrder close={close} type = {props.type} render={props.render} />;
                setConditional(component);
        }
    }


    }, [type]);



    const close = () => {
        props.changeVisibility(false)
    }


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
     


        <div className="header_part" onClick={close}>
            <h1 id='close_add_header'>X</h1>
        </div>


        <div className="body_part">
        <div className="container-insist">







        <Select className='select-filters'  onChange={onChangeTypePopup} placeholder={"Tip transakcije"} options = {documentType} id='transactionTypePopup'/>
        </div> 
        {conditional}
    </div>


        
    </div>





    ); 
} 