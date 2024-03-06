import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Table from "../table/Table";
import { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";
import TransactionService from "../services/TransactionService";
import { Dropdown, Stack } from "@fluentui/react";
import DataAccess from "../utility/DataAccess";
import PopupService from "../services/PopupService";

export default function Edit(props) {
  const [ident, setIdent] = useState("");
  const [identList, setIdentsList] = useState([]);
  const [transactionData, setTransactionData] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [documentTypeString, setDocumentTypeStringValue] = useState("");

  useEffect(() => {
    var idents = TransactionService.getIdents().then((response) => {
      var identObjects = [];
      identObjects.push({ value: "", label: "" });
      // This is the place to check if all of the idents are correctly rendered.
      for (var i = 0; i < response.data.length; i++) {
        identObjects.push({ label: response.data[i], value: response.data[i] });
      }
      window.identity = identObjects;
      setIdentsList(identObjects);
      setIdent("");
    });

    if (typeof props.selected.childNodes !== "undefined") {
      // Continue here tomarow.

      var rowProperty = {};

      for (var i = 0; i < props.selected.childNodes.length; i++) {
        rowProperty[`${props.selected.childNodes[i]}`] =
          props.selected.childNodes[i].innerHTML;
      }

      setTransactionData(rowProperty);
    }
  }, [ident]);

  const onRenderOrderAdd = (item) => {
    return (
      <table>
        <tbody>
          <tr>
            <td style={{ width: 150 }}>{item.order}</td>
            <td style={{ width: 150 }}>{item.client}</td>
            <td style={{ width: 150 }}>{item.quantity}</td>
            <td style={{ width: 150 }}>{item.date}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  function findValueByClassWithinArray(array, classNameValue) {
    for (var i = 0; i < array.length; i++) {
      var currentObject = array[i];
      if (currentObject.className === classNameValue) {
        return currentObject.innerHTML;
      }
    }

    return "";
  }

  function onChangeIdent(e) {
    setIdent(e.value);

    updateOrders(e.value);
  }

  function onChangeOrder(e) {
    var ident = document.getElementById("identListControl").innerText;
    // Correct data gets to the service
    PopupService.getOrderDataFromIdentAndOrderNumber(e.value, ident).then(
      (response) => {
        var qty = DataAccess.getData(response, "OpenQty", "DoubleValue");
        var deadline = new Date(
          DataAccess.getData(response, "DeliveryDeadline", "DateTimeValue"),
        ).toLocaleDateString();
        var no = DataAccess.getData(response, "No", "IntValue");
        document.getElementById("positionNumber").value = no;
        document.getElementById("openQty").value = qty;
        document.getElementById("deadlineDate").value = deadline;

        // Test the result
      },
    );
  }

  function updateOrders(ident) {
    // Continue here.
    var type = findValueByClassWithinArray(
      props.selected.childNodes,
      "DocumentType",
    );
    TransactionService.getOrdersForIdent(ident, type).then((response) => {
      var items = [];
      items.push({ value: "", label: "" });

      for (var i = 0; i < response.Items.length; i++) {
        var item = response.Items[i];
        var key = DataAccess.getData(item, "Key", "StringValue");
        items.push({ label: key, value: key });
        // Test this
      }
      setOrderData(items);
      // Multi column place for the data collection //
    });
  }

  if (props.show) {
    $("#edit").css("display", "block");

    var rowProperty = {};
    if (typeof props.selected.childNodes !== "undefined") {
      var headId = findValueByClassWithinArray(
        props.selected.childNodes,
        "HeadID",
      );
      var documentType = findValueByClassWithinArray(
        props.selected.childNodes,
        "DocumentType",
      );
      // Missing value for String representation of the document.
      var client = findValueByClassWithinArray(
        props.selected.childNodes,
        "Receiver",
      );
      var warehouse = findValueByClassWithinArray(
        props.selected.childNodes,
        "WharehouseName",
      );
      var transactionIdElement = document.getElementById("transactionIdAdd");
      transactionIdElement.value = headId;
      var typeAdd = document.getElementById("typeAdd");
      typeAdd.value = documentType;
      var documentTypeAdd = document.getElementById("documentTypeAdd");
      var clientAdd = document.getElementById("clientAdd");
      clientAdd.value = client;
      var warehouseAdd = document.getElementById("warehouseAdd");
      warehouseAdd.value = warehouse;
    }
  } else {
    $("#edit").css("display", "none");
  }

  // var documentTypeStringValue  = findValueByClassWithinArray(props.selected.childNodes, "Type");

  return (
    <div className="edit" id="edit">
      <div className="header_part">
        <h1 id="close_add">X</h1>
      </div>

      <div className="body_part">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 mx-auto">
              <div className="form-group row">
                <label htmlFor="transactionId">Transakcija</label>
                <input
                  type="text"
                  className="form-control"
                  id="transactionIdAdd"
                  disabled
                />
              </div>
              <div className="form-group row">
                <label htmlFor="inputFirstname">Tip</label>
                <input
                  type="text"
                  className="form-control"
                  id="typeAdd"
                  disabled
                />
              </div>

              <div className="form-group row">
                <label htmlFor="inputFirstname">Naročnik</label>
                <input
                  type="text"
                  className="form-control"
                  id="clientAdd"
                  disabled
                />
              </div>
              <div className="form-group row">
                <label htmlFor="inputFirstname">Skladišče</label>
                <input
                  type="text"
                  className="form-control"
                  id="warehouseAdd"
                  disabled
                />
              </div>

              <div className="form-group row">
                <div className="col-sm-6"></div>
                <div className="col-sm-6"></div>
              </div>

              <div className="editable-group">
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="inputFirstname">Ident</label>
                    <Select
                      placeholder={"Ident"}
                      id="identListControl"
                      options={identList}
                      onChange={(e) => onChangeIdent(e)}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="inputAddressLine2">Pozicija</label>
                    <input
                      type="text"
                      className="form-control"
                      id="positionNumber"
                      placeholder="Pozicija"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="inputCity">Naročilo</label>

                    <Select
                      placeholder="Naročilo"
                      id="orderInformationAdd"
                      options={orderData}
                      onRenderOption={onRenderOrderAdd}
                      onChange={onChangeOrder}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="inputState">Odprta količina</label>
                    <input
                      type="text"
                      className="form-control"
                      id="openQty"
                      placeholder="Količina"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6">
                    <label htmlFor="inputContactNumber">Količina</label>
                    <input
                      type="number"
                      className="form-control"
                      id="inputContactNumberForm"
                      value={"0"}
                      placeholder="Količina"
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="inputWebsite">Datum dobave</label>
                    <input
                      type="text"
                      className="form-control"
                      id="deadlineDate"
                      placeholder="Datum dobave"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary px-4 float-right"
              >
                Dodaj poziciju
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
