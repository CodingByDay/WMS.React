import "devextreme/dist/css/dx.light.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Mobile.css";
import "./Responsive.css";
import "./design/wms-layout.css";
import "./design/wms-tables.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./auth/Auth";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Dashboard } from "./dashboard/Dashboard";
import Commissioning from "./dashboard/Commissioning";
import Listing from "./dashboard/Listing";
import Stock from "./dashboard/Stock";
import Transactions from "./dashboard/Transactions";
import Settings from "./dashboard/Settings";
import NoInternetConnection from "./dashboard/NoInternetConnection";
import axios from "axios";
import { store } from "./store/store";
import { loadingReset } from "./features/ui";
import Analytics from "./dashboard/Analytics";
import System from "./settings/System";
import DocumentType from "./settings/DocumentType";
import Warehouses from "./settings/Warehouses";
import Devices from "./settings/Devices";
import Printers from "./settings/Printers";
import Users from "./settings/Users";
import SubjectCodes from "./settings/SubjectCodes";
import StatusDocument from "./settings/StatusDocument";
import Idents from "./settings/Idents";
import Subjects from "./settings/Subjects";
import { ImportMenu } from "./import/ImportMenu";
import { ImportOrders } from "./import/ImportOrders";
import { ImportIdents } from "./import/ImportIdents";
import { ImportSubjects } from "./import/ImportSubjects";
import DesignCanvas from "./canvas/DesignCanvas";
import React from "react";
import config from "devextreme/core/config";
import { licenseKey } from "./devextreme-licence";
import GlobalLoader from "./loader/GlobalLoader";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }
    if (!error.response) {
      store.dispatch(loadingReset());
      window.location.href = "/internet";
    }
    return Promise.reject(error);
  },
);

function App() {
  config({ licenseKey });

  return (
    <BrowserRouter>
      <GlobalLoader />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/canvas"
          element={
            <ProtectedRoute>
              <DesignCanvas />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Auth />} />
        <Route
          path="/listing"
          element={
            <ProtectedRoute>
              <Listing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <Stock />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/internet" element={<NoInternetConnection />} />
        <Route path="/logout" element={<Auth />} />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="/documents" element={<DocumentType />} />
        <Route
          path="/commissioning"
          element={
            <ProtectedRoute>
              <Commissioning />
            </ProtectedRoute>
          }
        />

        <Route
          path="/import"
          element={
            <ProtectedRoute>
              <ImportMenu />
            </ProtectedRoute>
          }
        />
        {/* Same as before refactor: sub-imports and settings CRUD had no checkUID */}
        <Route path="/import-idents" element={<ImportIdents />} />
        <Route path="/import-orders" element={<ImportOrders />} />
        <Route path="/import-subjects" element={<ImportSubjects />} />

        <Route path="/users" element={<Users />} />
        <Route path="/subject-codes" element={<SubjectCodes />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/printers" element={<Printers />} />
        <Route path="/system" element={<System />} />
        <Route path="/warehouses" element={<Warehouses />} />
        <Route path="/status" element={<StatusDocument />} />
        <Route path="/idents" element={<Idents />} />
        <Route path="/subjects" element={<Subjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
