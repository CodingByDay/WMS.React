// VersionInfo.js

import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const VersionInfo = () => {
  const version = process.env.REACT_APP_VERSION; // Access version from environment variables
  const notes = process.env.REACT_APP_VERSION_TEXT;

  return (
    <div className="version-info">
      <div className="version-number">{`Verzija ${version}`}</div>
      <FaInfoCircle className="info-icon" />
      {notes && <div className="tooltip">{notes}</div>}
    </div>
  );
};

export default VersionInfo;
