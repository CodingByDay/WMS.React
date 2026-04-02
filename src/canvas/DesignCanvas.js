import { useNavigate, Link } from "react-router-dom";
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import WmsHomeTiles from "../components/WmsHomeTiles";
import "./DesignCanvas.css";

/**
 * Design system preview: tokens, spacing/type samples, and home menu layout.
 * See src/design/DESIGN_PLAN.md
 */
export default function DesignCanvas() {
  const navigate = useNavigate();

  const handleTile = (key) => {
    navigate("/" + key);
  };

  return (
    <div className="wms-page">
      <Header />
      <main className="wms-main--home wms-canvas">
        <div className="wms-canvas__toolbar">
          <Link className="wms-canvas__back" to="/dashboard">
            ← Nazaj na nadzorno ploščo
          </Link>
          <span className="wms-canvas__badge">Predogled dizajna</span>
        </div>

        <section className="wms-canvas__section" aria-labelledby="canvas-tokens">
          <h1 id="canvas-tokens" className="wms-home-title">
            WMS — oblikovni sistem
          </h1>
          <p className="wms-home-subtitle">
            Spodaj so žetoni (barve, razmiki, tipografija) in predogled glavnega
            menija. Spremembe naj najprej izgledajo tukaj, nato se posodobi
            ostale zaslone.
          </p>
        </section>

        <section className="wms-canvas__section" aria-labelledby="canvas-colors">
          <h2 id="canvas-colors" className="wms-canvas__h2">
            Barve
          </h2>
          <div className="wms-canvas__swatches">
            <div className="wms-swatch">
              <div
                className="wms-swatch__chip"
                style={{ background: "var(--wms-color-primary)" }}
              />
              <span>Primary</span>
            </div>
            <div className="wms-swatch">
              <div
                className="wms-swatch__chip"
                style={{ background: "var(--wms-color-accent)" }}
              />
              <span>Accent</span>
            </div>
            <div className="wms-swatch">
              <div
                className="wms-swatch__chip wms-swatch__chip--border"
                style={{ background: "var(--wms-color-bg-elevated)" }}
              />
              <span>Surface</span>
            </div>
            <div className="wms-swatch">
              <div
                className="wms-swatch__chip"
                style={{ background: "var(--wms-color-bg-app)" }}
              />
              <span>App bg</span>
            </div>
          </div>
        </section>

        <section className="wms-canvas__section" aria-labelledby="canvas-space">
          <h2 id="canvas-space" className="wms-canvas__h2">
            Razmiki (padding / gap)
          </h2>
          <ul className="wms-canvas__scale">
            <li>
              <span className="wms-canvas__scale-label">space-2 — 8px</span>
              <span
                className="wms-canvas__scale-bar"
                style={{ width: "var(--wms-space-2)" }}
              />
            </li>
            <li>
              <span className="wms-canvas__scale-label">space-4 — 16px</span>
              <span
                className="wms-canvas__scale-bar"
                style={{ width: "var(--wms-space-4)" }}
              />
            </li>
            <li>
              <span className="wms-canvas__scale-label">space-6 — 24px</span>
              <span
                className="wms-canvas__scale-bar"
                style={{ width: "var(--wms-space-6)" }}
              />
            </li>
            <li>
              <span className="wms-canvas__scale-label">space-8 — 32px</span>
              <span
                className="wms-canvas__scale-bar"
                style={{ width: "var(--wms-space-8)" }}
              />
            </li>
          </ul>
        </section>

        <section className="wms-canvas__section" aria-labelledby="canvas-type">
          <h2 id="canvas-type" className="wms-canvas__h2">
            Tipografija
          </h2>
          <div className="wms-canvas__type-samples">
            <p className="wms-type-3xl">Naslov 30px (3xl) — redko</p>
            <p className="wms-type-2xl">Naslov 24px (2xl)</p>
            <p className="wms-type-base">Besedilo 16px (base) — privzeto</p>
            <p className="wms-type-sm">Pomožno 14px (sm) — tabele, gosti zasloni</p>
          </div>
        </section>

        <section
          className="wms-canvas__section"
          aria-labelledby="canvas-menu-preview"
        >
          <h2 id="canvas-menu-preview" className="wms-canvas__h2">
            Glavni meni (enak videz kot /dashboard)
          </h2>
          <div className="wms-canvas__menu-preview">
            <WmsHomeTiles onSelect={handleTile} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
