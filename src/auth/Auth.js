import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "../loader/Loader";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/user";
import TransactionService from "../services/TransactionService";
import DataAccess from "../utility/DataAccess";

export default function Auth(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mobile = useMemo(() => {
    return (
      Math.min(window.screen.width, window.screen.height) < 768 ||
      navigator.userAgent.indexOf("Mobi") > -1
    );
  }, []);

  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  function onKeyDownPassword(e) {
    if (e.key === "Enter") {
      handleClick();
    }
  }

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0]) &
        (15 >> (c / 4))
      ).toString(16),
    );
  }

  const handleClick = async () => {
    if (isSubmitting) return;
    setShowWrong(false);
    setIsSubmitting(true);

    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL +
          `/Services/Device/?mode=loginUser&password=${password}&i=web`,
      );

      if (response?.data?.Items?.[1]?.Name === "Error") {
        setShowWrong(true);
        return;
      }

      // Successful login
      const cookies = new Cookies();
      cookies.set("uid", uuidv4(), { path: "/" });

      // Load user list and populate redux (used by header etc.)
      try {
        const users = await TransactionService.getUsers();
        const items = users?.Items || [];
        for (let i = 0; i < items.length; i++) {
          const passwordGet = DataAccess.getData(
            items[i],
            "WMSPassword",
            "StringValue",
          );
          if (passwordGet == password) {
            const name = DataAccess.getData(
              items[i],
              "FullName",
              "StringValue",
            );
            const userId = DataAccess.getData(
              items[i],
              "UserID",
              "IntValue",
            );
            dispatch(login([name, userId]));
            localStorage.setItem("name", userId);
            localStorage.setItem("back", "/");
            break;
          }
        }
      } catch {
        // If this fails, still allow navigation (ProtectedRoute only checks uid cookie).
      }

      navigate("/dashboard");
    } catch {
      // Network/API failure: show the same wrong-password banner (keeps UX simple)
      setShowWrong(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function showMobileAlert() {
    window.showAlert(t("auth.mobileTitle"), t("auth.mobileBody"), "error");
  }

  return (
    <div className={isSubmitting ? "login disabled" : "login"}>
      {isSubmitting && <Loader />}

      <div className="whole-auth">
        <div className="navbar auth">
          <LanguageSwitcher variant="auth" />
          <center>
            <div className="logo ">
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
          <div className="Auth-form-content">
            <center>
              <h1 className="riko-blue">{t("auth.title")}</h1>
            </center>

            <div className="form-group mt-3" id="password-div">
              <label htmlFor="password" className="label-gray">
                {t("auth.passwordLabel")}
              </label>

              <input
                id="password"
                onChange={(e) => onChangePassword(e)}
                type="password"
                onKeyDown={onKeyDownPassword}
                className="form-control mt-1"
                disabled={isSubmitting}
              />
            </div>
            {showWrong && (
              <div className="alert alert-danger wrong" id="wrong" role="alert">
                {t("auth.wrongPassword")}
              </div>
            )}

            <div className="d-grid gap-2 mt-3 wms-login-actions">
              {!mobile && (
                <button
                  type="button"
                  className="wms-login-submit"
                  id="loginButton"
                  onClick={handleClick}
                  disabled={isSubmitting || !password}
                >
                  {t("auth.submit")}
                </button>
              )}

              {mobile && (
                <button
                  type="button"
                  className="wms-login-submit"
                  onClick={() => {
                    showMobileAlert();
                  }}
                >
                  {t("auth.submit")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
