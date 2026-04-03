import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const base = process.env.PUBLIC_URL || "";

const LANGUAGES = [
  { code: "sl", src: `${base}/flags/flag-sl.png`, labelKey: "lang.sl" },
  { code: "en", src: `${base}/flags/flag-gb.png`, labelKey: "lang.en" },
  { code: "hr", src: `${base}/flags/flag-hr.png`, labelKey: "lang.hr" },
];

/**
 * Language switcher using navbar flag assets (public/flags). Persists via i18next (localStorage).
 */
export default function LanguageSwitcher({ variant = "header" }) {
  const { i18n, t } = useTranslation();
  const resolved = i18n.resolvedLanguage || i18n.language || "sl";
  const current = resolved.split("-")[0];

  return (
    <div
      className={`wms-lang-switcher wms-lang-switcher--${variant}`}
      role="group"
      aria-label={t("lang.switcherAria")}
    >
      {LANGUAGES.map(({ code, src, labelKey }) => {
        const active = current === code;
        const label = t(labelKey);
        return (
          <button
            key={code}
            type="button"
            className={
              active
                ? "wms-lang-switcher__btn wms-lang-switcher__btn--active"
                : "wms-lang-switcher__btn"
            }
            onClick={() => i18n.changeLanguage(code)}
            title={label}
            aria-label={label}
            aria-pressed={active}
          >
            <span className="wms-lang-switcher__crop">
              <img
                className="wms-lang-switcher__flag"
                src={src}
                alt=""
                draggable={false}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
