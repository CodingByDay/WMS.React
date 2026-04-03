import "./WmsHomeTiles.css";
import { WMS_HOME_TILES } from "./wmsHomeTilesConfig";

/**
 * Legacy main menu layout: full-width stacked navy rows, label + icon (same as pre-card UI).
 * @param {{ onSelect: (key: string) => void }} props
 */
export default function WmsHomeTiles({ onSelect }) {
  return (
    <div className="wms-home-menu" role="navigation" aria-label="Glavni meni">
      {WMS_HOME_TILES.map((tile) => (
        <button
          key={tile.key}
          type="button"
          className="wms-home-menu__btn"
          onClick={() => onSelect(tile.key)}
        >
          <span className="wms-home-menu__label">{tile.label}</span>
          <img
            src={tile.icon}
            alt=""
            width={100}
            height={64}
            className="wms-home-menu__icon"
            draggable={false}
          />
        </button>
      ))}
    </div>
  );
}
