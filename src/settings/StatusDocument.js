// Users.js
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdArrowBack, MdDescription } from "react-icons/md";
import SettingsService from "../services/SettingsService";
import UserTable from "./UserTable"; // Import the UserTable component
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import TableForge from "./TableForge";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { store } from "../store/store";

function StatusDocument() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const nav = location.state;
  const [data, setData] = useState([]);
  const [refreshTrigger, setRefresh] = useState(false);
  const [filterDeviated, setFilterDeviated] = useState(false);

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

  useEffect(() => {
    setFilterDeviated(false);
  }, [nav?.fromDocuments, nav?.filterAcDocType, nav?.documentAnQId]);

  const initialFilterColumn = useMemo(() => {
    if (nav?.fromDocuments && nav?.filterAcDocType != null && nav.filterAcDocType !== "") {
      return { dataField: "acDocType", value: nav.filterAcDocType };
    }
    return undefined;
  }, [nav?.fromDocuments, nav?.filterAcDocType]);

  const showBack =
    nav?.fromDocuments === true &&
    nav?.filterAcDocType != null &&
    String(nav.filterAcDocType) !== "" &&
    nav?.documentAnQId != null &&
    !filterDeviated;

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

  const backFooter = showBack ? (
    <button
      type="button"
      className="wms-tableforge-below__btn"
      onClick={() =>
        navigate("/documents", {
          state: { restoreAnQId: nav.documentAnQId },
        })
      }
    >
      <MdArrowBack aria-hidden />
      <span>{t("settingsDocuments.backToDocumentTypes")}</span>
      <MdDescription aria-hidden />
    </button>
  ) : null;

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
            initialFilterColumn={initialFilterColumn}
            onInitialFilterOverridden={() => setFilterDeviated(true)}
            gridBelow={backFooter}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StatusDocument;
