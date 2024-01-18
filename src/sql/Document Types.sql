-- tPA_SetDocTypeStat - satatusi vrst dokumenta

SELECT [acDocType] -- vrsta dokumenta <SELECT acDocType, acName FROM tPA_SetDocType>
      ,[acStatus] -- koda statusa
      ,[acName] -- naziv statusa
      ,[adTimeIns] -- čas vpisa <samodejno>
      ,[adTimeChg] -- čas spremembe <samodejno>
      ,[anUserChg] -- uporabnik, ki je izvedel spremembo
      ,[anUserIns] -- uporabnik, ki je izvedel vpis
      ,[anQId] -- <samodejno>
      ,[uWMSShow] -- ali je viden status dokumenta
  FROM [dbo].[tPA_SetDocTypeStat]

GO


INSERT INTO [dbo].[tPA_SetDocTypeStat]
           ([acDocType]
           ,[acStatus]
           ,[acName]
           ,[anUserIns]
           ,[uWMSShow])
     VALUES
           (<acDocType, char(4),>
           ,<acStatus, char(1),>
           ,<acName, varchar(20),>
           ,<anUserIns, int,> -- številka prijavljenega uporabnika
           ,<uWMSShow, bit,>)
GO

UPDATE [dbo].[tPA_SetDocTypeStat]
   SET [acDocType] = <acDocType, char(4),>
      ,[acStatus] = <acStatus, char(1),>
      ,[acName] = <acName, varchar(20),>
      ,[anUserChg] = <anUserChg, int,> -- številka prijavljenega uporabnika
      ,[uWMSShow] = <uWMSShow, bit,>
 WHERE [anQId] = 
GO