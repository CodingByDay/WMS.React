import React from "react";
import { useSelector } from "react-redux";
import "./GlobalLoader.css";

export default function GlobalLoader() {
  const loadingCount = useSelector((s) => s.ui?.loadingCount ?? 0);
  const visible = loadingCount > 0;

  if (!visible) return null;

  return (
    <div className="wms-global-loader" role="status" aria-live="polite">
      <div className="wms-global-loader__backdrop" />
      <img
        className="wms-global-loader__img"
        src="/loader.gif"
        alt="Loading"
        draggable="false"
      />
    </div>
  );
}

