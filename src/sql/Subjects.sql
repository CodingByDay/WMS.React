-- tHE_SetSubj - �ifrant subjektov

SELECT [acSubject] -- �ifra subjekta
      ,[acBuyer] -- kupec
      ,[acSupplier] -- dobavitelj
      ,[acWarehouse] -- skladi��e
      ,[acName2] -- naziv
      ,[acAddress] -- naslov
      ,[acPost] -- po�ta 
      ,[acCountry] -- dr�ava
      ,[acVATCodePrefix] -- predpona dav�ne �tevilke
      ,[acCode] -- dav�na �tevilka
      ,[acRegNo] -- mati�na �tevilka
      ,[acActive] -- aktiven
      ,[uWMSStock] -- vodena zaloga na skladi��u
      ,[uWMS] -- viden v WMS
      ,[uWMSSubj] -- prevzem brez naro�ila
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
   SET [acSubject] = <acSubject, varchar(30),>
      ,[acBuyer] = <acBuyer, char(1),>
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


