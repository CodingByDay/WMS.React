INSERT INTO [dbo].[tHE_SetSubj]
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
           (<acSubject, varchar(30),> --šifra - obvezno
           ,<acBuyer, char(1),> -- ali je kupec T/F - privzeto F
           ,<acSupplier, char(1),> -- ali je dobavitelj T/F - privzeto F
           ,<acWarehouse, char(1),> -- ali je skladišče T/F - privzeto F
           ,<acName2, varchar(255),> -- opcijsko naziv
           ,<acAddress, varchar(256),> -- opcijsko naslov
           ,<acPost, varchar(13),> -- opcijsko poštna številka
           ,<acCountry, varchar(60),> -- opcijsko cržava - privzeto ''
           ,<acVATCodePrefix, varchar(3),> -- opcijsko predpona davčne - privzeto ''
           ,<acCode, char(20),> -- opcijsko davčna številka
           ,<acRegNo, char(20),> -- opcijsko matična številka
           ,<acActive, char(1),> -- aktiven T/F - privzeto 'T'
           ,<anUserIns, int,> -- 0
           ,<uWMSStock, bit,> -- če je skladišče 1 sicer 0
           ,<uWMS, bit,> -- 1
           ,<uWMSSubj, bit,>) -- 1