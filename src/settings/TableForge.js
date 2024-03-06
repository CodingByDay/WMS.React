import React, { useState, useMemo, useCallback } from "react";
import { MdEdit } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import Swal from "sweetalert2";
import SettingsService from "../services/SettingsService";
import Insert from "../popup/Insert";
import Update from "../popup/Update";
import { FaSearch } from "react-icons/fa"; // Import the search icon
import {
  DataGrid,
  Column,
  SearchPanel,
  FilterRow,
  Selection,
  Button,
  Editing
} from 'devextreme-react/data-grid'
function TableForge({ refresh, name, tableData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [id, setId] = useState({});

  const showDeleteConfirmation = (data) => {
    var currentDeleteSQL = selectedTable.deleteQuery;
    var idType = selectedTable.idType;

    var params = [];
    var parameterId = {
      Name: "anQId",
      Type: idType,
      Value: data[selectedTable.id],
    };
    params.push(parameterId);
    Swal.fire({
      title: "Ste prepričani?",
      text: "To dejanje ni mogoče razveljaviti!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Da, izbriši!",
      cancelButtonText: "Ne",
    }).then((result) => {
      if (result.isConfirmed) {
        SettingsService.insertSQLQuery(currentDeleteSQL, params).then(
          (result) => {
            var data = result;

            if (data) {
              Swal.fire("Izbrisano!", "Zapis je bil pobrisan.", "success");
            } else {
              Swal.fire("Napaka!", "Zapis ni bil pobrisan.", "error");
            }

            setTimeout(refresh, 1000);
          },
        );
      }
    });
  };

  const onDelete = (data) => {
    setId(data[selectedTable.id]);
    showDeleteConfirmation(data);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const onCloseEdit = () => {
    setIsEditModalOpen(false);
  };

  const generatePopupCreate = () => {
    setIsModalOpen(true);
  };

  const generatePopupEdit = (data) => {
    setEditData(data);
    setIsEditModalOpen(true);
  };
  const editRow = useCallback((e) => {

    e.event.preventDefault();
  }, []);

  const deleteRow = useCallback((e) => {
    
    e.event.preventDefault();
  }, []);

  const createRow = useCallback((e) => {
    
    e.event.preventDefault();
  }, []);


  const onAdd = () => {
    generatePopupCreate(selectedTable);
  };

  const onEdit = (row) => {
    var target;
    var current = selectedTable.id;
    target = selectedTable.id;
    setId(row[current]);
    generatePopupEdit(row, selectedTable);
  };

  const systemColumns = useMemo(
    () => [
      {
        Header: (
          <button className="action-buttons white" title="Vnos" onClick={onAdd}>
            <IoAddCircleSharp />
            Dodaj
          </button>
        ),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="action-buttons"
              title="Brisanje"
              onClick={() => onDelete(row.original)}
            >
              <MdDeleteForever />
            </button>
            <button
              className="action-buttons"
              title="Posodobitev"
              onClick={() => onEdit(row.original)}
            >
              <MdEdit />
            </button>
          </div>
        ),
        type: "nothing",
      },
      {
        Header: "Naziv",
        accessor: "ID",
        additional: "",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: "SELECT * FROM uWMSSettingList;",
        columnOrder: ["ID", "Desc"],
        columnOrderTranslation: ["Naziv", "Opis"],
        columnOrderWidth: [200, 300],
        dropdownId: "ID",
        dropdownPlaceholder: "",
        dropdownHelperField: "Desc",
        required: true,
        dbType: "String",
      },
      {
        Header: "Vrednost",
        accessor: "Value",
        additional: "",
        className: "value-column-system",
        type: "text",
        required: true,
        dbType: "String",
      },
    ],
    [],
  );

  // This is the configuration for the subject codes //
  const subjectCodes = useMemo(
    () => [
      {
        Header: (
          <button className="action-buttons white" title="Vnos" onClick={onAdd}>
            <IoAddCircleSharp />
            Dodaj
          </button>
        ),
        accessor: "actions",

        Cell: ({ row }) => (
          <div>
            <button
              className="action-buttons"
              title="Brisanje"
              onClick={() => onDelete(row.original)}
            >
              <MdDeleteForever />
            </button>
            <button
              className="action-buttons"
              title="Posodobitev"
              onClick={() => onEdit(row.original)}
            >
              <MdEdit />
            </button>
          </div>
        ),
        type: "nothing",
      },

      {
        Header: "Id",
        accessor: "anQId",
        className: "name-column-system",
        type: "nothing",
      },
      {
        Header: "Ident",
        accessor: "acIdent",
        className: "name-column-system",
        type: "dropdown",
        required: true,
        additional: "",
        sourceSelect: "SELECT acIdent, acName FROM tHE_SetItem;",
        columnOrder: ["acIdent", "acName"],
        columnOrderTranslation: ["Ident", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acIdent",
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        dbType: "String",
      },
      {
        Header: "Subjekt",
        accessor: "acSubject",
        className: "name-column-system",
        type: "dropdown",
        additional: "",
        required: true,
        sourceSelect:
          "SELECT acSubject, acName2, acAddress, acPost, acCountry FROM tHE_SetSubj",
        columnOrder: [
          "acSubject",
          "acName2",
          "acAddress",
          "acPost",
          "acCountry",
        ],
        columnOrderTranslation: [
          "Subjekt",
          "Naziv",
          "Naslov",
          "Pošta",
          "Država",
        ],
        columnOrderWidth: [200, 300, 200, 200, 200],
        dropdownId: "acSubject",
        dropdownPlaceholder: "",
        dropdownHelperField: "acName2",
        dbType: "String",
      },
      {
        Header: "Črtna koda",
        accessor: "acCode",
        additional: "",
        required: true,
        max: 100,
        className: "name-column-system",
        type: "text",
        dbType: "String",
      },
      {
        Header: "Število kosov",
        accessor: "uWMSSerialNoBatch",
        additional: "",
        required: true,
        className: "name-column-system",
        type: "number",
        dbType: "Int64",
      },
    ],
    [],
  );

  // This is the configuration for the statuses of documents //
  const statusDocument = useMemo(
    () => [
      {
        Header: (
          <button className="action-buttons white" title="Vnos" onClick={onAdd}>
            <IoAddCircleSharp />
            Dodaj
          </button>
        ),
        accessor: "actions",

        Cell: ({ row }) => (
          <div>
            <button
              className="action-buttons"
              title="Brisanje"
              onClick={() => onDelete(row.original)}
            >
              <MdDeleteForever />
            </button>
            <button
              className="action-buttons"
              title="Posodobitev"
              onClick={() => onEdit(row.original)}
            >
              <MdEdit />
            </button>
          </div>
        ),
        type: "nothing",
      },
      {
        Header: "Id",
        accessor: "anQId",
        className: "name-column-system",
        type: "nothing",
      },
      {
        Header: "Vrsta dokumenta",
        accessor: "acDocType",
        max: 4,
        required: true,
        className: "name-column-system",
        type: "dropdown",
        additional: "",

        sourceSelect: "SELECT acDocType, acName FROM tPA_SetDocType;",
        columnOrder: ["acDocType", "acName"],
        columnOrderTranslation: ["Vrsta dokumenta", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acDocType",
        required: true,
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        dbType: "String",
      },
      {
        Header: "Koda statusa",
        accessor: "acStatus",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        required: true,
        dropdownPlaceholder: "",
        dropdownHelperField: "vrednost",
        additional: "",
        dbType: "String",
      },
      {
        Header: "Naziv statusa",
        accessor: "acName",
        className: "name-column-system",
        type: "text",
        additional: "",
        required: true,
        max: 20,
        dbType: "String",
      },
      {
        Header: "Viden",
        accessor: "uWMSShow",
        required: true,
        className: "name-column-system",
        type: "checkbox",
        additional: "",

        dbType: "Boolean",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.values.uWMSShow} // Set the checked state based on the value of uWMSShow
            onChange={() => {}}
          />
        ),
      },
    ],
    [],
  );

  // This is the configuration for the statuses of documents //
  const documentTypes = useMemo(
    () => [
      {
        Header: (
          <button className="action-buttons white" title="Vnos" onClick={onAdd}>
            <IoAddCircleSharp />
            Dodaj
          </button>
        ),
        accessor: "actions",

        Cell: ({ row }) => (
          <div>
            <button
              className="action-buttons"
              title="Brisanje"
              onClick={() => onDelete(row.original)}
            >
              <MdDeleteForever />
            </button>
            <button
              className="action-buttons"
              title="Posodobitev"
              onClick={() => onEdit(row.original)}
            >
              <MdEdit />
            </button>
          </div>
        ),
        type: "nothing",
      },
      {
        Header: "Id",
        accessor: "anQId",
        className: "name-column-system",
        additional: "",
        type: "nothing",
      },
      {
        Header: "Vrsta",
        accessor: "acDocType",
        required: true,
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: "SELECT acDocType, acName FROM tPA_SetDocType;",
        columnOrder: ["acDocType", "acName"],
        columnOrderTranslation: ["Vrsta dokumenta", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acDocType",
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        additional: "",
        dbType: "String",
      },
      {
        Header: "Namen",
        accessor: "acSetOf",
        className: "name-column-system",
        type: "dropdown",
        required: true,
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        dropdownPlaceholder: "",
        additional: "single",
        dropdownHelperField: "vrednost",
        columnOrder: ["vrednost"],
        additional: "",
        dbType: "String",
      },
      {
        Header: "Varianta",
        accessor: "acType",
        className: "name-column-system",
        type: "dropdown",
        required: true,
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        dropdownPlaceholder: "",
        additional: "single",
        dropdownHelperField: "vrednost",
        columnOrder: ["vrednost"],
        additional: "",
        dbType: "String",
      },
      {
        Header: "Naziv",
        accessor: "acName",
        max: 40,
        required: true,
        className: "name-column-system",
        type: "text",
        additional: "",
        dbType: "String",
      },
      {
        Header: "Izdajno",
        accessor: "acIssuer",
        className: "name-column-system",
        type: "text",
        required: true,
        max: 30,
        additional: "",
        dbType: "String",
      },
      {
        Header: "Prevzemno",
        accessor: "acReceiver",
        className: "name-column-system",
        required: true,
        type: "text",
        max: 30,
        additional: "",
        dbType: "String",
      },
      {
        Header: "Prevzeto",
        accessor: "acWarehouse",
        className: "name-column-system",
        type: "dropdown",
        required: true,
        sourceSelect: `select acSubject, acName2 from tHE_SetSubj where acWarehouse = 'T'`,
        columnOrder: ["acSubject", "acName2"],
        columnOrderTranslation: ["Subjekt", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acSubject",
        dropdownPlaceholder: "",
        dropdownHelperField: "acName2",
        additional: "",
        dbType: "String",
      },
      {
        Header: "Vrsta prevzema",
        accessor: "uWMSAcqDocType",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT acDocType, acName FROM tPA_SetDocType WHERE acSetOf = 'F AND acType = 'P'`,
        columnOrder: ["acDocType", "acName"],
        columnOrderTranslation: ["Vrsta dokumenta", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acDocType",
        required: true,
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        additional: "",
        dbType: "String",
      },
      {
        Header: "Vrsta izdaje",
        accessor: "uWMSIssueDocType",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT acDocType, acName FROM tPA_SetDocType WHERE acSetOf = 'F' and acType = 'P'`,
        columnOrder: ["acDocType", "acName"],
        columnOrderTranslation: ["Vrsta dokumenta", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acDocType",
        required: true,
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        additional: "",
        dbType: "String",
      },
      {
        Header: "Viden",
        accessor: "uWMS",
        className: "name-column-system",
        type: "checkbox",
        required: true,
        additional: "",
        dbType: "String",
      },
      {
        Header: "Status delno zakl.",
        accessor: "uWMSPartiallyFinishStatus",
        className: "name-column-system",
        type: "text",
        max: 5,
        required: true,
        additional: "",
        dbType: "String",
      },
      {
        Header: "Status zaklj.",
        accessor: "uWMSFinishStatus",
        className: "name-column-system",
        type: "text",
        required: true,
        max: 5,
        additional: "",
        dbType: "String",
      },
    ],
    [],
  );

  const subjects = useMemo(
    () => [
      {
        Header: (
          <button className="action-buttons white" title="Vnos" onClick={onAdd}>
            <IoAddCircleSharp />
            Dodaj
          </button>
        ),
        accessor: "actions",

        Cell: ({ row }) => (
          <div>
            <button
              className="action-buttons"
              title="Brisanje"
              onClick={() => onDelete(row.original)}
            >
              <MdDeleteForever />
            </button>
            <button
              className="action-buttons"
              title="Posodobitev"
              onClick={() => onEdit(row.original)}
            >
              <MdEdit />
            </button>
          </div>
        ),
        type: "nothing",
      },
      {
        Header: "Id",
        accessor: "anQId",
        className: "name-column-system",
        additional: "",
        type: "nothing",
      },
      {
        Header: "Šifra",
        accessor: "acSubject",
        className: "name-column-system",
        type: "text",
        max: 30,
        additional: "",
        dbType: "String",
        required: true,
      },
      {
        Header: "Kupec",
        accessor: "acBuyer",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        dropdownPlaceholder: "",
        additional: "single",
        dropdownHelperField: "vrednost",
        columnOrder: ["vrednost"],
        dbType: "String",
        required: true,
      },
      {
        Header: "Dobavitelj",
        accessor: "acSupplier",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        dropdownPlaceholder: "",
        additional: "single",
        dropdownHelperField: "vrednost",
        columnOrder: ["vrednost"],
        dbType: "String",
        required: true,
      },
      {
        Header: "Skladišče",
        accessor: "acWarehouse",
        type: "dropdown",
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        dropdownPlaceholder: "",
        additional: "single",
        dropdownHelperField: "vrednost",
        className: "name-column-system",
        columnOrder: ["vrednost"],
        dbType: "String",
        required: true,
      },
      {
        Header: "Naziv",
        accessor: "acName2",
        className: "name-column-system",
        type: "text",
        max: 255,
        additional: "",
        dbType: "String",
        required: false,
      },
      {
        Header: "Naslov",
        accessor: "acAddress",
        max: 256,
        className: "name-column-system",
        type: "text",
        additional: "",
        dbType: "String",
        required: false,
      },
      {
        Header: "Pošta",
        accessor: "acPost",
        max: 13,
        className: "name-column-system",
        type: "text",
        additional: "",
        required: true,
        dbType: "String",
      },
      {
        Header: "Država",
        accessor: "acCountry",
        max: 60,
        className: "name-column-system",
        type: "text",
        additional: "",
        required: true,
        dbType: "String",
      },
      {
        Header: "Predpona",
        accessor: "acVATCodePrefix",
        className: "name-column-system",
        type: "text",
        max: 3,
        additional: "",
        required: true,
        dbType: "String",
      },
      {
        Header: "Dav. št.",
        accessor: "acCode",
        max: 20,
        className: "name-column-system",
        type: "text",
        additional: "",
        required: true,
        dbType: "String",
      },
      {
        Header: "Mat. št.",
        accessor: "acRegNo",
        max: 20,
        className: "name-column-system",
        type: "text",
        additional: "",
        required: true,
        dbType: "String",
      },
      {
        Header: "Aktiven",
        accessor: "acActive",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        dropdownPlaceholder: "",
        dropdownHelperField: "vrednost",
        additional: "hidden-active single",
        required: false,
        dbType: "String",
      },
      {
        Header: "Zaloga",
        accessor: "uWMSStock",
        className: "name-column-system",
        type: "checkbox",
        additional: "hidden-active",
        required: true,
        dbType: "Boolean",
      },
      {
        Header: "Viden",
        accessor: "uWMS",
        className: "name-column-system",
        type: "checkbox",
        additional: "hidden-active",
        required: true,
        dbType: "Boolean",
      },
      {
        Header: "Brez naročila",
        accessor: "uWMSSubj",
        className: "name-column-system",
        type: "checkbox",
        required: true,
        additional: "hidden-active",
        dbType: "Boolean",
      },
    ],
    [],
  );

  const idents = useMemo(
    () => [
      {
        Header: (
          <button className="action-buttons white" title="Vnos" onClick={onAdd}>
            <IoAddCircleSharp />
            Dodaj
          </button>
        ),

        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="action-buttons"
              title="Brisanje"
              onClick={() => onDelete(row.original)}
            >
              <MdDeleteForever />
            </button>
            <button
              className="action-buttons"
              title="Posodobitev"
              onClick={() => onEdit(row.original)}
            >
              <MdEdit />
            </button>
          </div>
        ),
        type: "nothing",
      },
      {
        Header: "Id",
        accessor: "anQId",
        className: "name-column-system",
        type: "nothing",
      },
      {
        Header: "Šifra identa",
        accessor: "acIdent",
        required: true,
        max: 16,
        className: "name-column-system",
        type: "text",
        dbType: "String",
      },
      {
        Header: "Naziv",
        max: 80,
        required: true,
        accessor: "acName",
        className: "name-column-system",
        type: "text",
        dbType: "String",
      },
      {
        Header: "EAN koda",
        accessor: "acCode",
        max: 50,
        required: true,
        className: "name-column-system",
        type: "text",
        dbType: "String",
        additional: "hidden-active",
      },
      {
        Header: "Tip identa",
        max: 3,
        accessor: "acSetOfItem",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT acSetOfItem, acName FROM tHE_SetItemType`,
        columnOrder: ["acSetOfItem", "acName"],
        columnOrderTranslation: ["Šifra", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acSetOfItem",
        required: true,
        dropdownPlaceholder: "",
        additional: "hidden-active",
        dropdownHelperField: "acName",
        dbType: "String",
      },
      {
        max: 30,
        Header: "Dobavitelj",
        accessor: "acSupplier",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT acSubject, acName2 FROM tHE_SetSubj where acSupplier = 'T'`,
        columnOrder: ["acSubject", "acName2"],
        columnOrderTranslation: ["Subjekt", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acSubject",
        required: true,
        additional: "hidden-active",
        dropdownPlaceholder: "",
        dropdownHelperField: "acName2",
        dbType: "String",
      },
      {
        Header: "1 enota",
        max: 3,
        accessor: "acUM",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT acUM, acName FROM tHE_SetUM`,
        columnOrder: ["acUM", "acName"],
        columnOrderTranslation: ["Enota", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acUM",
        required: true,
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        dbType: "String",
      },
      {
        Header: "Pretvornik",
        accessor: "anUMToUM2",
        max: 16,
        required: true,
        className: "name-column-system",
        type: "number",
        dbType: "String",
      },
      {
        Header: "2 enota",
        accessor: "acUM2",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT acUM, acName FROM tHE_SetUM`,
        columnOrder: ["acUM", "acName"],
        columnOrderTranslation: ["Enota", "Naziv"],
        columnOrderWidth: [200, 300],
        additional: "hidden-active",
        required: true,
        dropdownId: "acUM",
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        dbType: "String",
      },
      {
        Header: "Tip št.",
        accessor: "acSerialNo",
        additional: "hidden-active single",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        required: true,
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        dropdownPlaceholder: "",
        dropdownHelperField: "vrednost",
        dbType: "String",
      },
      {
        Header: "Aktiven",
        accessor: "acActive",
        className: "name-column-system",
        type: "dropdown",
        additional: "single",
        sourceSelect: `SELECT 'T' AS vrednost UNION SELECT 'F' AS vrednost`,
        columnOrder: ["vrednost"],
        columnOrderTranslation: ["Vrednost"],
        required: true,
        columnOrderWidth: [200],
        dropdownId: "vrednost",
        dropdownPlaceholder: "",
        dropdownHelperField: "vrednost",
        dbType: "String",
      },
      {
        Header: "Višina",
        accessor: "anDimHeight",
        className: "name-column-system",
        type: "number",
        required: true,
        dbType: "String",
      },
      {
        Header: "Širina",
        accessor: "anDimWidth",
        className: "name-column-system",
        type: "number",
        required: true,
        dbType: "String",
      },
      {
        Header: "Globina",
        accessor: "anDimDepth",
        className: "name-column-system",
        type: "number",
        required: true,
        dbType: "String",
      },
      {
        Header: "Teža",
        accessor: "anDimWeight",
        className: "name-column-system",
        type: "number",
        required: true,
        dbType: "String",
      },
      {
        Header: "Bruto",
        accessor: "anDimWeightBrutto",
        className: "name-column-system",
        type: "number",
        required: true,
        dbType: "String",
      },
      {
        Header: "En. dolžine",
        accessor: "acUMDim1",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT acUM, acName FROM tHE_SetUM`,
        columnOrder: ["acUM", "acName"],
        columnOrderTranslation: ["Enota", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acUM",
        required: true,
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        dbType: "String",
      },
      {
        Header: "En. teže",
        accessor: "acUMDim2",
        className: "name-column-system",
        type: "dropdown",
        sourceSelect: `SELECT acUM, acName FROM tHE_SetUM`,
        columnOrder: ["acUM", "acName"],
        columnOrderTranslation: ["Enota", "Naziv"],
        columnOrderWidth: [200, 300],
        dropdownId: "acDocType",
        required: true,
        dropdownPlaceholder: "",
        dropdownHelperField: "acName",
        dbType: "String",
      },
      {
        Header: "Vidno",
        accessor: "uWMS",
        required: true,
        className: "name-column-system",
        type: "checkbox",
        dbType: "String",
      },
    ],
    [],
  );

  const tablesAssociation = [
    {
      name: "system",
      value: systemColumns,
      insertHasUser: false,
      insertUserId: "",
      updateHasUser: false,
      updateUserId: "",
      insertQuery:
        "INSERT INTO  [dbo].[uWMSSetting] (#fields) VALUES (#parameters)",
      deleteQuery: "DELETE FROM [dbo].[uWMSSetting] WHERE ID = @anQId",
      updateQuery: "UPDATE [dbo].[uWMSSetting] SET #update",
      id: "ID",
      idType: "String",
    },
    {
      name: "subject-codes",
      value: subjectCodes,
      insertHasUser: true,
      insertUserId: "anUserIns",
      updateHasUser: true,
      updateUserId: "anUserChg",
      insertQuery: `INSERT INTO [dbo].[tHE_SetItemExtItemSubj] (#fields) VALUES (#parameters)`,
      deleteQuery:
        "DELETE FROM [dbo].[tHE_SetItemExtItemSubj] WHERE [anQId] = @anQId",
      updateQuery: `UPDATE [dbo].[tHE_SetItemExtItemSubj] SET #update`,
      id: "anQId",
      idType: "Int64",
    },
    {
      name: "status-document",
      value: statusDocument,
      insertHasUser: true,
      insertUserId: "anUserIns",
      updateHasUser: true,
      updateUserId: "anUserChg",
      insertQuery: `INSERT INTO [dbo].[tPA_SetDocTypeStat] (#fields) VALUES (#parameters)`,
      deleteQuery:
        "DELETE FROM [dbo].[tPA_SetDocTypeStat] WHERE [anQId] = @anQId",
      updateQuery: `UPDATE [dbo].[tPA_SetDocTypeStat] SET #update`,
      id: "anQId",
      idType: "Int64",
    },
    {
      name: "type-document",
      value: documentTypes,
      insertHasUser: false,
      insertUserId: "",
      updateHasUser: false,
      updateUserId: "",
      insertQuery: `INSERT INTO (#fields) VALUES (#parameters)`,
      deleteQuery: "DELETE FROM [dbo].[tPA_SetDocType] WHERE [anQId] = @anQId`",
      updateQuery: `UPDATE [dbo].[tPA_SetDocType] SET #update`,
      id: "anQId",
      idType: "Int64",
    },
    {
      name: "subjects",
      value: subjects,
      insertQuery: `INSERT INTO [dbo].[tHE_SetSubj] (#fields) VALUES (#parameters)`,
      insertHasUser: true,
      insertUserId: "anUserIns",
      deleteQuery: "DELETE FROM [dbo].[tHE_SetSubj] WHERE [anQId] = @anQId",
      updateQuery: `UPDATE [dbo].[tHE_SetSubj] SET #update`,
      updateHasUser: true,
      updateUserId: "anUserChg",
      id: "anQId",
      idType: "Int64",
    },
    {
      name: "idents",
      value: idents,
      insertHasUser: true,
      insertUserId: "anUserIns",
      updateHasUser: true,
      updateUserId: "anUserChg",
      insertQuery: `INSERT INTO [dbo].[tHE_SetItem] (#fields) VALUES (#parameters)`,
      deleteQuery: "DELETE FROM [dbo].[tHE_SetItem] WHERE [anQId] = @anQId",
      updateQuery: `UPDATE [dbo].[tHE_SetItem] SET #update`,
      id: "anQId",
      idType: "Int64",
    },
  ];

  const generateColumns = () => {
    // Define your columns dynamically based on your data structure
    let columns = [];
    let selectedTable = tablesAssociation.find((table) => table.name === name);
    for (let i = 0; i < selectedTable.value.length; i++) {
      let currentRow = selectedTable.value[i];
      if(currentRow.type!=="nothing") {
        columns.push(<Column key={currentRow.accessor} dataField={currentRow.accessor} caption={currentRow.Header} />);
      }
    }
    return columns;
  };



  var selectedTable = tablesAssociation.find((table) => table.name === name);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of 'rows', we use 'page' which represents the currently visible page
    prepareRow,
    state: { globalFilter, pageIndex, pageSize },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns: selectedTable ? selectedTable.value : [],
      data: tableData,
    },
    useGlobalFilter,
    usePagination, // Add the usePagination hook
  );

  return (
    <div className="global-react-table">
      <Insert
        refresh={refresh}
        onClose={onClose}
        selectedTable={selectedTable}
        isVisible={isModalOpen}
      />
      <Update
        id={id}
        data={editData}
        refresh={refresh}
        onClose={onCloseEdit}
        selectedTable={selectedTable}
        isVisible={isModalEditOpen}
      />





        <DataGrid

                  className='devexpress-grid settings-system'
                  dataSource={tableData}
                  keyExpr={'ID'}
                  allowColumnReordering={true}
                  allowColumnResizing={true}
                  noDataText='Ni podatkov'
                  columnAutoWidth={true}
                  focusedRowEnabled={true}
                  hoverStateEnabled={true}
                  
                >
                <Editing
                    mode="row"
                    useIcons={true}
                    allowUpdating={true}
                    allowDeleting={true}     
                />
                  <FilterRow visible={true} />


                  <Column type="buttons">
                    <Button name="edit" hoverStateEnabled={false} onClick={editRow} />
                    <Button name="delete" hoverStateEnabled={false} onClick={deleteRow} />
                    <Button name="create" hoverStateEnabled={false}  icon="add" onClick={createRow} />
                  </Column>


                  {generateColumns()}


                  <Selection mode='single' />


</DataGrid>
   
    </div>
  );
}

export default TableForge;
