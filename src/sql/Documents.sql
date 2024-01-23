-- tPA_SetDocType - šifrant vrst dokumenta

-- trenutno ne bomo dali proizvodnje zato je vse v vezi z namenom D zakomentirano
SELECT [acDocType] -- vrata dokumenta
      ,[acSetOf] -- namen dokuenta: /*D = delovni nalog,*/ F = blagovni, N = naroèilo, X = default
      ,[acType] -- varianta vrste dokumenta: 
				--F: blagovni -> E - medskladišènica, I = izdaja iz skladišèa, N = popis inventure, P = prevzem na skladišèe
				--N: naroèilo -> P = prodaja, I = nakup (pazi ravno obratno je kot na blagovnem!!!)
      ,[acName] -- naziv
      ,[acIssuer] -- privzeto izdajno skladišèe
      ,[acReceiver] -- privzeto prevzemno skladišèe
      ,[adTimeIns] -- èas vpisa <samodejno>
      ,[adTimeChg] -- èas spremembe <samodejno>
      ,[anUserChg] -- uporabnik, ki je izvedel spremembo
      ,[anUserIns] -- uporabnik, ki je izvedel vpis
      ,[acWarehouse] -- privzeto skladišèe -> select acSubject, acName2 from tHE_SetSubj where acWarehouse = 'T' 
      ,[anQId]
       ,[uWMSAcqDocType] -- vrsta dokumenta prevzema ki nastane - uporablja se pri namenu N ob varianti I -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F and acType = 'I'
      ,[uWMSIssueDocType] -- vrsta dokumenta izdaje ki nastane - uporablja se pri namenu N ob varianti P -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F and acType = 'I'
      ,[uWMS] -- ali je dokument viden v WMS
      ,[uWMSPartiallyFinishStatus] -- status delno zakljuèenega dokumenta -> select acStatus, acName from tPA_SetDocTypeStat where acDocType = <trenutni acDocType>
      ,[uWMSFinishStatus] -- status zakljuèenega dokumenta
     /*,[acDocTypeRef] -- vrsta dokumenta prevzema iz proizvodnje - se uporablja pri namenu D -> select acDocType, acName from tPA_SetDocType where acSetOf = 'F' and acType = 'I'
      ,[acDocTypeWaste] -- vrsta dokumenta odpadka iz proizvodnje - se uporablja pri namenu D -> -||-
      ,[uWMSEntryControl] -- ali je pri WMS aktivna vhodna kontrola
      ,[uWMSCoop] -- ali je proizvodnja pri kooperantu
      ,[uWMSWOIssueWork] -- dokument vnose porabe dela pri namenu D
      ,[uWMSWOReceiving] -- dokument prevzema pri namenu D
      ,[uWMSFinishDoc] -- dokument izdaje izdelka pri namenu D
      ,[uWMSWOIssueMat] -- dokument porabe materiala pri namenu D*/
  FROM [dbo].[tPA_SetDocType]

GO

INSERT INTO [dbo].[tPA_SetDocType]
           ([acDocType]
           ,[acSetOf]
           ,[acType]
           ,[acName]
           ,[acIssuer]
           ,[acReceiver]
           ,[anUserIns]
           ,[acWarehouse]
           ,[uWMSAcqDocType]
           ,[uWMSIssueDocType]
           ,[uWMS]
           ,[uWMSPartiallyFinishStatus]
           ,[uWMSFinishStatus])
     VALUES
           (<acDocType, char(4),>
           ,<acSetOf, char(1),>
           ,<acType, char(1),>
           ,<acName, varchar(40),>
           ,<acIssuer, varchar(30),>
           ,<acReceiver, varchar(30),>
           ,<anUserIns, int,>
           ,<acWarehouse, varchar(30),>
           ,<uWMSAcqDocType, char(4),>
           ,<uWMSIssueDocType, char(4),>
           ,<uWMS, bit,>
           ,<uWMSPartiallyFinishStatus, char(5),>
           ,<uWMSFinishStatus, char(5),>
GO

UPDATE [dbo].[tPA_SetDocType]
   SET [acDocType] = <acDocType, char(4),>
      ,[acSetOf] = <acSetOf, char(1),>
      ,[acType] = <acType, char(1),>
      ,[acName] = <acName, varchar(40),>
      ,[acIssuer] = <acIssuer, varchar(30),>
      ,[acReceiver] = <acReceiver, varchar(30),>
      ,[anUserChg] = <anUserChg, int,>
      ,[acWarehouse] = <acWarehouse, varchar(30),>
      ,[uWMSAcqDocType] = <uWMSAcqDocType, char(4),>
      ,[uWMSIssueDocType] = <uWMSIssueDocType, char(4),>
      ,[uWMS] = <uWMS, bit,>
      ,[uWMSPartiallyFinishStatus] = <uWMSPartiallyFinishStatus, char(5),>
      ,[uWMSFinishStatus] = <uWMSFinishStatus, char(5),>
 WHERE anQid = 
GO

