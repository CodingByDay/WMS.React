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
    const [currentDocumentType, setDocument] = useState("");
    const [warehouse, setWarehouse] = useState("");



    useEffect(() => {

        // Start the loading effect.
        var loader = document.getElementById("loader");

        loader.style.display = "block";
        $(".import").css ("display", "none");

        const startActivity = async () => {
            setColumns(columns_position);
            setSql(sql_position)
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
            setColumns(columns_position);
            setSql(sql_position)
        }
      };
      
    const currentDatetime = new Date();
    const formattedDatetime = currentDatetime.toLocaleString();

    var columns_position = 
     [
      { Name: 'acKey', Database: 'String', default: '', required: true, friendly: "Številka naročila" }, 
      { Name: 'anNo', Database: 'Int32', default: '', required: true, friendly: "Pozicija"}, 
      { Name: 'acIdent', Database: 'String', default: '', required: true, friendly: "Ident"}, 
      { Name: 'acSerialNo', Database: 'String', default: '', required: false, friendly: "Serijska številka"}, 
      { Name: 'anQty', Database: 'Decimal', default: '0', required: false, friendly: "Količina"},
      { Name: 'acNote', Database: 'String', default: '', required: false, friendly: "Opomba"},
      { Name: 'anUserIns', Database: 'Int32', default: '1', required: false, friendly: "Upisal"},
      { Name: 'adTimeIns', Database: 'DateTime', default: formattedDatetime, required: false, friendly: "Datum"}     
     ]

     var columns_head = [{ Name: 'acType', Database: 'String', default: '', required: true, friendly: "Tip" }, 
      { Name: 'acDocType', Database: 'String', default: '', required: true, friendly: "Tip dokumenta"}, 
      { Name: 'adDate', Database: 'DateTime', default: '', required: false, friendly: "Datum"}, 
      { Name: 'acKey', Database: 'String', default: '', required: true, friendly: "Številka naročila"}, 
      { Name: 'acDoc1', Database: 'String', default: '', required: false, friendly: "Dokument 1"},
      { Name: 'adDatedoc1', Database: 'DateTime', default: 'kos', required: false, friendly: "Datum dokumenta 1"},
      { Name: 'acReceiver', Database: 'String', default: '1', required: false, friendly: "Sprejemnik"},
      { Name: 'acIssuer', Database: 'String', default: '', required: false, friendly: "Izdajatelj"},
      { Name: 'acWarehouse', Database: 'String', default: 'N', required: false, friendly: "Skladišče"},
      { Name: 'acStatus', Database: 'String', default: 'T', required: false, friendly: "Status"},
      { Name: 'acNote', Database: 'String', default: '', required: false, friendly: "Opomba"},
      { Name: 'acLnkKey', Database: 'String', default: '', required: false, friendly: "Povezovalni dokument"},
      { Name: 'anUserIns', Database: 'Int32', default: '', required: false, friendly: "Uporabnik ki je vpisal"},
      { Name: 'adTimeIns', Database: 'DateTime', default: '', required: false, friendly: "Čas"},
      { Name: 'anUserChg', Database: 'Int32', default: '', required: false, friendly: "Spremenil"},
      { Name: 'adTimeChg', Database: 'DateTime', default: 'kg', required: false, friendly: "Čas spremembe"}
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
                        ,@anNo
                        ,@acIdent
                        ,@acSerialNo
                        ,@anQty
                        ,@acNote
                        ,@anUserIns
                        ,@adTimeIns)`
    

    var sql_head = `INSERT INTO [dbo].[uWMSOrderHead]
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
                    ,@adTimeChg)`



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


    const onChosenDataReceived = (chosenType, chosenWarehouse) => {
        setDocument(chosenType);
        setWarehouse(chosenWarehouse);
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
            {/* <AdditionalOrderInformation warehouse = {warehouse} document={currentDocumentType} onChosen={onChosenDataReceived} isOpen={isOpenData} onClose={closePopupData} /> */} 
            <ImportWizzard loader = {openLoader} columns = {columns} sql = {sql} />
            <Footer />
        </div>



        </div>
    );
}