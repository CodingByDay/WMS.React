import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import React, { useState, useEffect } from 'react';
import ImportOrderChoice from "./ImportOrderChoice";
import ImportWizzard from "./ImportWizzard";
import $ from 'jquery'; 
import Loader from "../loader/Loader";
import AdditionalOrderInformation from "./AdditionalOrderInformation";
import Swal from 'sweetalert2';


export function ImportOrders(props) {
    const [initialChoice, setInitial] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenData, setIsOpenData] = useState(false);

    const [columns, setColumns] = useState([]);
    const [sql, setSql] = useState("");

    useEffect(() => {

        // Start the loading effect.
        var loader = document.getElementById("loader");

        loader.style.display = "block";
        $(".import").css ("display", "none");

        const startActivity = async () => {
            setIsOpen(true);
            loader.style.display = "none";
            $(".import").css ("display", "block");
        };



        setTimeout(startActivity, 2000);

      }, []);
    

      const onChoiceReceived = (data) => {

        setInitial(data)

        if(data == "head") {
            setIsOpen(false);
            setIsOpenData(true);
            setColumns(columns_head);
            setSql(sql_head);
        } else {
            setColumns(columns_head);
            setSql(sql_head)
        }
      };

      const formattedDatetime = currentDatetime.toLocaleString();
      var columns_position = 
     [{ Name: 'acKey', Database: 'String', default: '', required: true }, 
      { Name: 'anNo', Database: 'Int32', default: '', required: true}, 
      { Name: 'acIdent', Database: 'String', default: '', required: true}, 
      { Name: 'acSerialNo', Database: 'String', default: '', required: false}, 
      { Name: 'anQty', Database: 'Decimal', default: '0', required: false},
      { Name: 'acNote', Database: 'String', default: '', required: false},
      { Name: 'anUserIns', Database: 'Int32', default: '1', required: false},
      { Name: 'adTimeIns', Database: 'DateTime', default: formattedDatetime, required: false}     
     ]


     var columns_head = [{ Name: 'acType', Database: 'String', default: '', required: true }, 
      { Name: 'acDocType', Database: 'String', default: '', required: true}, 
      { Name: 'adDate', Database: 'DateTime', default: '', required: false}, 
      { Name: 'acKey', Database: 'String', default: '', required: true}, 
      { Name: 'acDoc1', Database: 'String', default: '', required: false},
      { Name: 'adDatedoc1', Database: 'DateTime', default: 'kos', required: false},
      { Name: 'acReceiver', Database: 'String', default: '1', required: false},
      { Name: 'acIssuer', Database: 'String', default: '', required: false},
      { Name: 'acWarehouse', Database: 'String', default: 'N', required: false},
      { Name: 'acStatus', Database: 'String', default: 'T', required: false},
      { Name: 'acNote', Database: 'String', default: '', required: false},
      { Name: 'acLnkKey', Database: 'String', default: '', required: false},
      { Name: 'anUserIns', Database: 'Int32', default: '', required: false},
      { Name: 'adTimeIns', Database: 'DateTime', default: '', required: false},
      { Name: 'anUserChg', Database: 'Int32', default: '', required: false},
      { Name: 'adTimeChg', Database: 'DateTime', default: 'kg', required: false}
     ]

     var sql_position = `INSERT INTO [dbo].[uWMSOrderItem]
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
        ,<@anNo
        ,<@acIdent
        ,<@acSerialNo
        ,<@anQty
        ,<@acNote
        ,<@anUserIns
        ,<@adTimeIns)`
    








    var sql_head = `  INSERT INTO [dbo].[tHE_SetItem]
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
        ,@uWMS)`





        


    const closePopup = () => {
        if(initialChoice!="") {
            setIsOpen(false);
        } else {
            Swal.fire('Napaka!', 'Morate izbrati tip uvoza.', 'error');
            setTimeout(window.location.reload(), 1000)
        }
    };
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


    const onChosenDataReceived = (data) => {
        setIsOpenData(false);
    }

    const closePopupData = () => {  
        setIsOpenData(false);
    };


    return (
        <div>
        <Loader />
        <div className="import orders">
        <Header />
                
            <ImportOrderChoice onChosen = {onChoiceReceived} isOpen={isOpen} onClose={closePopup} />
            <AdditionalOrderInformation onChosen={onChosenDataReceived} isOpen={isOpenData} onClose={closePopupData} />




            <ImportWizzard loader = {openLoader} columns = {columns} sql = {sql} />



            <Footer />
        </div>



        </div>
    );
}