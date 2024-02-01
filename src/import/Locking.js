import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState } from 'react';

export default function Locking(props) {






  function setChosenColumn(column) {
    var columnObj = props.column;
    columnObj.connection = column.Name;
    columnObj.database = column.Database;
    props.onChosen(columnObj);
  }


  return (
    <div>
     
      <Popup
        position="right center"
        open={props.isOpen}
        onClose={props.onClose}
      >

        <div className="outer">

        <div className='header' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2em' }}>
            <h4>Izberite</h4>
        </div>

        <div className='choices'style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px'}}>

            {props.columns.map((column, index) => (

                  <button className='actions smallerr lock' onClick={() => setChosenColumn(column)}>
                  <div className='shortened-lock'>{column.required ? column.Name + ' (*)'  :  column.Name}</div>
                  <div className='smaller-friendly'>{column.friendly}</div>
                  </button>

            ))}

        </div>


        </div>


      </Popup>
    </div>
  );
};
