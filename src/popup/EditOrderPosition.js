
import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Select from 'react-select'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, addYears, format, isWeekend } from 'date-fns';
import { MdOutlineSearch, MdDateRange,MdDownload, MdOutlineCancel, MdDeleteOutline, MdEdit, MdAdd, MdOutlineMerge, MdOutlineKey, MdOutlineQrCode } from "react-icons/md";
import  SortingService  from '../services/SortingService'
import { flushSync } from 'react-dom';
import { Modal, Input } from 'antd';


function EditOrderPosition(props) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    if(props.selected) {
    setVisible(true);
    document.getElementById("quantity").value = ""
    }
  };
   
  function isFloat(n) {
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
}



  const handleOk = () => {
    setVisible(false);


        var qty = document.getElementById("quantity").value;

   

        if(qty == null) {
              return;
        }
        if (qty &&isFloat(qty)) 
        {    
              props.communicate("position", "update", qty);
        } else {
              window.showAlert("Informacija", "Morate vpisati pravilno količino", "error")
              return; 
        }
  };

  const handleCancel = () => {
    setVisible(false);
  };








 
  return (
    <div>


      <span className='actions smallerr' id="editOrder" onClick={showModal}>
          <p>Uredi</p>
          <MdEdit />
      </span>

      <Modal
        title="Quantity"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >


        <label htmlFor="quantity">Količina:</label>
        <Input id="quantity" placeholder="Vnesite količino" />
      </Modal>
    </div>
  );
}

export default EditOrderPosition;