INSERT INTO [dbo].[uWMSOrderItem]
           ([acKey]
           ,[anNo]
           ,[acIdent]
           ,[acSerialNo]
           ,[anQty]
           ,[acNote]
           ,[anUserIns]
           ,[adTimeIns])
     VALUES
           (<acKey, varchar(13),>
           ,<anNo, int,>
           ,<acIdent, varchar(16),>
           ,<acSerialNo, varchar(50),>
           ,<anQty, decimal(19,6),>
           ,<acNote, varchar(1000),>
           ,<anUserIns, int,>
           ,<adTimeIns, datetime,>)
GO