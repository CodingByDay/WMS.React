import "bootstrap/dist/css/bootstrap.min.css"

import "./App.css"
import "./Mobile.css"
import "./Responsive.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./auth/Auth"
import { Dashboard } from "./dashboard/Dashboard"
import Listing from "./dashboard/Listing"
import Stock from "./dashboard/Stock"
import Transactions from "./dashboard/Transactions"
import Settings from "./dashboard/Settings"
import NoInternetConnection from "./dashboard/NoInternetConnection"
import axios from 'axios';
import Analytics from './dashboard/Analytics';
import System from './settings/System';
import DocumentType from './settings/DocumentType';
import Warehouses from './settings/Warehouses';
import Devices from './settings/Devices';
import Printers from './settings/Printers';
import Users from './settings/Users';


axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  
  window.location.href = "/internet";
});


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Auth />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/internet" element={<NoInternetConnection />} />
        <Route path="/logout" element={<Auth />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/documents" element={<DocumentType  />} />



        <Route path="/users" element={<Users  />} />

        

      </Routes>
    </BrowserRouter>
  )
}

export default App