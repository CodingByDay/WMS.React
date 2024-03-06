// Users.js
import React, { useState, useEffect } from "react";
import SettingsService from "../services/SettingsService";
import UserTable from "./UserTable"; // Import the UserTable component
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import TableForge from "./TableForge";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { store } from "../store/store";

function StatusDocument() {
  const [data, setData] = useState([]);
  const [refreshTrigger, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const sqlQueryString = `
        SELECT [acDocType] -- 
        ,[acStatus] -- koda statusa
        ,[acName] -- naziv statusa
        ,[adTimeIns] -- čas vpisa 
        ,[adTimeChg] -- čas spremembe
        ,[anUserChg] -- uporabnik, ki je izvedel spremembo
        ,[anUserIns] -- uporabnik, ki je izvedel vpis
        ,[anQId] -- 
        ,[uWMSShow] -- ali je viden status dokumenta
    FROM [dbo].[tPA_SetDocTypeStat]
    `;

      SettingsService.executeSQLQuery(sqlQueryString, []).then((result) => {
        setData(result);
      });
    };
    fetchData();
  }, []);

  var users = [];

  const tableName = "status-document";

  const refresh = () => {
    const sqlQueryString = `
        SELECT [acDocType] -- vrsta dokumenta <SELECT acDocType, acName FROM tPA_SetDocType>
        ,[acStatus] -- koda statusa
        ,[acName] -- naziv statusa
        ,[adTimeIns] -- čas vpisa <samodejno>
        ,[adTimeChg] -- čas spremembe <samodejno>
        ,[anUserChg] -- uporabnik, ki je izvedel spremembo
        ,[anUserIns] -- uporabnik, ki je izvedel vpis
        ,[anQId] -- <samodejno>
        ,[uWMSShow] -- ali je viden status dokumenta
    FROM [dbo].[tPA_SetDocTypeStat]
  `;

    SettingsService.executeSQLQuery(sqlQueryString, []).then((result) => {
      setData(result);
    });
  };

  const search = (callbacks) => {};

  return (
    <div>
      <Header />

      <div className="Users">
        <div className="users-container-table">
          <TableForge
            search={search}
            refresh={refresh}
            name={tableName}
            tableData={data}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StatusDocument;
