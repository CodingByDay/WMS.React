-- tHE_SetSubj - šifrant subjektov


SELECT [acSubject] -- šifra subjekta
      ,[acBuyer] -- kupec
      ,[acSupplier] -- dobavitelj
      ,[acWarehouse] -- skladišče
      ,[acName2] -- naziv
      ,[acAddress] -- naslov
      ,[acPost] -- pošta 
      ,[acCountry] -- država
      ,[acVATCodePrefix] -- predpona davčne številke
      ,[acCode] -- davčna številka
      ,[acRegNo] -- matična številka
      ,[acActive] -- aktiven
      ,[uWMSStock] -- vodena zaloga na skladišču
      ,[uWMS] -- viden v WMS
      ,[uWMSSubj] -- prevzem brez naročila
FROM [dbo].[tHE_SetSubj]



GO

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
           (<acSubject, varchar(30),>
           ,<acBuyer, char(1),>
           ,<acSupplier, char(1),>
           ,<acWarehouse, char(1),>
           ,<acName2, varchar(255),>
           ,<acAddress, varchar(256),>
           ,<acPost, varchar(13),>
           ,<acCountry, varchar(60),>
           ,<acVATCodePrefix, varchar(3),>
           ,<acCode, char(20),>
           ,<acRegNo, char(20),>
           ,<acActive, char(1),>
           ,<anUserIns, int,>
           ,<uWMSStock, bit,>
           ,<uWMS, bit,>
           ,<uWMSSubj, bit,>)
GO

UPDATE [dbo].[tHE_SetSubj]
      ,[acBuyer] = <acBuyer, char(30),>
      ,[acSupplier] = <acSupplier, char(1),>
      ,[acWarehouse] = <acWarehouse, char(1),>
      ,[acName2] = <acName2, varchar(255),>
      ,[acAddress] = <acAddress, varchar(256),>
      ,[acPost] = <acPost, varchar(13),>
      ,[acCountry] = <acCountry, varchar(60),>
      ,[acVATCodePrefix] = <acVATCodePrefix, varchar(3),>
      ,[acCode] = <acCode, char(20),>
      ,[acRegNo] = <acRegNo, char(20),>
      ,[acActive] = <acActive, char(1),>
      ,[anUserChg] = <anUserChg, int,>
      ,[uWMSStock] = <uWMSStock, bit,>
      ,[uWMS] = <uWMS, bit,>
      ,[uWMSSubj] = <uWMSSubj, bit,>
 WHERE anQid = 
GO


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