import { useNavigate } from "react-router-dom";

import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import $ from "jquery";

export function ImportMenu() {
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
    <div>
      <Header />
      <div className="main-menu-design">
        <div className="menu">
          <button
            className="btn btn-primary dashboard"
            onClick={() => routeChange("import-subjects")}
          >
            Subjekti
            <img alt={""} src="rating-adjusted.png" width={100} />
          </button>

          <button
            className="btn btn-primary dashboard"
            onClick={() => routeChange("import-idents")}
          >
            Identi
            <img alt={""} src="stock.png" width={100} />
          </button>

          <button
            className="btn btn-primary dashboard"
            onClick={() => routeChange("import-orders")}
          >
            Naročila
            <img alt={""} src="listing.png" width={100} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
