import Header from "./Header";
import { useEffect } from "react";
import Loader from "../loader/Loader";
import {
  DashboardControl,
  DataRequestOptions,
} from "devexpress-dashboard-react";
import { DashboardPanelExtension } from "devexpress-dashboard/common";

export default function Analytics() {
  const analyticsUrl = process.env.REACT_APP_ANALYTICS_URL;

  useEffect(() => {
    // [Eliminate] - loader delay was removed; keep hook for future analytics init if needed
  }, []);

  function onBeforeRender(sender) {
    var dashboardControl = sender.component;
    dashboardControl.registerExtension(
      new DashboardPanelExtension(dashboardControl),
    );
    dashboardControl.unregisterExtension("designerToolbar");
  }

  return (
    <div id="analytics-panel">
      <Loader />
      <Header />

      <div
        className="dashboard-div"
        style={{
          position: "absolute",
          height: "85%",
          top: "8em",
          left: "0px",
          right: "0px",
          bottom: "0px",
        }}
      >
        <DashboardControl
          className="dashboard-control-devexpress"
          onBeforeRender={onBeforeRender}
          endpoint={analyticsUrl}
          limitVisibleDataMode="DesignerAndViewer"
          defaultWorkingMode="Viewer"
        >
          <DataRequestOptions itemDataRequestMode="batch"></DataRequestOptions>
        </DashboardControl>
      </div>
    </div>
  );
}
