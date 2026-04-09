import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ImportOrderChoice(props) {
  const { t } = useTranslation();

  function setChosenState(sheet) {
    props.onChosen(sheet);
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
            <h4>{t("import.chooseOrderImportMode")}</h4>
          </div>

          <div className="choices-order wms-import-order-mode-choices">
            <button
              className="actions smallerr"
              onClick={() => setChosenState("head")}
            >
              {t("import.orderHeads")}
            </button>
            <button
              className="actions smallerr"
              onClick={() => setChosenState("position")}
            >
              {t("import.orderLines")}
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
