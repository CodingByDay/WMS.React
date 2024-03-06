// Users.js
import React, { useState, useEffect } from "react";
import SettingsService from "../services/SettingsService";
import UserTable from "./UserTable"; // Import the UserTable component
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import TableForge from "./TableForge";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { store } from "../store/store";

function Idents() {
  const [data, setData] = useState([]);
  const [refreshTrigger, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const sqlQueryString = `
          SELECT [acIdent] -- Šifra identa
          ,[acName] -- Naziv
          ,[acCode] -- EAN koda
          ,[acSetOfItem] -- Tip identa -> SELECT acSetOfItem, acName FROM tHE_SetItemType
          ,[acSupplier] -- Dobavitelj -> SELECT acSubject, acName2 FROM tHE_SetSubj where acSupplier = 'T'
          ,[acUM] -- Primarna enota mere -> SELECT acUM, acName FROM tHE_SetUM
          ,[anUMToUM2] -- Pretvornik iz UM1 v UM2
          ,[acUM2] -- Sekundarna enota mere -> SELECT acUM, acName FROM tHE_SetUM
          ,[acSerialNo] -- tip serijske številke -> 'N' - ni vodeno; 'S' - 1 serijska 1 kos; '
          ,[acActive] -- ali je ident aktiven
          ,[anDimHeight] -- višina
          ,[anDimWidth] -- širina
          ,[anDimDepth] -- globina
          ,[anDimWeight] -- teža
          ,[anDimWeightBrutto] -- bruto teža
          ,[acUMDim1] -- enota mere dolžine -> SELECT acUM, acName FROM tHE_SetUM
          ,[acUMDim2] -- enota mere teže -> SELECT acUM, acName FROM tHE_SetUM
          ,[uWMS] -- ali je vidno v WMS
      FROM [dbo].[tHE_SetItem]
    `;

      SettingsService.executeSQLQuery(sqlQueryString, []).then((result) => {
        setData(result);
      });
    };
    fetchData();
  }, []);

  var users = [];

  const tableName = "idents";

  const refresh = () => {
    const sqlQueryString = `
        SELECT [acIdent] -- Šifra identa
        ,[acName] -- Naziv
        ,[acCode] -- EAN koda
        ,[acSetOfItem] -- Tip identa -> SELECT acSetOfItem, acName FROM tHE_SetItemType
        ,[acSupplier] -- Dobavitelj -> SELECT acSubject, acName2 FROM tHE_SetSubj where acSupplier = 'T'
        ,[acUM] -- Primarna enota mere -> SELECT acUM, acName FROM tHE_SetUM
        ,[anUMToUM2] -- Pretvornik iz UM1 v UM2
        ,[acUM2] -- Sekundarna enota mere -> SELECT acUM, acName FROM tHE_SetUM
        ,[acSerialNo] -- tip serijske številke -> 'N' - ni vodeno; 'S' - 1 serijska 1 kos; '
        ,[acActive] -- ali je ident aktiven
        ,[anDimHeight] -- višina
        ,[anDimWidth] -- širina
        ,[anDimDepth] -- globina
        ,[anDimWeight] -- teža
        ,[anDimWeightBrutto] -- bruto teža
        ,[acUMDim1] -- enota mere dolžine -> SELECT acUM, acName FROM tHE_SetUM
        ,[acUMDim2] -- enota mere teže -> SELECT acUM, acName FROM tHE_SetUM
        ,[uWMS] -- ali je vidno v WMS
    FROM [dbo].[tHE_SetItem]
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

export default Idents;
