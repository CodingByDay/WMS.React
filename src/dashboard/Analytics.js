import Header from "./Header";
import { useCallback, useRef, useState } from "react";
import Loader from "../loader/Loader";
import {
  DashboardControl,
  DataRequestOptions,
} from "devexpress-dashboard-react";
import { DashboardPanelExtension } from "devexpress-dashboard/common";
import { useTranslation } from "react-i18next";
import { MdMenu, MdMenuOpen } from "react-icons/md";

export default function Analytics() {
  const { t } = useTranslation();
  const analyticsUrl = process.env.REACT_APP_ANALYTICS_URL;

  const dashboardControlRef = useRef(null);
  const [dashboardListVisible, setDashboardListVisible] = useState(true);

  function onBeforeRender(sender) {
    const dashboardControl = sender.component;
    dashboardControlRef.current = dashboardControl;
    dashboardControl.registerExtension(
      new DashboardPanelExtension(dashboardControl),
    );
    dashboardControl.unregisterExtension("designerToolbar");
  }

  const toggleDashboardPanel = useCallback(() => {
    const dc = dashboardControlRef.current;
    if (!dc) {
      return;
    }

    const ext =
      typeof dc.findExtension === "function"
        ? dc.findExtension("dashboardPanel")
        : null;

    if (!ext) {
      return;
    }

    const applySurface = (e) => {
      if (e && typeof e.surfaceLeft === "number" && dc.surfaceLeft) {
        dc.surfaceLeft(e.surfaceLeft);
      }
    };

    const finishHide = (e) => {
      applySurface(e);
      setDashboardListVisible(false);
    };
    const finishShow = (e) => {
      applySurface(e);
      setDashboardListVisible(true);
    };

    if (dashboardListVisible) {
      if (typeof ext.hidePanelAsync === "function") {
        const pending = ext.hidePanelAsync({});
        if (pending && typeof pending.done === "function") {
          pending.done(finishHide);
        } else if (pending && typeof pending.then === "function") {
          pending.then(finishHide);
        } else {
          finishHide({});
        }
      }
    } else if (typeof ext.showPanelAsync === "function") {
      const pending = ext.showPanelAsync({});
      if (pending && typeof pending.done === "function") {
        pending.done(finishShow);
      } else if (pending && typeof pending.then === "function") {
        pending.then(finishShow);
      } else {
        finishShow({});
      }
    }
  }, [dashboardListVisible]);

  const panelToggleIcon = (
    <button
      type="button"
      className="actions wms-analytics-panel-toggle-icon"
      onClick={toggleDashboardPanel}
      aria-pressed={dashboardListVisible}
      aria-label={
        dashboardListVisible ? t("analytics.hidePanel") : t("analytics.showPanel")
      }
      title={
        dashboardListVisible ? t("analytics.hidePanel") : t("analytics.showPanel")
      }
    >
      {dashboardListVisible ? <MdMenuOpen aria-hidden /> : <MdMenu aria-hidden />}
    </button>
  );

  return (
    <div id="analytics-panel" className="wms-analytics-layout">
      <Loader />
      <Header centerSlot={panelToggleIcon} />

      <div className="dashboard-div">
        <DashboardControl
          className="dashboard-control-devexpress"
          onBeforeRender={onBeforeRender}
          endpoint={analyticsUrl}
          limitVisibleDataMode="DesignerAndViewer"
          defaultWorkingMode="Viewer"
        >
          <DataRequestOptions itemDataRequestMode="batch" />
        </DashboardControl>
      </div>
    </div>
  );
}
