import HeaderOrderListing from './HeaderOrderListing'
import OrderHeadsListing from './OrderHeadsListing'
import OrderPositions from './OrderPositions'
import Header from './Header'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import ListingService from '../services/ListingService'
import Loader from '../loader/Loader'
import $ from 'jquery'
import ListingPositionsButtons from './ListingPositionsButtons'
import DataAccess from '../utility/DataAccess'
import { DashboardControl } from 'devexpress-dashboard-react';
import {DashboardPanelExtension} from 'devexpress-dashboard/common';

export default function Listing() {


  const analytics_url = process.env.REACT_APP_ANALYTICS_URL

  checkUID()

  useEffect(() => {
    /* var loader = document.getElementById('loader')
    loader.style.display = 'block'
    $('#analytics-frame').css('display', 'none')
    setTimeout(function () {
      loader.style.display = 'none'
      $('#analytics-frame').css('display', 'block')
    }, 3000) // Time before execution */
    // [Eliminate] - Not needed anymore but maybe because of better ui let it load for a few seconds? - Janko Jovičić - 08.03.2024
  }, [])

  function isUUID(uuid) {
    let s = '' + uuid
    s = s.match(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
    )
    if (s === null) {
      return false
    }
    return true
  }

  function onMyFrameLoad() {}

  function checkUID() {
    const cookies = new Cookies()
    var cookie = cookies.get('uid')
    if (typeof cookie !== 'undefined') {
      if (isUUID(cookie)) {
        return
      }
    } else {
      window.location.href = '/'
    }
  }

  function onBeforeRender(sender) {
    var dashboardControl = sender.component;
    dashboardControl.registerExtension(new DashboardPanelExtension(dashboardControl));
    dashboardControl.unregisterExtension("designerToolbar");
}
  // orders

  return (
    <div id='analytics-panel'>

      <Loader />
      <Header />
        
      <div className='dashboard-div' style={{ position : 'absolute', height: '85%', top : '8em', left: '0px', right : '0px', bottom: '0px' }}>

        <DashboardControl 
          className='dashboard-control-devexpress'
          onBeforeRender={onBeforeRender}
          workingMode='Designer'
          endpoint={analytics_url}      
        >
        </DashboardControl>

      </div>

    </div>
  )
}
