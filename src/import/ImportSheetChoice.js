import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ImportSheetChoice(props) {
  const { t } = useTranslation();

  function setChosenSheetState(sheet) {
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
        <div className="outer wms-import-popup-panel">
          <div
            className="header wms-import-popup-header"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2em",
            }}
          >
            <h4>{t("import.pickSheet")}</h4>
          </div>

          <div className="choices wms-import-sheet-choices">
            {props.sheets.map((sheet) => (
              <button
                key={sheet}
                className="actions smallerr"
                onClick={() => setChosenSheetState(sheet)}
              >
                {sheet}
              </button>
            ))}
          </div>
        </div>
      </Popup>
    </div>
  );
}
