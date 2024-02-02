INSERT INTO [dbo].[tHE_SetItem]
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