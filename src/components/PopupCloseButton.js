import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";

/**
 * Consistent close control for modals / popups (replaces ad-hoc "X" text buttons).
 */
export default function PopupCloseButton({ onClick, id, className = "", type = "button" }) {
  const { t } = useTranslation();
  const merged = ["wms-popup-close", className].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      id={id}
      className={merged}
      onClick={onClick}
      aria-label={t("common.close")}
    >
      <MdClose className="wms-popup-close__icon" aria-hidden />
    </button>
  );
}
