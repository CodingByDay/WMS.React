import React, { useState, useEffect } from "react";
import Select from "react-select";
import TransactionService from "../services/TransactionService";
import ListingService from "../services/ListingService";
import DataAccess from "../utility/DataAccess";
import $ from "jquery";
import PopupCloseButton from "../components/PopupCloseButton";
import i18n from "../i18n";
import { pickCreatedPositionItemId } from "../utility/listingOrderUtils";

const AddOrderPosition = (props) => {
  const [idents, setIdents] = useState([]);
  const [selectedIdent, setSelectedIdent] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get idents
        const response = await TransactionService.getIdents();
        const identObjects = response.data.map((ident) => ({
          label: ident,
          value: ident,
        }));
        setIdents([{ label: "", value: "" }, ...identObjects]);

        // Get the list of warehouses
        const responseWarehouses = await TransactionService.getWarehouses();

        var warehousesReturn = [];
        for (var i = 0; i < responseWarehouses.Items.length; i++) {
          var warehouseObj = DataAccess.getData(
            responseWarehouses.Items[i],
            "Name",
            "StringValue",
          );
          warehousesReturn.push({ value: warehouseObj, label: warehouseObj });
        }

        setWarehouses(warehousesReturn);
      } catch (error) {
        // Error handling
      }
    };

    fetchData();
  }, []);

  const handleAddOrderPosition = () => {
    if (!selectedIdent) return;

    const identCaptured = selectedIdent.value;
    const qtyCaptured = quantity;

    const toSend = {
      Key: props.current,
      Qty: quantity,
      Ident: identCaptured,
      Clerk: localStorage.getItem("name"),
    };

    ListingService.createPosition(toSend)
      .then((response) => {
        if (response.Success) {
          window.showAlert(
            i18n.t("common.info"),
            i18n.t("common.successAdded"),
            "success",
          );
        } else {
          window.showAlert(
            i18n.t("common.info"),
            i18n.t("common.dataError"),
            "error",
          );
        }
        return response;
      })
      .catch((err) => {
        const msg =
          err?.response?.data != null
            ? typeof err.response.data === "object"
              ? JSON.stringify(err.response.data)
              : String(err.response.data)
            : err?.message || String(err);
        window.showAlert(i18n.t("common.info"), msg, "error");
        return null;
      })
      .then((response) => {
        onClose();
        setSelectedIdent(null);
        setQuantity("");
        const newItemId = response
          ? pickCreatedPositionItemId(response)
          : null;
        props.communicate("position", "render", {
          focusItemId:
            newItemId != null && newItemId !== "" ? newItemId : null,
          focusIdent: identCaptured || null,
          focusQty:
            qtyCaptured != null && qtyCaptured !== ""
              ? String(qtyCaptured)
              : null,
        });
      });
  };

  if (!props.isVisible || props.current == -1) {
    $(".dx-icon.dx-icon-filter-operation-default").removeClass("inactive");

    return null;
  } else {
    $(".dx-icon.dx-icon-filter-operation-default").addClass("inactive");
  }

  function setSelectedLocationEvent(e) {
    setSelectedLocation({ value: e.value, label: e.value });
  }

  function setSelectedWarehouseEvent(e) {
    const fetchData = async () => {
      const responseLocations = await TransactionService.getLocations(e.value);
      var locationsReturn = [];
      for (var i = 0; i < responseLocations.Items.length; i++) {
        var locationsObj = DataAccess.getData(
          responseLocations.Items[i],
          "Name",
          "StringValue",
        );
        locationsReturn.push({ value: locationsObj, label: locationsObj });
      }
      setLocations(locationsReturn);
    };

    setSelectedWarehouse({ value: e.value, label: e.value });

    fetchData();
  }

  function onClose() {
    props.onClose();
  }
  return (
    <div className="popup-overlay">
      <div className="popup-content wms-popup-shell">
        <div className="popup-header wms-popup-header">
          <PopupCloseButton onClick={onClose} />
        </div>
        <div className="popup-body">
          <label htmlFor="ident">Ident:</label>

          <Select
            placeholder="Ident"
            id="identListControl"
            options={idents}
            value={selectedIdent}
            onChange={(selectedOption) => setSelectedIdent(selectedOption)}
          />

          <label htmlFor="quantity">Količina:</label>

          <input
            type="number"
            id="quantity"
            className="popup-input"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />

          <div className="wms-popup-footer-actions">
            <span
              onClick={handleAddOrderPosition}
              className="actions smallerr"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleAddOrderPosition();
                }
              }}
            >
              Dodaj
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderPosition;
