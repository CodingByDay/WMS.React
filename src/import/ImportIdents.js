import { useMemo } from "react";
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import ImportWizzard from "./ImportWizzard";
import Loader from "../loader/Loader";
import $ from "jquery";
import { useTranslation } from "react-i18next";
import { trHeader } from "../i18n/headerMap";

export function ImportIdents(props) {
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
        Name: "acIdent",
        Database: "String",
        default: "",
        required: true,
        friendly: trHeader("Šifra identa", t),
      },
      {
        Name: "acName",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Naziv", t),
      },
      {
        Name: "acCode",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("EAN koda", t),
      },
      {
        Name: "acSetOfItem",
        Database: "String",
        default: "200",
        required: false,
        friendly: trHeader("Tip identa", t),
      },
      {
        Name: "acSupplier",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Dobavitelj", t),
      },
      {
        Name: "acUM",
        Database: "String",
        default: "kos",
        required: false,
        friendly: trHeader("Primarna enota", t),
      },
      {
        Name: "anUMToUM2",
        Database: "String",
        default: "1",
        required: false,
        friendly: trHeader("Pretvornik", t),
      },
      {
        Name: "acUM2",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Sekundardna", t),
      },
      {
        Name: "acSerialNo",
        Database: "String",
        default: "N",
        required: false,
        friendly: trHeader("Tip serijske številke", t),
      },
      {
        Name: "acActive",
        Database: "String",
        default: "T",
        required: false,
        friendly: trHeader("Ali je aktiven", t),
      },
      {
        Name: "anDimHeight",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Višina", t),
      },
      {
        Name: "anDimWidth",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Širina", t),
      },
      {
        Name: "anDimDepth",
        Database: "String",
        default: "",
        required: false,
        friendly: trHeader("Globina", t),
      },
      {
        Name: "anDimWeight",
        Database: "Int32",
        default: "",
        required: false,
        friendly: trHeader("Teža", t),
      },
      {
        Name: "anDimWeightBrutto",
        Database: "Int32",
        default: "",
        required: false,
        friendly: trHeader("Teža bruto", t),
      },
      {
        Name: "acUMDim1",
        Database: "Boolean",
        default: "",
        required: false,
        friendly: trHeader("Enota mere dolžine", t),
      },
      {
        Name: "acUMDim2",
        Database: "Boolean",
        default: "kg",
        required: false,
        friendly: trHeader("Enota more teže", t),
      },
      {
        Name: "anUserIns",
        Database: "Boolean",
        default: "0",
        required: false,
        friendly: trHeader("Številka naročila", t),
      },
      {
        Name: "uWMS",
        Database: "Boolean",
        default: "1",
        required: false,
        friendly: trHeader("Številka naročila", t),
      },
    ],
    [t],
  );

  var sql = `  INSERT INTO [dbo].[tHE_SetItem]
                ([acIdent] -- šifra identa
                ,[acName] -- opcijsko naziv
                ,[acCode] -- opcijsko EAN koda
                ,[acSetOfItem] -- tip identa - privzeto '200'
                ,[acSupplier] -- dobavitelj - privzeto ''
                ,[acUM] -- primarna enota mere - privzeto 'kos'
                ,[anUMToUM2] -- pretvornik iz UM1 v UM2 - privzeto 1
                ,[acUM2] -- sekundarna enota mere - privzeto ''
                ,[acSerialNo] -- tip serijske številke - privzeto 'N'
                ,[acActive] -- ali je ident aktiven T/F - privzeto 'T'
                ,[anDimHeight] -- opcijsko višina
                ,[anDimWidth] -- opcijsko širina
                ,[anDimDepth] -- opcijsko globina
                ,[anDimWeight] -- opcijsko teža
                ,[anDimWeightBrutto] -- opcijsko bruto teža
                ,[acUMDim1] -- enota mere dolžine - privzeto 'm'
                ,[acUMDim2] -- enota mere teže - privzeto 'kg'
                ,[anUserIns] -- uporabnik, ki je vpisal - privzeto 0
                ,[uWMS]) -- privzeto 1

            VALUES
                (@acIdent
                ,@acName
                ,@acCode
                ,@acSetOfItem
                ,@acSupplier
                ,@acUM
                ,@anUMToUM2
                ,@acUM2
                ,@acSerialNo
                ,@acActive
                ,@anDimHeight
                ,@anDimWidth
                ,@anDimDepth
                ,@anDimWeight
                ,@anDimWeightBrutto
                ,@acUMDim1
                ,@acUMDim2
                ,@anUserIns
                ,@uWMS)`;

  return (
    <div>
      <Loader />

      <div className="import idents">
        <Header />

        <ImportWizzard loader={openLoader} columns={columns} sql={sql} />

        <Footer />
      </div>
    </div>
  );
}
