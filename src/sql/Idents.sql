-- tHE_SetItem - Šifrant identov

SELECT [acIdent] -- Šifra identa
      ,[acName] -- Naziv
      ,[acCode] -- EAN koda
      ,[acSetOfItem] -- Tip identa -> SELECT acSetOfItem, acName FROM tHE_SetItemType
      ,[acSupplier] -- Dobavitelj -> SELECT acSubject, acName2 FROM tHE_SetSubj where acSupplier = 'T'
      ,[acUM] -- Primarna enota mere -> SELECT acUM, acName FROM tHE_SetUM
      ,[anUMToUM2] -- Pretvornik iz UM1 v UM2
      ,[acUM2] -- Sekundarna enota mere -> SELECT acUM, acName FROM tHE_SetUM
      ,[acSerialNo] -- tip serijske številke -> 'N' - ni vodeno; 'S' - 1 serijska 1 kos; '
      ,[acActive] -- ali je ident aktiven
      ,[anDimHeight] -- višina
      ,[anDimWidth] -- širina
      ,[anDimDepth] -- globina
      ,[anDimWeight] -- teža
      ,[anDimWeightBrutto] -- bruto teža
      ,[acUMDim1] -- enota mere dolžine -> SELECT acUM, acName FROM tHE_SetUM
      ,[acUMDim2] -- enota mere teže -> SELECT acUM, acName FROM tHE_SetUM
      ,[uWMS] -- ali je vidno v WMS
FROM [dbo].[tHE_SetItem]



{
      Header: 'Vrsta izdaje',
      accessor: 'uWMSIssueDocType',
      className: 'name-column-system',
      type: 'dropdown',
      sourceSelect: `SELECT acDocType, acName FROM tPA_SetDocType WHERE acSetOf = 'F' and acType = 'P'`,
      columnOrder: ['acDocType', 'acName'],
      columnOrderTranslation: ['Vrsta dokumenta', 'Naziv'],
      columnOrderWidth: [200, 300],
      dropdownId: 'acDocType',
      dropdownPlaceholder: '',
      dropdownHelperField: 'acName',
      dbType: 'String'
    },



GO

INSERT INTO [dbo].[tHE_SetItem]
           ([acIdent]
           ,[acName]
           ,[acCode]
           ,[acSetOfItem]
           ,[acSupplier]
           ,[acUM]
           ,[anUMToUM2]
           ,[acUM2]
           ,[acSerialNo]
           ,[acActive]
           ,[anDimHeight]
           ,[anDimWidth]
           ,[anDimDepth]
           ,[anDimWeight] 
           ,[anDimWeightBrutto] 
           ,[acUMDim1]
           ,[acUMDim2]
           ,[anUserIns] -- uporabnik, ki je vpisal
           ,[uWMS])

     VALUES
           (<acIdent, varchar(16),>
           ,<acName, varchar(80),>
           ,<acCode, varchar(50),>
           ,<acSetOfItem, varchar(3),>
           ,<acSupplier, varchar(30),>
           ,<acUM, varchar(3),>
           ,<anUMToUM2, decimal(19,6),>
           ,<acUM2, varchar(3),>
           ,<acSerialNo, char(1),>
           ,<acActive, char(1),>
           ,<anDimHeight, decimal(19,6),>
           ,<anDimWidth, decimal(19,6),>
           ,<anDimDepth, decimal(19,6),>
           ,<anDimWeight, decimal(19,6),>
           ,<anDimWeightBrutto, decimal(19,6),>
           ,<acUMDim1, varchar(3),>
           ,<acUMDim2, varchar(3),>
           ,<anUserIns, int,>
           ,<uWMS, bit,>)
GO

UPDATE [dbo].[tHE_SetItem]
   SET [acIdent] = <acIdent, varchar(16),>
      ,[acName] = <acName, varchar(80),>
      ,[acCode] = <acCode, varchar(50),>
      ,[acSetOfItem] = <acSetOfItem, varchar(3),>
      ,[acSupplier] = <acSupplier, varchar(30),>
      ,[acUM] = <acUM, varchar(3),>
      ,[anUMToUM2] = <anUMToUM2, decimal(19,6),>
      ,[acUM2] = <acUM2, varchar(3),>
      ,[acSerialNo] = <acSerialNo, char(1),>
      ,[acActive] = <acActive, char(1),>
      ,[anDimHeight] = <anDimHeight, decimal(19,6),>
      ,[anDimWidth] = <anDimWidth, decimal(19,6),>
      ,[anDimDepth] = <anDimDepth, decimal(19,6),>
      ,[anDimWeight] = <anDimWeight, decimal(19,6),>
      ,[anDimWeightBrutto] = <anDimWeightBrutto, decimal(19,6),>
      ,[acUMDim1] = <acUMDim1, varchar(3),>
      ,[acUMDim2] = <acUMDim2, varchar(3),>
      ,[anUserChg] = <anUserChg, int,>
      ,[uWMS] = <uWMS, bit,>
 WHERE anQid = 
GO

