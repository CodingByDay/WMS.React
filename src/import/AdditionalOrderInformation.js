import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import ImportService from "../services/ImportService";
import { useTranslation } from "react-i18next";
import { trHeaders } from "../i18n/headerMap";

export default function AdditionalOrderInformation(props) {
  const { t } = useTranslation();
  const [warehouses, setWarehouses] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [chosenType, setChosenType] = useState(null);
  const [chosenWarehouse, setChosenWarehouse] = useState(null);

  useEffect(() => {
    ImportService.getWarehouses().then((response) => {
      var warehouses = onlyWarehouses(response);
      setWarehouses(warehouses);
    });

    const typeNameHeaders = trHeaders(["Tip", "Naziv"], t);
    var documentTypes = [];
    documentTypes.push({
      value: "",
      id: "",
      label: "",
      properties: typeNameHeaders,
      header: true,
    });
    documentTypes.push({
      value: t("import.docTypeIssue"),
      id: "I",
      label: t("import.docTypeIssue"),
      properties: ["I", t("import.docTypeIssue")],
      header: false,
    });
    documentTypes.push({
      value: t("import.docTypeReceipt"),
      id: "P",
      label: t("import.docTypeReceipt"),
      properties: ["P", t("import.docTypeReceipt")],
      header: false,
    });
    setDocumentTypes(documentTypes);
  }, [t]);

  function setChosenState() {
    props.onChosen(chosenType, chosenWarehouse);
  }

  const DynamicFormatOptionLabel = ({
    label,
    properties,
    header,
    selected,
    id,
  }) => (
    <div>
      {properties && properties.length > 0 && !selected ? (
        <div style={{ display: "flex", margin: "0", padding: "0" }}>
          {properties.map((property, index) =>
            !header ? (
              <div
                key={index}
                style={{
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
        <div style={{ fontSize: "100%" }}>{id}</div>
      )}
    </div>
  );
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

  const formatOptionLabel = ({ label, properties, header, id }) => {
    var exists = false;

    if (id != null && chosenType != null) {
      exists = chosenType.id == id;
    }

    return (
      <DynamicFormatOptionLabel
        properties={properties}
        id={id}
        label={label}
        header={header}
        selected={exists}
      />
    );
  };

  function handleSelectChangeType(choice) {
    if (choice.id == "") {
      setChosenType(null);
    } else {
      setChosenType(
        documentTypes.find(
          (element) => element.properties[0] == choice.properties[0],
        ),
      );
    }
  }

  function handleSelectChangeWarehouse(choice) {
    if (choice.value == "") {
      setChosenWarehouse(null);
    } else {
      setChosenWarehouse(
        warehouses.find((element) => element.value == choice.value),
      );
    }
  }

  return (
    <div>
      <Popup
        className="wms-import-popup"
        position="center center"
        modal
        closeOnDocumentClick
        open={props.isOpen}
        onClose={props.onClose}
      >
        <div className="outer-order wms-import-popup-panel">
          <div
            className="header-order wms-import-popup-header"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2em",
            }}
          >
            <h4>{t("import.additionalTitle")}</h4>
          </div>

          <div className="choices-order wms-import-additional-fields">
            <div className="form-group">
              <label htmlFor="document-type-import">
                {t("import.additionalDocType")}
              </label>

              <Select
                formatOptionLabel={formatOptionLabel}
                id="document-type-import"
                placeholder={t("import.placeholderDefault")}
                value={chosenType}
                onChange={(selected) => handleSelectChangeType(selected)}
                options={documentTypes}
              />
            </div>

            <div className="form-group">
              <label htmlFor="import-warehouse">
                {t("import.additionalWarehouse")}
              </label>

              <Select
                id="warehouses-import"
                placeholder={t("import.placeholderDefault")}
                value={chosenWarehouse}
                onChange={(selected) => handleSelectChangeWarehouse(selected)}
                options={warehouses}
              />
            </div>
          </div>
          <button
            className="actions smallerr"
            id="confirmAdditionalInformation"
            onClick={() => setChosenState("position")}
          >
            {t("common.confirmBtn")}
          </button>
        </div>
      </Popup>
    </div>
  );
}
