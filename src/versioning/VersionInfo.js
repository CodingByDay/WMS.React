// VersionInfo.js

import React from "react";
import { useTranslation } from "react-i18next";
import { FaInfoCircle } from "react-icons/fa";

const VersionInfo = () => {
  const { t } = useTranslation();
  const version = process.env.REACT_APP_VERSION;
  const notes = process.env.REACT_APP_VERSION_TEXT;

  return (
    <div className="version-info">
      <div className="version-number">
        {t("version.label", { version: version ?? "" })}
      </div>
      <FaInfoCircle className="info-icon" />
      {notes && (
        <div className="tooltip">
          {t("version.tooltip", { notes })}
        </div>
      )}
    </div>
  );
};

export default VersionInfo;
