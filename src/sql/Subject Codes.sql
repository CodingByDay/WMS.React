-- tHE_SetItemExtItemSubj - kode subjektov

SELECT [acIdent] -- ident <SELECT acIdent, acName FROM tHE_SetItem>
      ,[acSubject] -- subjekt <SELECT acSubject, acName2, acAddress, acPost, acCounty FROM tHE_SetSubject>
      ,[acCode] -- subjektova črtna koda identa
      ,[adTimeIns] -- čas vpisa <samodejno>
      ,[anUserIns] -- uporabnik, ki je izvedel vpis
      ,[adTimeChg] -- čas spremembe <samodejno>
      ,[anUserChg] -- uporabnik, ki je izvedel spremembo
      ,[anQId] -- autoincrement ID zapisa <samodejno>
      ,[uWMSSerialNoBatch] -- koliko je število kosov (osnovna enota mere identa) v pakiranju <1 = default>
  FROM [dbo].[tHE_SetItemExtItemSubj]

GO




INSERT INTO [dbo].[tHE_SetItemExtItemSubj]
           ([acIdent]
           ,[acSubject]
           ,[acCode]
           ,[anUserIns]
           ,[uWMSSerialNoBatch])
     VALUES
           (<acIdent, varchar(16),>
           ,<acSubject, varchar(30),>
           ,<acCode, varchar(100),>
           ,<anUserIns, int,> -- številka prijavljenega uporabnika
           ,<uWMSSerialNoBatch, int,>)
GO

UPDATE [dbo].[tHE_SetItemExtItemSubj]
   SET [acIdent] = '@acIdent'
      ,[acSubject] = '@acSubject'
      ,[acCode] = '@acCode'
      ,[anUserChg] = @user
      ,[uWMSSerialNoBatch] = <uWMSSerialNoBatch, int,>
 WHERE [anQId] = 
GO