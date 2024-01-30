import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState } from 'react';
import Select from 'react-select'
export default function AdditionalOrderInformation(props) {




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


        <Select
               id={"test1"}
               placeholder={"test"}
               options={[]}
        />


        <Select
               id={"test2"}
               placeholder={"test"}
               options={[]}
        />

        
        </div>


        </div>
        
      </Popup>


    </div>
  );
};
