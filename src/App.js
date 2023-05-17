import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./auth/Auth"
import { Dashboard } from "./dashboard/Dashboard"
import Listing from "./dashboard/Listing"
import Stock from "./dashboard/Stock"
import Transactions from "./dashboard/Transactions"
import Settings from "./dashboard/Settings"

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
        <Route path="/logout" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App