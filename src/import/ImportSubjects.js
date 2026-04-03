import { useMemo } from "react";
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import ImportWizzard from "./ImportWizzard";
import Loader from "../loader/Loader";
import $ from "jquery";
import { useTranslation } from "react-i18next";
import { trHeader } from "../i18n/headerMap";

export function ImportSubjects(props) {
  const { t } = useTranslation();

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

  const columns = useMemo(
    () => [
      {
        Name: "acSubject",
        Database: "String",
        default: "",
        required: true,
        hasDependency: false,
        friendly: trHeader("Šifra", t),
      },
      {
        Name: "acBuyer",
        Database: "String",
        default: "F",
        required: false,
        hasDependency: false,
        friendly: trHeader("Kupec", t),
      },
      {
        Name: "acSupplier",
        Database: "String",
        default: "F",
        required: false,
        hasDependency: false,
        friendly: trHeader("Dobavitelj", t),
      },
      {
        Name: "acWarehouse",
        Database: "String",
        default: "F",
        required: false,
        hasDependency: false,
        friendly: trHeader("Skladišče", t),
      },
      {
        Name: "acName2",
        Database: "String",
        default: "",
        required: false,
        hasDependency: false,
        friendly: trHeader("Naziv", t),
      },
      {
        Name: "acAddress",
        Database: "String",
        default: "",
        required: false,
        hasDependency: false,
        friendly: trHeader("Naslov", t),
      },
      {
        Name: "acPost",
        Database: "String",
        default: "",
        required: false,
        hasDependency: false,
        friendly: trHeader("Poštna številka", t),
      },
      {
        Name: "acCountry",
        Database: "String",
        default: "",
        required: false,
        hasDependency: false,
        friendly: trHeader("Država", t),
      },
      {
        Name: "acVATCodePrefix",
        Database: "String",
        default: "",
        required: false,
        hasDependency: false,
        friendly: trHeader("Predpona", t),
      },
      {
        Name: "acCode",
        Database: "String",
        default: "F",
        required: false,
        hasDependency: false,
        friendly: trHeader("Davčna številka", t),
      },
      {
        Name: "acRegNo",
        Database: "String",
        default: "F",
        required: false,
        hasDependency: false,
        friendly: trHeader("Matična številka", t),
      },
      {
        Name: "acActive",
        Database: "String",
        default: "T",
        required: false,
        hasDependency: false,
        friendly: trHeader("Aktiven", t),
      },
      {
        Name: "anUserIns",
        Database: "Int32",
        default: "0",
        required: false,
        hasDependency: false,
        friendly: trHeader("Vpisal", t),
      },
      {
        Name: "uWMSStock",
        Database: "Boolean",
        default: "1",
        required: false,
        hasDependency: true,
        dependency: {
          dependedOn: "acWarehouse",
          valueIfDependencySame: true,
          dependencySameAs: "T",
          else: false,
          friendly: trHeader("Zaloga", t),
        },
      },
      {
        Name: "uWMS",
        Database: "Boolean",
        default: "1",
        required: false,
        hasDependency: false,
        friendly: trHeader("Viden", t),
      },
      {
        Name: "uWMSSubj",
        Database: "Boolean",
        default: "1",
        required: false,
        hasDependency: false,
        friendly: trHeader("Subjekt", t),
      },
    ],
    [t],
  );

  var sql = ` INSERT INTO [dbo].[tHE_SetSubj]
                ([acSubject]
                ,[acBuyer]
                ,[acSupplier]
                ,[acWarehouse]
                ,[acName2]
                ,[acAddress]
                ,[acPost]
                ,[acCountry]
                ,[acVATCodePrefix]
                ,[acCode]
                ,[acRegNo]
                ,[acActive]
                ,[anUserIns]
                ,[uWMSStock]
                ,[uWMS]
                ,[uWMSSubj])
            VALUES
                (@acSubject
                ,@acBuyer
                ,@acSupplier
                ,@acWarehouse
                ,@acName2
                ,@acAddress
                ,@acPost
                ,@acCountry
                ,@acVATCodePrefix
                ,@acCode
                ,@acRegNo
                ,@acActive
                ,@anUserIns
                ,@uWMSStock
                ,@uWMS
                ,@uWMSSubj)`;

  return (
    <div>
      <Loader />

      <div className="import subjects">
        <Header />

        <ImportWizzard loader={openLoader} columns={columns} sql={sql} />

        <Footer />
      </div>
    </div>
  );
}
