import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState } from 'react';

export default function ImportOrderChoice(props) {




  function setChosenState(sheet) {
    props.onChosen(sheet);
  }


  return (
    <div>
     
      <Popup
        position="right center"
        open={props.isOpen}
        onClose={props.onClose}
      >

        <div className="outer-order">

        <div className='header-order' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2em' }}>
            <h4>Izberite ali uvažate pozicije ali glave naročila.</h4>
        </div>

        <div className='choices-order'style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5em', gap: '2em' }}>


            <button className='actions smallerr' onClick={() => setChosenState("head")}>Glave</button>
            <button className='actions smallerr' onClick={() => setChosenState("position")}>Pozicije</button>

        
        </div>


        </div>
        
      </Popup>


    </div>
  );
};
