import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import ImportWizzard from "./ImportWizzard";
import Loader from "../loader/Loader";
import $ from 'jquery'; 
export function ImportSubjects(props) {




    const openLoader = (state) => {
        if(state) {
            var loader = document.getElementById("loader");
            loader.style.display = "block";
            $(".import").css ("display", "none");
        } else {
            var loader = document.getElementById("loader");
            loader.style.display = "none";
            $(".import").css ("display", "block");
        }
    }

    var columns = [{ Name: 'acSubject', Database: 'String', default: '', required: true }, 
                   { Name: 'acBuyer', Database: 'String', default: 'F', required: false}, 
                   { Name: 'acSupplier', Database: 'String', default: 'F', required: false}, 
                   { Name: 'acWarehouse', Database: 'String', default: 'F', required: false},
                   { Name: 'acName2', Database: 'String', default: '', required: false},
                   { Name: 'acAddress', Database: 'String', default: '', required: false},
                   { Name: 'acPost', Database: 'String', default: '', required: false},
                   { Name: 'acCountry', Database: 'String', default: '', required: false},
                   { Name: 'acVATCodePrefix', Database: 'String', default: '', required: false},
                   { Name: 'acCode', Database: 'String', default: 'F', required: false},
                   { Name: 'acRegNo', Database: 'String', default: 'F', required: false},
                   { Name: 'acActive', Database: 'String', default: 'T', required: false},
                   { Name: 'anUserIns', Database: 'Int32', default: '0', required: false},
                   { Name: 'uWMSStock', Database: 'Boolean', default: '1', required: false},
                   { Name: 'uWMS', Database: 'Boolean', default: '1', required: false},
                   { Name: 'uWMSSubj', Database: 'Boolean', default: '1', required: false},
               
                ]


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
                ,@uWMSSubj`
    

    return (
        <div>
                <Loader />
      
        <div className="import subjects">
            <Header />


                <ImportWizzard loader = {openLoader} columns = {columns} sql = {sql} />


            <Footer />
        </div>

        </div>


    );
}