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
            setColumns(columns_position);
            setSql(sql_position)
        }
      };

      
      const currentDatetime = new Date();

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
                    (<acType, varchar(2),>
                    ,<acDocType, varchar(4),>
                    ,<adDate, smalldatetime,>
                    ,<acKey, varchar(13),>
                    ,<acDoc1, varchar(35),>
                    ,<adDatedoc1, smalldatetime,>
                    ,<acReceiver, varchar(30),>
                    ,<acIssuer, varchar(30),>
                    ,<acWarehouse, varchar(30),>
                    ,<acStatus, varchar(2),>
                    ,<acNote, varchar(1000),>
                    ,<acLnkKey, varchar(13),>
                    ,<anUserIns, int,>
                    ,<adTimeIns, datetime,>
                    ,<anUserChg, int,>
                    ,<adTimeChg, datetime,>)`



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