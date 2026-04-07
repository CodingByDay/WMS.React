import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { MdAdd } from "react-icons/md";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupCloseButton from "../components/PopupCloseButton";

function EditOrderPosition(props) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (props.shown) {
      setQuantity(props.object.FullQty);
    }
  }, [props.shown, props.quantity, props.object]);

  function isFloat(n) {
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/)) > 0;
  }

  const handleOk = () => {
    props.close();

    if (quantity == null) {
      return;
    }
    if (quantity && isFloat(quantity)) {
      props.communicate("position", "update", quantity);
    } else {
      window.showAlert(
        "Informacija",
        "Morate vpisati pravilno količino",
        "error",
      );
      return;
    }
  };
  const handleInputChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div>
      <Popup
        className="wms-listing-edit-qty"
        position="right center"
        open={props.shown}
        onClose={props.close}
      >
        <div className="wms-edit-order-position-popup">
          <div className="wms-popup-header">
            <PopupCloseButton onClick={props.close} />
          </div>
          <div className="quantity-form-update">
            <label htmlFor="quantity">Količina:</label>
            <Input
              id="quantity"
              value={quantity}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Vnesite količino"
            />
          </div>

          <div className="wms-popup-footer-actions">
            <span
              className="actions smallerr"
              onClick={handleOk}
              id="updateQuantity"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOk();
                }
              }}
            >
              <span className="wms-action-label">Potrdi</span>
              <MdAdd />
            </span>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default EditOrderPosition;
