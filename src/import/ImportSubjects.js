import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import ImportWizzard from "./ImportWizzard";
import Loader from "../loader/Loader";
import $ from "jquery";
export function ImportSubjects(props) {
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

  const userId = localStorage.getItem("name");
  const userIdAsInt = parseInt(userId, 10);
  var columns = [
    {
      Name: "acSubject",
      Database: "String",
      default: "",
      required: true,
      hasDependency: false,
      friendly: "Šifra",
    },
    {
      Name: "acBuyer",
      Database: "String",
      default: "F",
      required: false,
      hasDependency: false,
      friendly: "Kupec",
    },
    {
      Name: "acSupplier",
      Database: "String",
      default: "F",
      required: false,
      hasDependency: false,
      friendly: "Dobavitelj",
    },
    {
      Name: "acWarehouse",
      Database: "String",
      default: "F",
      required: false,
      hasDependency: false,
      friendly: "Skladišče",
    },
    {
      Name: "acName2",
      Database: "String",
      default: "",
      required: false,
      hasDependency: false,
      friendly: "Naziv",
    },
    {
      Name: "acAddress",
      Database: "String",
      default: "",
      required: false,
      hasDependency: false,
      friendly: "Naslov",
    },
    {
      Name: "acPost",
      Database: "String",
      default: "",
      required: false,
      hasDependency: false,
      friendly: "Poštna številka",
    },
    {
      Name: "acCountry",
      Database: "String",
      default: "",
      required: false,
      hasDependency: false,
      friendly: "Država",
    },
    {
      Name: "acVATCodePrefix",
      Database: "String",
      default: "",
      required: false,
      hasDependency: false,
      friendly: "Predpona",
    },
    {
      Name: "acCode",
      Database: "String",
      default: "F",
      required: false,
      hasDependency: false,
      friendly: "Davčna številka",
    },
    {
      Name: "acRegNo",
      Database: "String",
      default: "F",
      required: false,
      hasDependency: false,
      friendly: "Matična številka",
    },
    {
      Name: "acActive",
      Database: "String",
      default: "T",
      required: false,
      hasDependency: false,
      friendly: "Aktiven",
    },
    {
      Name: "anUserIns",
      Database: "Int32",
      default: "0",
      required: false,
      hasDependency: false,
      friendly: "Vpisal",
    },
    {
      Name: "uWMSStock",
      Database: "Boolean",
      default: "1",
      required: false,
      hasDependency: true,
      dependency: {
        // This is the object for dependent field. Follow the convention.
        dependedOn: "acWarehouse",
        valueIfDependencySame: true,
        dependencySameAs: "T",
        else: false,
        friendly: "Zaloga",
      },
    },
    {
      Name: "uWMS",
      Database: "Boolean",
      default: "1",
      required: false,
      hasDependency: false,
      friendly: "Viden",
    },
    {
      Name: "uWMSSubj",
      Database: "Boolean",
      default: "1",
      required: false,
      hasDependency: false,
      friendly: "Subjekt",
    },
  ];

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
