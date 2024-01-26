import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState } from 'react';

export default function ImportSheetChoice(props) {




  function setChosenSheetState(sheet) {
    props.onChosen(sheet);
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

        <div className='choices'style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5em' }}>

            {props.sheets.map((sheet, index) => (
               <button className='actions smallerr' onClick={() => setChosenSheetState(sheet)}>{sheet}</button>
            ))}

        </div>


        </div>


      </Popup>
    </div>
  );
};
