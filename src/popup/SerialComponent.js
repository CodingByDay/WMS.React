import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Table from "../table/Table";
import { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";
import TransactionService from "../services/TransactionService";
import { Dropdown, Stack } from "@fluentui/react";
import DataAccess from "../utility/DataAccess";
import PopupService from "../services/PopupService";

export default function SerialComponent(props) {
  return (
    <div id="serialComponent" className="serialComponent">
      <h1>SerialComponent</h1>
    </div>
  );
}
