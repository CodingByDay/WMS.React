// Users.js
import React, { useState, useEffect } from "react";
import SettingsService from "../services/SettingsService";
import UserTable from "./UserTable"; // Import the UserTable component
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import TableForge from "./TableForge";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { store } from "../store/store";

function DocumentType() {
  const [data, setData] = useState([]);
  const [refreshTrigger, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const sqlQueryString = `
          SELECT [acDocType] -- vrata dokumenta
            ,[acSetOf] -- namen dokuenta: /*D = delovni nalog,*/ F = blagovni, N = naročilo, X = default
            ,[acType] -- varianta vrste dokumenta: 
              --F: blagovni -> E - medskladiščnica, I = izdaja iz skladišča, N = popis inventure, P = prevzem na skladišče
              --N: naročilo -> P = prodaja, I = nakup (pazi ravno obratno je kot na blagovnem!!!)
            ,[acName] -- naziv
            ,[acIssuer] -- privzeto izdajno skladišče
            ,[acReceiver] -- privzeto prevzemno skladišče
            ,[adTimeIns] -- čas vpisa <samodejno>
            ,[adTimeChg] -- čas spremembe <samodejno>
            ,[anUserChg] -- uporabnik, ki je izvedel spremembo
            ,[anUserIns] -- uporabnik, ki je izvedel vpis
            ,[acWarehouse] -- privzeto skladišče -> select acSubject, acName2 from tHE_SetSubj where acWarehouse = 'T' 
            ,[anQId]
            ,[uWMSAcqDocType] -- vrsta dokumenta prevzema ki nastane - uporablja se pri namenu N ob varianti I -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F and acType = 'I'
            ,[uWMSIssueDocType] -- vrsta dokumenta izdaje ki nastane - uporablja se pri namenu N ob varianti P -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F and acType = 'I'
            ,[uWMS] -- ali je dokument viden v WMS
            ,[uWMSPartiallyFinishStatus] -- status delno zaključenega dokumenta -> select acStatus, acName from tPA_SetDocTypeStat where acDocType = <trenutni acDocType>
            ,[uWMSFinishStatus] -- status zaključenega dokumenta
          /*,[acDocTypeRef] -- vrsta dokumenta prevzema iz proizvodnje - se uporablja pri namenu D -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F' and acType = 'I'
            ,[acDocTypeWaste] -- vrsta dokumenta odpadka iz proizvodnje - se uporablja pri namenu D -> -||-
            ,[uWMSEntryControl] -- ali je pri WMS aktivna vhodna kontrola
            ,[uWMSCoop] -- ali je proizvodnja pri kooperantu
            ,[uWMSWOIssueWork] -- dokument vnose porabe dela pri namenu D
            ,[uWMSWOReceiving] -- dokument prevzema pri namenu D
            ,[uWMSFinishDoc] -- dokument izdaje izdelka pri namenu D
            ,[uWMSWOIssueMat] -- dokument porabe materiala pri namenu D*/
        FROM [dbo].[tPA_SetDocType]
    `;

      SettingsService.executeSQLQuery(sqlQueryString, []).then((result) => {
        setData(result);
      });
    };
    fetchData();
  }, []);

  var users = [];

  const tableName = "type-document";

  const refresh = () => {
    const sqlQueryString = `
        SELECT [acDocType] -- vrata dokumenta
        ,[acSetOf] -- namen dokuenta: /*D = delovni nalog,*/ F = blagovni, N = naročilo, X = default
        ,[acType] -- varianta vrste dokumenta: 
          --F: blagovni -> E - medskladiščnica, I = izdaja iz skladišča, N = popis inventure, P = prevzem na skladišče
          --N: naročilo -> P = prodaja, I = nakup (pazi ravno obratno je kot na blagovnem!!!)
        ,[acName] -- naziv
        ,[acIssuer] -- privzeto izdajno skladišče
        ,[acReceiver] -- privzeto prevzemno skladišče
        ,[adTimeIns] -- čas vpisa <samodejno>
        ,[adTimeChg] -- čas spremembe <samodejno>
        ,[anUserChg] -- uporabnik, ki je izvedel spremembo
        ,[anUserIns] -- uporabnik, ki je izvedel vpis
        ,[acWarehouse] -- privzeto skladišče -> select acSubject, acName2 from tHE_SetSubj where acWarehouse = 'T' 
        ,[anQId]
        ,[uWMSAcqDocType] -- vrsta dokumenta prevzema ki nastane - uporablja se pri namenu N ob varianti I -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F and acType = 'I'
        ,[uWMSIssueDocType] -- vrsta dokumenta izdaje ki nastane - uporablja se pri namenu N ob varianti P -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F and acType = 'I'
        ,[uWMS] -- ali je dokument viden v WMS
        ,[uWMSPartiallyFinishStatus] -- status delno zaključenega dokumenta -> select acStatus, acName from tPA_SetDocTypeStat where acDocType = <trenutni acDocType>
        ,[uWMSFinishStatus] -- status zaključenega dokumenta
      /*,[acDocTypeRef] -- vrsta dokumenta prevzema iz proizvodnje - se uporablja pri namenu D -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F' and acType = 'I'
        ,[acDocTypeWaste] -- vrsta dokumenta odpadka iz proizvodnje - se uporablja pri namenu D -> -||-
        ,[uWMSEntryControl] -- ali je pri WMS aktivna vhodna kontrola
        ,[uWMSCoop] -- ali je proizvodnja pri kooperantu
        ,[uWMSWOIssueWork] -- dokument vnose porabe dela pri namenu D
        ,[uWMSWOReceiving] -- dokument prevzema pri namenu D
        ,[uWMSFinishDoc] -- dokument izdaje izdelka pri namenu D
        ,[uWMSWOIssueMat] -- dokument porabe materiala pri namenu D*/
    FROM [dbo].[tPA_SetDocType]
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

export default DocumentType;
