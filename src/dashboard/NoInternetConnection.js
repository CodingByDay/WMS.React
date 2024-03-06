import React, { useState, useEffect } from 'react'
import { MdKeyboardReturn } from 'react-icons/md'

const NoInternetConnection = (props) => {
  function returnState() {
    window.history.back()
  }

  return (
    <div id='internet'>
      <h1>Težave z povezovanjem na internet strežnik.</h1>
      <span className='actions smallerr' onClick={returnState}>
        <p>Nazaj</p>
        <MdKeyboardReturn />
      </span>
    </div>
  )
}

export default NoInternetConnection
