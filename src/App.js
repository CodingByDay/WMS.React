import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./auth/Auth"
import { Dashboard } from "./dashboard/Dashboard"
import Listing from "./dashboard/Listing"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Auth />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/transactions" element={<Auth />} />
        <Route path="/stock" element={<Auth />} />
        <Route path="/logout" element={<Auth />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App