import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import WmsHomeTiles from "../components/WmsHomeTiles";

export function Dashboard() {
  const navigate = useNavigate();

  const handleTile = (key) => {
    navigate("/" + key);
  };

  return (
    <div className="wms-page">
      <Header />
      <main className="wms-main--home">
        <div className="wms-home-menu-host">
          <WmsHomeTiles onSelect={handleTile} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
