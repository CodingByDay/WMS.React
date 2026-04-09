import { useNavigate } from "react-router-dom";

import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import $ from "jquery";
import { useTranslation } from "react-i18next";

export function ImportMenu() {
  const { t } = useTranslation();
  let navigate = useNavigate();

  /*
  <button className="btn btn-primary dashboard" id='settings-hover' onClick = { ()=>routeChange("settings") }>
    Nastavitve
    <img alt={""} src='settings.png' width={100} /> 
  </button>
  */

  function handleSettings() {
    $(".settings-divider").toggle();
    // Toggle the visibility
  }

  const routeChange = (option) => {
    let path = "/" + option;

    if (option === "logout") {
      navigate("/");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="wms-import-hub">
      <Header />
      <div className="main-menu-design">
        <div className="menu">
          <button
            className="btn btn-primary dashboard"
            onClick={() => routeChange("import-subjects")}
          >
            {t("importMenu.subjects")}
            <img alt={""} src="rating-adjusted.png" width={100} />
          </button>

          <button
            className="btn btn-primary dashboard"
            onClick={() => routeChange("import-idents")}
          >
            {t("importMenu.idents")}
            <img alt={""} src="stock.png" width={100} />
          </button>

          <button
            className="btn btn-primary dashboard"
            onClick={() => routeChange("import-orders")}
          >
            {t("importMenu.orders")}
            <img alt={""} src="listing.png" width={100} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
