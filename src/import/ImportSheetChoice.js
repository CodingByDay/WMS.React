import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function ImportSheetChoice(props) {
  return (
    <div>
     
      <Popup
        position="right center"
        open={props.isOpen}
        onClose={props.onClose}
      >
        <h4>Izberite</h4>
        {props.sheets.map((sheet, index) => (
          <button>{sheet}</button>
        ))}
      </Popup>
    </div>
  );
};
