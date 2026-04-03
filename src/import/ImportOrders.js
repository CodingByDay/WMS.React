import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import React, { useState, useEffect, useMemo } from "react";
import ImportOrderChoice from "./ImportOrderChoice";
import ImportWizzard from "./ImportWizzard";
import $ from "jquery";
import Loader from "../loader/Loader";
import Swal from "sweetalert2";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { trHeader } from "../i18n/headerMap";

const sql_position = `INSERT INTO [dbo].[uWMSOrderItem]
                        ([acKey]
                        ,[anNo]
                        ,[acIdent]
                        ,[acSerialNo]
                        ,[anQty]
                        ,[acNote]
                        ,[anUserIns]
                        ,[adTimeIns])
                    VALUES
                        (@acKey
                        ,@anNo
                        ,@acIdent
                        ,@acSerialNo
                        ,@anQty
                        ,@acNote
                        ,@anUserIns
                        ,@adTimeIns)`;

const sql_head = `INSERT INTO [dbo].[uWMSOrderHead]
                    ([acType]
                    ,[acDocType]
                    ,[adDate]
                    ,[acKey]
                    ,[acDoc1]
                    ,[adDatedoc1]
                    ,[acReceiver]
                    ,[acIssuer]
                    ,[acWarehouse]
                    ,[acStatus]
                    ,[acNote]
                    ,[acLnkKey]
                    ,[anUserIns]
                    ,[adTimeIns]
                    ,[anUserChg]
                    ,[adTimeChg])
                VALUES
                    (@acType
                    ,@acDocType
                    ,@adDate
                    ,@acKey
                    ,@acDoc1
                    ,@adDatedoc1
                    ,@acReceiver
                    ,@acIssuer
                    ,@acWarehouse
                    ,@acStatus
                    ,@acNote
                    ,@acLnkKey
                    ,@anUserIns
                    ,@adTimeIns
                    ,@anUserChg
                    ,@adTimeChg)`;

export function ImportOrders(props) {
  const { t } = useTranslation();
  const [initialChoice, setInitial] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenData, setIsOpenData] = useState(false);
  const [columns, setColumns] = useState([]);
  const [sql, setSql] = useState("");
  const formattedDatetime = useMemo(
    () => new Date().toISOString().slice(0, 19).replace("T", " "),
    [],
  );

  const columns_position = useMemo(
    () => [
      {
        Name: "acKey",
        Database: "String",
        default: "",
        required: true,
        friendly: trHeader("Številka naročila", t),
      },
      {
        Name: "anNo",
        Database: "Int32",
        default: 0,
        required: true,
        friendly: trHeader("Pozicija", t),
      },
      {
        Name: "acIdent",
        Database: "String",
        default: "",
        required: true,
        friendly: trHeader("Ident", t),
      },
      {
        Name: "acSerialNo",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Serijska številka", t),
      },
      {
        Name: "anQty",
        Database: "Decimal",
        default: 0,
        required: false,
        friendly: trHeader("Količina", t),
      },
      {
        Name: "acNote",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Opomba", t),
      },
      {
        Name: "anUserIns",
        Database: "Int32",
        default: "1",
        required: false,
        friendly: trHeader("Upisal", t),
      },
      {
        Name: "adTimeIns",
        Database: "DateTime",
        default: formattedDatetime,
        required: false,
        friendly: trHeader("Datum", t),
      },
    ],
    [t, formattedDatetime],
  );

  const columns_head = useMemo(
    () => [
      {
        Name: "acType",
        Database: "String",
        default: "",
        required: true,
        friendly: trHeader("Tip", t),
      },
      {
        Name: "acDocType",
        Database: "String",
        default: "",
        required: true,
        friendly: trHeader("Tip dokumenta", t),
      },
      {
        Name: "adDate",
        Database: "DateTime",
        default: "",
        required: false,
        friendly: trHeader("Datum", t),
      },
      {
        Name: "acKey",
        Database: "String",
        default: "",
        required: true,
        friendly: trHeader("Številka naročila", t),
      },
      {
        Name: "acDoc1",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Dokument 1", t),
      },
      {
        Name: "adDatedoc1",
        Database: "DateTime",
        default: "kos",
        required: false,
        friendly: trHeader("Datum dokumenta 1", t),
      },
      {
        Name: "acReceiver",
        Database: "String",
        default: "1",
        required: false,
        friendly: trHeader("Sprejemnik", t),
      },
      {
        Name: "acIssuer",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Izdajatelj", t),
      },
      {
        Name: "acWarehouse",
        Database: "String",
        default: "N",
        required: false,
        friendly: trHeader("Skladišče", t),
      },
      {
        Name: "acStatus",
        Database: "String",
        default: "T",
        required: false,
        friendly: trHeader("Status", t),
      },
      {
        Name: "acNote",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Opomba", t),
      },
      {
        Name: "acLnkKey",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Povezovalni dokument", t),
      },
      {
        Name: "anUserIns",
        Database: "Int32",
        default: "",
        required: false,
        friendly: trHeader("Uporabnik ki je vpisal", t),
      },
      {
        Name: "adTimeIns",
        Database: "DateTime",
        default: "",
        required: false,
        friendly: trHeader("Čas", t),
      },
      {
        Name: "anUserChg",
        Database: "Int32",
        default: "",
        required: false,
        friendly: trHeader("Spremenil", t),
      },
      {
        Name: "adTimeChg",
        Database: "DateTime",
        default: "kg",
        required: false,
        friendly: trHeader("Čas spremembe", t),
      },
    ],
    [t],
  );

  useEffect(() => {
    var loader = document.getElementById("loader");

    loader.style.display = "block";
    $(".import").css("display", "none");

    const startActivity = async () => {
      setColumns(columns_position);
      setSql(sql_position);
      loader.style.display = "none";
      $(".import").css("display", "block");
    };

    setTimeout(startActivity, 2000);
  }, [columns_position]);

  const onChoiceReceived = (data) => {
    setInitial(data);

    if (data == "head") {
      setIsOpen(false);
      setIsOpenData(true);
      setColumns(columns_head);
      setSql(sql_head);
    } else {
      setColumns(columns_position);
      setSql(sql_position);
    }
  };

  const closePopup = () => {
    if (initialChoice != "") {
      setIsOpen(false);
    } else {
      Swal.fire(
        i18n.t("common.error"),
        i18n.t("import.mustSelectType"),
        "error",
      );
      setTimeout(window.location.reload(), 1000);
    }
  };
  const openLoader = (state) => {
    if (state) {
      var loader = document.getElementById("loader");
      loader.style.display = "block";
      $(".import").css("display", "none");
    } else {
      var loader = document.getElementById("loader");
      loader.style.display = "none";
      $(".import").css("display", "block");
    }
  };

  return (
    <div>
      <Loader />
      <div className="import orders">
        <Header />
        <ImportOrderChoice
          onChosen={onChoiceReceived}
          isOpen={isOpen}
          onClose={closePopup}
        />
        <ImportWizzard loader={openLoader} columns={columns} sql={sql} />
        <Footer />
      </div>
    </div>
  );
}
