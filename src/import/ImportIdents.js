import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import ImportWizzard from "./ImportWizzard";
import Loader from "../loader/Loader";
import $ from "jquery";
export function ImportIdents(props) {
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

  var columns = [
    {
      Name: "acIdent",
      Database: "String",
      default: "",
      required: true,
      friendly: "Šifra identa",
    },
    {
      Name: "acName",
      Database: "String",
      default: "",
      required: false,
      friendly: "Naziv",
    },
    {
      Name: "acCode",
      Database: "String",
      default: "",
      required: false,
      friendly: "EAN koda",
    },
    {
      Name: "acSetOfItem",
      Database: "String",
      default: "200",
      required: false,
      friendly: "Tip identa",
    },
    {
      Name: "acSupplier",
      Database: "String",
      default: "",
      required: false,
      friendly: "Dobavitelj",
    },
    {
      Name: "acUM",
      Database: "String",
      default: "kos",
      required: false,
      friendly: "Primarna enota",
    },
    {
      Name: "anUMToUM2",
      Database: "String",
      default: "1",
      required: false,
      friendly: "Pretvornik",
    },
    {
      Name: "acUM2",
      Database: "String",
      default: "",
      required: false,
      friendly: "Sekundardna",
    },
    {
      Name: "acSerialNo",
      Database: "String",
      default: "N",
      required: false,
      friendly: "Tip serijske številke",
    },
    {
      Name: "acActive",
      Database: "String",
      default: "T",
      required: false,
      friendly: "Ali je aktiven",
    },
    {
      Name: "anDimHeight",
      Database: "String",
      default: "",
      required: false,
      friendly: "Višina",
    },
    {
      Name: "anDimWidth",
      Database: "String",
      default: "",
      required: false,
      friendly: "Širina",
    },
    {
      Name: "anDimDepth",
      Database: "String",
      default: "",
      required: false,
      friendly: "Globina",
    },
    {
      Name: "anDimWeight",
      Database: "Int32",
      default: "",
      required: false,
      friendly: "Teža",
    },
    {
      Name: "anDimWeightBrutto",
      Database: "Int32",
      default: "",
      required: false,
      friendly: "Teža bruto",
    },
    {
      Name: "acUMDim1",
      Database: "Boolean",
      default: "",
      required: false,
      friendly: "Enota mere dolžine",
    },
    {
      Name: "acUMDim2",
      Database: "Boolean",
      default: "kg",
      required: false,
      friendly: "Enota more teže",
    },
    {
      Name: "anUserIns",
      Database: "Boolean",
      default: "0",
      required: false,
      friendly: "Številka naročila",
    },
    {
      Name: "uWMS",
      Database: "Boolean",
      default: "1",
      required: false,
      friendly: "Številka naročila",
    },
  ];

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
