import DataAccess from "../utility/DataAccess";
import { useSelector, useDispatch } from "react-redux";

import $ from "jquery";
import Select from "react-select";
import PopupService from "../services/PopupService";
import { useEffect, useMemo, useState } from "react";
import { MdAdd } from "react-icons/md";
import ListingService from "../services/ListingService";
import { useTranslation } from "react-i18next";
import { trHeader } from "../i18n/headerMap";
import {
  pickCreatedOrderKey,
  toDateInputValue,
} from "../utility/listingOrderUtils";
import { getListingOrderSelectStyles } from "../utility/listingFormSelectStyles";

export default function IssuedGoods(props) {
  const { t } = useTranslation();
  // States

  const [documentTypes, setDocumentTypes] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [buyer, setBuyer] = useState([]);

  // Chosen states

  const [byOrder, setByOrder] = useState(true);
  const [document, setDocument] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState(() => toDateInputValue(new Date()));

  const [selectedType, setSelectedType] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  var bufferElements = [];
  const userId = useSelector((state) => state.user.userId);

  const listingForm = props.order && props.type === "listing";
  const selectStyles = useMemo(
    () =>
      getListingOrderSelectStyles({
        option: (provided) => ({
          ...provided,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }),
      }),
    [],
  );

  useEffect(() => {
    var documentTypes = PopupService.getAllDocumentTypeOfEvent("P").then(
      (response) => {
        var types = [];
        types.push({
          value: "",
          code: "",
          label: "",
          properties: [],
          header: true,
        });
        for (var i = 0; i < response.Items.length; i++) {
          var type = DataAccess.getData(
            response.Items[i],
            "Code",
            "StringValue",
          );
          var name = DataAccess.getData(
            response.Items[i],
            "Name",
            "StringValue",
          );
          var together = type + "|" + name;

          var properties = [type, name];

          types.push({
            value: together,
            label: together,
            code: type,
            header: false,
            properties: properties,
          });
        }
        setDocumentTypes(types);
      },
    );

    var warehouses = PopupService.getWarehouses(userId).then((response) => {
      var warehouses = onlyWarehouses(response);
      setWarehouses(warehouses);
    });

    var subjects = PopupService.getSubjects().then((response) => {
      window.subjects = response;
      var subjectsList = [];
      subjectsList.push({ value: "", label: "" });
      for (var i = 0; i < response.Items.length; i++) {
        var field = DataAccess.getData(response.Items[i], "ID", "StringValue");
        subjectsList.push({ value: field, label: field });
      }
      setBuyer(subjectsList);
    });
  }, []);

  function onlyWarehouses(data) {
    var returnArray = [];
    returnArray.push({ value: "", label: "" });

    for (var i = 0; i < data.Items.length; i++) {
      returnArray.push({
        value: data.Items[i].Properties.Items[0].StringValue,
        label: data.Items[i].Properties.Items[0].StringValue,
      });
    }

    return returnArray;
  }

  function onChangeType(e) {
    if (e.value == "") {
      setSelectedType(null);
    } else {
      setDocument(e.code);
      setSelectedType(e);
    }
  }

  function onChangeWarehouse(e) {
    if (e.value == "") {
      setSelectedWarehouse(null);
    } else {
      setWarehouse(e.value);
      setSelectedWarehouse({ value: e.value, label: e.value });
    }
  }

  function onChangeBuyer(e) {
    if (e.value == "") {
      setSelectedClient(null);
    } else {
      setClient(e.value);
      setSelectedClient({ value: e.value, label: e.value });
    }
  }

  function onDateChange(e) {
    setDate(e.target.value);
  }

  async function createHeadDocument() {
    // date
    var dateValue = date;

    if (!props.order) {
      var documentData = document;
      var warehouseData = warehouse;
      var objectForAPI = {};
      if (!byOrder) {
        objectForAPI = {
          DocumentType: documentData,
          Date: dateValue,
          Type: "P",
          WhareHouse: warehouseData,
          ByOrder: byOrder,
          LinkKey: "",
          Receiver: client,
          Issuer: client,
        };
      } else {
        objectForAPI = {
          DocumentType: documentData,
          Date: dateValue,
          Type: "P",
          WhareHouse: warehouseData,
          ByOrder: byOrder,
          LinkKey: "",
        };
      }
      if (window.confirm("Ali želite kreirati dokument?")) {
        var data = PopupService.setMoveHead(objectForAPI).then((response) => {
          props.close();
        });
      }
    } else {
      // P == Prevzem sicer izdaja I

      var documentData = document;
      var warehouseData = warehouse;
      var objectForAPI = {};
      var note = $("#acNote").val();
      var order = "";

      objectForAPI = {
        DocumentType: documentData,
        Type: "P",
        Warehouse: warehouseData,
        Receiver: client,
        Issuer: client,
        Note: note,
        Status: "1",
        Date: dateValue,
      };

      ListingService.createOrder(objectForAPI).then((response) => {
        cleanFields();
        if (response.Success) {
          window.showAlert(
            t("common.info"),
            t("common.successAdded"),
            "success",
          );
          const newKey = pickCreatedOrderKey(response);
          props.close();
          if (props.refreshListingAfterOrder) {
            props.refreshListingAfterOrder(newKey);
          } else {
            props.render?.();
          }
        } else {
          window.showAlert(t("common.info"), t("common.dataError"), "error");
          props.close();
          props.render?.();
        }
      });
    }
  }

  function cleanFields() {
    setSelectedType(null);
    setSelectedWarehouse(null);
    setSelectedClient(null);
    $("#acNote").val("");
  }

  function toggleCheck() {
    setByOrder(!byOrder);
  }

  function getCheckBox() {
    if (!props.order) {
      return (
        <div className="wms-listing-head-form__checkbox">
          <label htmlFor="byOrder">{t("listing.byOrder")}</label>
          <input
            type="checkbox"
            onChange={toggleCheck}
            checked={byOrder}
            id="byOrder"
          />
        </div>
      );
    }
  }

  function getClient() {
    if (props.order) {
      return (
        <div className="wms-field">
          <label className="wms-field-label" htmlFor="issued-buyer-input">
            {trHeader("Prejemnik", t)}
          </label>
          <div className="wms-field-control">
            <Select
              styles={selectStyles}
              className="select-filters-add"
              inputId="issued-buyer-input"
              value={selectedClient}
              onChange={(e) => onChangeBuyer(e)}
              placeholder={trHeader("Prejemnik", t)}
              options={buyer}
              id="buyer"
            />
          </div>
        </div>
      );
    }
  }

  function getNote() {
    if (props.order) {
      return (
        <div className="wms-field form-group2 wms-listing-head-form__note-centered">
          <label className="wms-field-label" htmlFor="acNote">
            {t("import.note")}
          </label>
          <div className="wms-field-control">
            <textarea className="form-control" id="acNote" rows={3} />
          </div>
        </div>
      );
    }
  }

  const DynamicFormatOptionLabel = ({
    label,
    properties,
    header,
    code,
    exists,
  }) => (
    <div>
      {properties && properties.length && !exists ? (
        <div style={{ display: "flex", margin: "0", padding: "0" }}>
          {properties.map((property, index) =>
            !header ? (
              <div
                key={index}
                style={{
                  minWidth: "300",
                  paddingLeft: "3px",
                  paddingRight: "3px",
                  fontSize: "80%",
                  color: "gray",
                  marginRight: "0px",
                  whiteSpace: "nowrap",
                }}
              >
                {property}
              </div>
            ) : (
              <div
                key={index}
                style={{
                  fontWeight: "600",
                  minWidth: "300",
                  paddingLeft: "5px",
                  paddingRight: "3px",
                  fontSize: "80%",
                  color: "black",
                  marginRight: "0px",
                  whiteSpace: "nowrap",
                }}
              >
                {property}
              </div>
            ),
          )}
        </div>
      ) : (
        <div style={{ fontSize: "100%" }}>{code}</div>
      )}
    </div>
  );

  const formatOptionLabel = ({ label, properties, header, code }) => {
    var exists = false;

    if (code && selectedType) {
      exists = selectedType.code === code || false;
    }

    // Return the component with the processed data
    return (
      <DynamicFormatOptionLabel
        properties={properties}
        exists={exists}
        label={label}
        code={code}
        header={header}
      />
    );
  };

  const containerClass =
    listingForm
      ? "layout-issued-goods-container wms-listing-head-form"
      : "layout-issued-goods-container";

  return (
    <div className={containerClass}>
      <div className="layout-issued-goods-header-checkbox">{getCheckBox()}</div>
      <div
        className={
          listingForm
            ? "layout-issued-goods wms-listing-head-form__grid"
            : "layout-issued-goods"
        }
      >
        <div className="left-column wms-listing-head-form__col">
          <div className="wms-field">
            <label className="wms-field-label" htmlFor="issued-doc-type-input">
              {trHeader("Vrsta dokumenta", t)}
            </label>
            <div className="wms-field-control">
              <Select
                styles={selectStyles}
                className="select-filters-add"
                inputId="issued-doc-type-input"
                getOptionLabel={(option) => option.code}
                getOptionValue={(option) => option.code}
                formatOptionLabel={formatOptionLabel}
                value={selectedType}
                onChange={(e) => onChangeType(e)}
                placeholder={trHeader("Vrsta dokumenta", t)}
                options={documentTypes}
                id="documentType"
              />
            </div>
          </div>
          <div className="wms-field">
            <label className="wms-field-label" htmlFor="issued-warehouse-input">
              {trHeader("Skladišče", t)}
            </label>
            <div className="wms-field-control">
              <Select
                styles={selectStyles}
                className="select-filters-add"
                inputId="issued-warehouse-input"
                value={selectedWarehouse}
                onChange={(e) => onChangeWarehouse(e)}
                placeholder={trHeader("Skladišče", t)}
                options={warehouses}
                id="warehouse"
              />
            </div>
          </div>
        </div>
        <div className="right-column wms-listing-head-form__col">
          <div className="wms-field">
            <label className="wms-field-label" htmlFor="documentDate">
              {trHeader("Rok dobave", t)}
            </label>
            <div className="wms-field-control">
              <input
                type="date"
                id="documentDate"
                className="form-control"
                value={date}
                onChange={onDateChange}
              />
            </div>
          </div>
          {getClient()}
        </div>
      </div>

      <div className="bottom-part wms-listing-head-form__footer">
        {getNote()}
        <div className="wms-popup-footer-actions">
          <span
            className="actions smallerr"
            onClick={createHeadDocument}
            id="createDocument"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                createHeadDocument();
              }
            }}
          >
            <span className="wms-action-label">{t("common.confirmBtn")}</span>
            <MdAdd />
          </span>
        </div>
      </div>
    </div>
  );
}
