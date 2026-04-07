import $ from "jquery";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import IssuedGoods from "../popup/IssuedGoods";
import Interwarehouse from "../popup/Interwarehouse";
import TakeOver from "./TakeOver";
import WorkOrder from "./WorkOrder";
import Inventory from "./Inventory";
import { MdAdd } from "react-icons/md";
import PopupCloseButton from "../components/PopupCloseButton";
import { useTranslation } from "react-i18next";
import { trHeader } from "../i18n/headerMap";
import { getListingOrderSelectStyles } from "../utility/listingFormSelectStyles";

export default function AddHeadDocument(props) {
  const { t } = useTranslation();
  const transactionTypeSelectStyles = useMemo(
    () => getListingOrderSelectStyles(),
    [],
  );
  var component = null;

  const [documentType, setDocumentType] = useState([]);
  const [type, setType] = useState({
    value: "Izdaja blaga",
    label: "Izdaja blaga",
  });
  const [conditional, setConditional] = useState();
  const [selectedOption, setSelectedOption] = useState({
    value: "Izdaja blaga",
    label: "Izdaja blaga",
  });
  var isOrder = true;
  useEffect(() => {
    if (props.order) {
      setDocumentType([
        { value: "Izdaja blaga", label: "Izdaja blaga" },
        { value: "Prevzem blaga", label: "Prevzem blaga" },
      ]);
    } else {
      setDocumentType([
        { value: "Izdaja blaga", label: "Izdaja blaga" },
        { value: "Prevzem blaga", label: "Prevzem blaga" },
      ]);
    }

    if (type !== undefined) {
      switch (type.value) {
        case "Izdaja blaga":
          component = (
            <IssuedGoods
              order={isOrder}
              close={close}
              type={props.type}
              render={props.render}
              refreshListingAfterOrder={props.refreshListingAfterOrder}
            />
          );
          setConditional(component);
          break;
        case "Prevzem blaga":
          component = (
            <TakeOver
              close={close}
              order={isOrder}
              type={props.type}
              render={props.render}
              refreshListingAfterOrder={props.refreshListingAfterOrder}
            />
          );
          setConditional(component);
          break;
        case "Medskladišnica":
          component = (
            <Interwarehouse
              close={close}
              order={isOrder}
              type={props.type}
              render={props.render}
            />
          );
          setConditional(component);
          break;
        case "Inventura":
          component = (
            <Inventory
              close={close}
              order={isOrder}
              type={props.type}
              render={props.render}
            />
          );
          setConditional(component);
          break;
        case "Delovni nalog":
          component = (
            <WorkOrder
              close={close}
              order={isOrder}
              type={props.type}
              render={props.render}
            />
          );
          setConditional(component);
      }
    }
  }, [type]);

  const close = () => {
    props.changeVisibility(false);
  };

  function onChangeTypePopup(e) {
    const mutated = { value: e.value, label: e.label };
    setType(mutated);

    setSelectedOption(mutated);
  }

  if (!props.show) {
    return;
  } else {
    $("#addHeader").css("display", "none");
  }

  return (
    <div className="popup-overlay add" id="add-overlay">
      <div className="popup-content add wms-popup-shell">
        <div className="popup-header add wms-popup-header">
          <PopupCloseButton onClick={close} />
        </div>
        <div className="popup-body add wms-listing-head-form wms-listing-head-form--type">
          <label className="wms-field-label" htmlFor="transactionTypePopup-input">
            {trHeader("Vrsta dokumenta", t)}
          </label>
          <div className="wms-field-control">
            <Select
              className="select-filters wms-listing-head-form__select"
              styles={transactionTypeSelectStyles}
              inputId="transactionTypePopup-input"
              value={selectedOption}
              onChange={onChangeTypePopup}
              placeholder={trHeader("Vrsta dokumenta", t)}
              options={documentType}
              id="transactionTypePopup"
            />
          </div>
        </div>
        {conditional}
      </div>
    </div>
  );
}
