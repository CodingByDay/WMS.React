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
        position="right center"
        open={props.isOpen}
        onClose={props.onClose}
      >
        <div className="outer">
          <div
            className="header"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2em",
            }}
          >
            <h4>{t("import.pickSheet")}</h4>
          </div>

          <div
            className="choices"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "5em",
            }}
          >
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
