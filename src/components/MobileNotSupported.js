import { useTranslation } from "react-i18next";

import LanguageSwitcher from "./LanguageSwitcher";

/**
 * Full-screen notice when the client is detected as mobile / tablet.
 * No routes or API access — blocks the rest of the app.
 */
export default function MobileNotSupported() {
  const { t } = useTranslation();

  return (
    <div className="login">
      <div className="whole-auth">
        <div className="navbar auth">
          <LanguageSwitcher variant="auth" />
          <center>
            <div className="logo">
              <img
                src="logo-wms.png"
                className="logo"
                alt="Riko WMS"
                height={70}
              />
            </div>
          </center>
        </div>

        <div className="Auth-form-container">
          <div className="Auth-form-content wms-mobile-blocked" role="alert">
            <center>
              <h1 className="riko-blue">{t("mobileNotSupported.title")}</h1>
            </center>
            <p className="label-gray">{t("mobileNotSupported.message")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
