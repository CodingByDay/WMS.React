import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import React, { useState, useEffect } from 'react';
import ImportOrderChoice from "./ImportOrderChoice";
import ImportWizzard from "./ImportWizzard";
import $ from 'jquery'; 
import Loader from "../loader/Loader";

export function ImportOrders(props) {

    const [initialChoice, setInitial] = useState("");
    const [isOpen, setIsOpen] = useState(false);

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

      };


      var columns = [{ Name: 'acIdent', Database: 'String', default: '', required: true }, 
      { Name: 'acName', Database: 'String', default: '', required: false}, 
      { Name: 'acCode', Database: 'String', default: '', required: false}, 
      { Name: 'acSetOfItem', Database: 'String', default: '200', required: false}, 
      { Name: 'acSupplier', Database: 'String', default: '', required: false},
      { Name: 'acUM', Database: 'String', default: 'kos', required: false},
      { Name: 'anUMToUM2', Database: 'String', default: '1', required: false},
      { Name: 'acUM2', Database: 'String', default: '', required: false},
      { Name: 'acSerialNo', Database: 'String', default: 'N', required: false},
      { Name: 'acActive', Database: 'String', default: 'T', required: false},
      { Name: 'anDimHeight', Database: 'String', default: '', required: false},
      { Name: 'anDimWidth', Database: 'String', default: '', required: false},
      { Name: 'anDimDepth', Database: 'String', default: '', required: false},
      { Name: 'anDimWeightBrutto', Database: 'Int32', default: '', required: false},
      { Name: 'acUMDim1', Database: 'Boolean', default: '', required: false},
      { Name: 'acUMDim2', Database: 'Boolean', default: 'kg', required: false},
      { Name: 'anUserIns', Database: 'Boolean', default: '0', required: false},
      { Name: 'uWMS', Database: 'Boolean', default: '1', required: false},
   ]


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
                    ,@uWMS)`


    const closePopup = () => {
        setIsOpen(false);
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
    return (
        <div>
        <Loader />
        <div className="import orders">
        <Header />
                
            <ImportOrderChoice onChosen = {onChoiceReceived} isOpen={isOpen} onClose={closePopup} />





            <ImportWizzard loader = {openLoader} columns = {columns} sql = {sql} />



            <Footer />
        </div>



        </div>
    );
}