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

        <div className='choices'style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5em', gap: '1em'}}>

            {props.columns.map((column, index) => (
               <button className='actions smallerr' onClick={() => setChosenColumn(column)}>{column.Name}</button>
            ))}

        </div>


        </div>


      </Popup>
    </div>
  );
};
