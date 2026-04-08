import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
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
        // Get idents (with names). If SQL route isn't available, fall back to idx list (ident only).
        let identObjects = [];
        try {
          const rows = await TransactionService.getIdentsWithNames();
          identObjects = (rows || [])
            .filter((r) => r && r.acIdent != null && r.acIdent !== "")
            .map((r) => ({
              value: String(r.acIdent),
              label: String(r.acIdent),
              name:
                r.acName ??
                r.acname ??
                r.ACNAME ??
                r.Name ??
                r.name ??
                "",
            }));
        } catch {
          identObjects = [];
        }
        if (!identObjects.length) {
          const response = await TransactionService.getIdents();
          identObjects = (response?.data || []).map((ident) => ({
            label: ident,
            value: ident,
            name: "",
          }));
        }
        setIdents([{ label: "", value: "", name: "" }, ...identObjects]);

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

  const identSelectStyles = {
    menu: (base) => ({ ...base, zIndex: 9999 }),
    option: (base) => ({ ...base, paddingTop: 6, paddingBottom: 6 }),
  };

  const IdentMenuList = (props) => {
    return (
      <components.MenuList {...props}>
        <div className="wms-ident-option wms-ident-option--header">
          <span className="wms-ident-option__ident">Ident</span>
          <span className="wms-ident-option__name">{i18n.t("grid.identName")}</span>
        </div>
        {props.children}
      </components.MenuList>
    );
  };

  const IdentSingleValue = (props) => {
    return (
      <components.SingleValue {...props}>
        {props.data?.value || ""}
      </components.SingleValue>
    );
  };

  const onQtyKeyDown = (e) => {
    if (["e", "E", "+", "-", ",", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  const onQtyChange = (event) => {
    const raw = event.target.value;
    const cleaned = raw.replace(/[^\d]/g, "");
    setQuantity(cleaned);
  };

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
        if (!response.Success) {
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
      <div className="popup-content wms-popup-shell wms-add-position-popup">
        <div className="popup-header wms-popup-header">
          <PopupCloseButton onClick={onClose} />
        </div>
        <div className="popup-body wms-add-position-popup__body">
          <div className="wms-field">
            <label className="wms-field-label" htmlFor="identListControl">
              Ident:
            </label>
            <div className="wms-field-control wms-add-position-popup__control">
              <Select
                placeholder="Ident"
                inputId="identListControl"
                options={idents}
                value={selectedIdent}
                onChange={(selectedOption) => setSelectedIdent(selectedOption)}
                styles={identSelectStyles}
                components={{
                  MenuList: IdentMenuList,
                  SingleValue: IdentSingleValue,
                }}
                formatOptionLabel={(option) => {
                  if (!option.value) return <span>&nbsp;</span>;
                  return (
                    <div className="wms-ident-option">
                      <span className="wms-ident-option__ident">
                        {option.value}
                      </span>
                      <span className="wms-ident-option__name">
                        {option.name || "—"}
                      </span>
                    </div>
                  );
                }}
                getOptionLabel={(o) =>
                  `${o.value}${o.name ? " " + o.name : ""}`
                }
              />
            </div>
          </div>

          <div className="wms-field">
            <label className="wms-field-label" htmlFor="quantity">
              Količina:
            </label>
            <div className="wms-field-control wms-add-position-popup__control">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                id="quantity"
                className="form-control"
                value={quantity}
                onKeyDown={onQtyKeyDown}
                onChange={onQtyChange}
                placeholder="0"
              />
            </div>
          </div>

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
