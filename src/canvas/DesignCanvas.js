import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";
import WmsHomeTiles from "../components/WmsHomeTiles";
import "./DesignCanvas.css";

/**
 * Design system preview: tokens, spacing/type samples, and home menu layout.
 * See src/design/DESIGN_PLAN.md
 */
export default function DesignCanvas() {
  const { t } = useTranslation();
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
            {t("canvas.backToDashboard")}
          </Link>
          <span className="wms-canvas__badge">{t("canvas.badge")}</span>
        </div>

        <section className="wms-canvas__section" aria-labelledby="canvas-tokens">
          <h1 id="canvas-tokens" className="wms-home-title">
            {t("canvas.title")}
          </h1>
          <p className="wms-home-subtitle">{t("canvas.subtitle")}</p>
        </section>

        <section className="wms-canvas__section" aria-labelledby="canvas-colors">
          <h2 id="canvas-colors" className="wms-canvas__h2">
            {t("canvas.colorsHeading")}
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
            {t("canvas.spacingHeading")}
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
            {t("canvas.typographyHeading")}
          </h2>
          <div className="wms-canvas__type-samples">
            <p className="wms-type-3xl">{t("canvas.typeLine1")}</p>
            <p className="wms-type-2xl">{t("canvas.typeLine2")}</p>
            <p className="wms-type-base">{t("canvas.typeLine3")}</p>
            <p className="wms-type-sm">{t("canvas.typeLine4")}</p>
          </div>
        </section>

        <section
          className="wms-canvas__section"
          aria-labelledby="canvas-menu-preview"
        >
          <h2 id="canvas-menu-preview" className="wms-canvas__h2">
            {t("canvas.menuPreviewHeading")}
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
