import DataAccess from "../utility/DataAccess";

const TableBody = (props) => {
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }

  var tableData = props.tableData;
  var table = props.table;

  if (window.location.href.includes("transactions") && table == "location") {
    var columns = props.columns;
    var tableDataInner = props.tableData;
    return (
      <tbody>
        {tableDataInner.map((data, index) => {
          return (
            <tr>
              {columns.map(({ accessor }) => {
                if (accessor == "Chosen") {
                  return <td key={uuid()} className={accessor}></td>;
                }

                var tData = data[`${accessor}`];
                try {
                } catch (e) {}
                return (
                  <td key={uuid()} className>
                    {tData}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  if (window.location.href.includes("stock") && table == "stock") {
    var columns = props.columns;
    var tableDataInner = props.tableData;
    return (
      <tbody>
        {tableDataInner.map((data, index) => {
          return (
            <tr>
              {columns.map(({ accessor }) => {
                var tData = data[`${accessor}`];
                try {
                } catch (e) {}
                return (
                  <td key={uuid()} className>
                    {tData}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  try {
    var len = tableData.Items.length;
  } catch (e) {
    return null;
  }

  if (window.location.href.includes("transactions") && table == "heads") {
    // TODO: Conditional sorting

    var columns = props.columns;
    var returnRow = props.returnRow;

    function findIndex(array, accesor) {
      for (var i = 0; i < array.Properties.Items.length; i++) {
        if (array.Properties.Items[i].Name == accesor) {
          return i;
        }
      }
      return -1;
    }

    function getColumn(accessor) {
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].accessor == accessor) {
          return columns[i];
        }
      }
    }

    const getColumnData = (event) => {
      var parent = event.target.parentElement;
      returnRow(parent);
    };

    window.data = tableData;

    for (var i = 0; i < tableData.Items.length; i++) {
      if (
        tableData.selector ==
        DataAccess.getData(tableData.Items[i], "HeadID", "IntValue")
      ) {
        tableData.Items[i] = DataAccess.setDataSelected(
          tableData.Items[i],
          "➤",
        );
      } else {
        tableData.Items[i] = DataAccess.setDataSelected(tableData.Items[i], "");
      }
    }

    tableData = tableData.Items.filter((data) => {
      if (typeof props.sort == "undefined") {
        return true;
      }
      var term = props.sort.selectedBusinessEvent.toLowerCase();

      var field = DataAccess.getData(
        data,
        "DocumentType",
        "StringValue",
      ).toLowerCase();
      if (!field.includes(term) && term != "") {
        return false;
      }

      return true;
    })
      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var term = props.sort.selectedTransationType.toLowerCase();

        var field = DataAccess.getData(
          data,
          "Type",
          "StringValue",
        ).toLowerCase();

        switch (term) {
          case "izdaja blaga":
            if (field == "p") {
              return true;
            } else {
              return false;
            }

          case "prevzem blaga":
            if (field == "i") {
              return true;
            } else {
              return false;
            }
          case "medskladišnica":
            if (field == "e") {
              return true;
            } else {
              return false;
            }
          case "delovni nalog":
            if (field == "w" || field == "wi") {
              return true;
            } else {
              return false;
            }
          case "inventura":
            if (field == "n" || field == "ni" || field == "np") {
              return true;
            } else {
              return false;
            }
        }

        if (!field.includes(term) && term != "") {
          return false;
        }

        return true;
      })
      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var term = props.sort.selectedClient.toLowerCase();

        var field = DataAccess.getData(
          data,
          "Receiver",
          "StringValue",
        ).toLowerCase();

        if (!field.includes(term) && term != "") {
          return false;
        }

        return true;
      })

      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var term = props.sort.selectedTransactionId;

        var field = DataAccess.getData(data, "HeadID", "IntValue");

        if (term == "") {
          return true;
        }

        if (field != term) {
          return false;
        }

        return true;
      })
      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var term = props.sort.selectedErpKey.toLowerCase();

        var field = DataAccess.getData(
          data,
          "Key",
          "StringValue",
        ).toLowerCase();

        if (!field.includes(term) && term != "") {
          return false;
        }

        return true;
      })
      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var term = props.sort.selectedStatus.toLowerCase();

        var field = DataAccess.getData(
          data,
          "Status",
          "StringValue",
        ).toLowerCase();

        if (field != term && term != "") {
          return false;
        }
        return true;
      })
      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var term = props.sort.selectedUser.toLowerCase();

        var field = DataAccess.getData(
          data,
          "ClerkName",
          "StringValue",
        ).toLowerCase();

        if (!field.includes(term) && term != "") {
          return false;
        }

        return true;
      })
      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var term = props.sort.selectedWorkOrder.toLowerCase();

        var field = DataAccess.getData(
          data,
          "LinkKey",
          "StringValue",
        ).toLowerCase();

        if (!field.includes(term) && term != "") {
          return false;
        }

        return true;
      })
      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var dateFrom = props.sort.period[0].startDate;

        var endDate = props.sort.period[0].endDate;

        var today = new Date();

        if (
          dateFrom.toISOString() === endDate.toISOString() &&
          dateFrom.toDateString() === today.toDateString()
        ) {
          return true;
        }

        var field = DataAccess.getData(data, "Date", "DateTimeValue");

        var deadline = new Date(field);

        if (dateFrom <= deadline && endDate >= deadline) {
          return true;
        } else {
          return false;
        }
      });

    return (
      <tbody>
        {tableData.map((data, index) => {
          return (
            <tr key={uuid()} onClick={getColumnData} className="row-style">
              {columns.map(({ accessor }) => {
                var column = getColumn(accessor);

                var tData = "";
                try {
                  tData = "";
                  if (column.accessor == "Type") {
                    switch (
                      DataAccess.getData(data, column.accessor, column.type)
                    ) {
                      case "E":
                        tData = "Medskladišnica";
                        break;
                      case "I":
                        tData = "Prevzem";
                        break;
                      case "P":
                        tData = "Izdaja";
                        break;
                      case "W":
                        tData = "Delovni nalog";
                        break;
                      case "WI":
                        tData = "Delovni nalog";
                        break;
                      case "N":
                        tData = "Inventura";
                        break;
                      case "NI":
                        tData = "Inventura";
                        break;
                      case "NP":
                        tData = "Inventura";
                        break;
                    }
                  } else {
                    tData = DataAccess.getData(
                      data,
                      column.accessor,
                      column.type,
                    );
                  }
                } catch (e) {
                  // Test
                }

                var type = DataAccess.getData(data, "Type", "StringValue");
                if (type == "E" && column.accessor == "Receiver") {
                  return (
                    <td key={uuid()} className={accessor}>
                      Interno
                    </td>
                  );
                } else if (type == "E" && column.accessor == "WharehouseName") {
                  var fromWhere = DataAccess.getData(
                    data,
                    "Issuer",
                    "StringValue",
                  );
                  var toWhere = DataAccess.getData(
                    data,
                    "Receiver",
                    "StringValue",
                  );
                  return (
                    <td key={uuid()} className={accessor}>
                      {fromWhere + "-" + toWhere}
                    </td>
                  );
                }
                return (
                  <td key={uuid()} className={accessor}>
                    {tData}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  } else if (
    !window.location.href.includes("transactions") &&
    table == "heads"
  ) {
    if (typeof tableData.Items != "undefined") {
      // Part that sets the selection
      for (var i = 0; i < tableData.Items.length; i++) {
        var match = DataAccess.getData(
          tableData.Items[i],
          "Key",
          "StringValue",
        ).toString();
        var target = tableData.selector;
        if (tableData.selector == match) {
          tableData.Items[i] = DataAccess.setDataSelected(
            tableData.Items[i],
            "➤",
          );
        } else {
          tableData.Items[i] = DataAccess.setDataSelected(
            tableData.Items[i],
            "",
          );
        }
      }
    }

    tableData = tableData.Items.filter((data) => {
      if (typeof props.sort == "undefined") {
        return true;
      }

      var term = props.sort.type.toLowerCase();
      var field = DataAccess.getData(
        data,
        "DocumentType",
        "StringValue",
      ).toLowerCase();
      if (!field.includes(term) && term != "") {
        return false;
      }
      return true;
    })
      .filter((data) => {
        // TODO: Conditional sorting

        if (typeof props.sort == "undefined") {
          return true;
        }
        var term = props.sort.document.toLowerCase();
        var field = DataAccess.getData(
          data,
          "Key",
          "StringValue",
        ).toLowerCase();

        if (!field.includes(term) && term != "") {
          return false;
        }
        return true;
      })
      .filter((data) => {
        // TODO: Conditional sorting

        if (typeof props.sort == "undefined") {
          return true;
        }
        var term = props.sort.client.toLowerCase();
        var field = DataAccess.getData(
          data,
          "Receiver",
          "StringValue",
        ).toLowerCase();

        if (!field.includes(term) && term != "") {
          return false;
        }
        return true;
      })
      .filter((data) => {
        if (typeof props.sort == "undefined") {
          return true;
        }

        var dateFrom = props.sort.period[0].startDate;
        var endDate = props.sort.period[0].endDate;
        var today = new Date();

        if (
          dateFrom.toISOString() === endDate.toISOString() &&
          dateFrom.toDateString() === today.toDateString()
        ) {
          return true;
        }

        var field = DataAccess.getData(
          data,
          "DeliveryDeadline",
          "DateTimeValue",
        );

        var deadline = new Date(field);

        if (dateFrom <= deadline && endDate >= deadline) {
          return true;
        } else {
          return false;
        }
      });

    // TODO: Conditional sorting

    var columns = props.columns;
    var returnRow = props.returnRow;

    function findIndex(array, accesor) {
      for (var i = 0; i < array.Properties.Items.length; i++) {
        if (array.Properties.Items[i].Name == accesor) {
          return i;
        }
      }
      return -1;
    }

    function getColumn(accessor) {
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].accessor == accessor) {
          return columns[i];
        }
      }
    }

    const getColumnData = (event) => {
      var parent = event.target.parentElement;
      returnRow(parent);
    };

    return (
      <tbody>
        {tableData.map((data, index) => {
          return (
            <tr key={uuid()} onClick={getColumnData}>
              {columns.map(({ accessor }) => {
                var column = getColumn(accessor);

                var tData = "";

                try {
                  if (column.type != "DateTimeValue") {
                    tData = DataAccess.getData(
                      data,
                      column.accessor,
                      column.type,
                    );
                  } else {
                    tData = new Date(
                      DataAccess.getData(data, column.accessor, column.type),
                    ).toLocaleDateString();
                  }
                } catch (e) {}

                if (accessor === "Status") {
                  return (
                    <td key={uuid()} className={accessor}>
                      Odprt
                    </td>
                  );
                }

                return (
                  <td key={uuid()} className={accessor}>
                    {tData}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  } else if (
    window.location.href.includes("transactions") &&
    table == "positions"
  ) {
    var columns = props.columns;
    var returnRow = props.returnRow;

    function findIndex(array, accesor) {
      for (var i = 0; i < array.Properties.Items.length; i++) {
        if (array.Properties.Items[i].Name == accesor) {
          return i;
        }
      }
      return -1;
    }

    function getColumn(accessor) {
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].accessor == accessor) {
          return columns[i];
        }
      }
    }

    const getColumnData = (event) => {
      var parent = event.target.parentElement;

      returnRow(parent);
    };

    if (typeof tableData.Items != "undefined") {
      // Part that sets the selection
      for (var i = 0; i < tableData.Items.length; i++) {
        var match = DataAccess.getData(
          tableData.Items[i],
          "ItemID",
          "IntValue",
        ).toString();
        var target = tableData.selector;
        if (tableData.selector == match) {
          tableData.Items[i] = DataAccess.setDataSelected(
            tableData.Items[i],
            "➤",
          );
        } else {
          tableData.Items[i] = DataAccess.setDataSelected(
            tableData.Items[i],
            "",
          );
        }
      }
    }

    tableData = tableData.Items;
    return (
      <tbody>
        {tableData.map((data, index) => {
          return (
            <tr key={uuid()} onClick={getColumnData}>
              {columns.map(({ accessor }) => {
                var column = getColumn(accessor);

                var tData = "";
                try {
                  tData = DataAccess.getData(
                    data,
                    column.accessor,
                    column.type,
                  );
                } catch (e) {}
                return <td className={accessor}>{tData}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    );
  } else if (
    !window.location.href.includes("transactions") &&
    table == "positions"
  ) {
    var columns = props.columns;
    var returnRow = props.returnRow;

    if (typeof tableData.Items !== "undefined") {
      // Part that sets the selection
      for (var i = 0; i < tableData.Items.length; i++) {
        var match = DataAccess.getData(
          tableData.Items[i],
          "No",
          "IntValue",
        ).toString();

        if (tableData.selector == match) {
          tableData.Items[i] = DataAccess.setDataSelected(
            tableData.Items[i],
            "➤",
          );
        } else {
          tableData.Items[i] = DataAccess.setDataSelected(
            tableData.Items[i],
            "",
          );
        }
      }
    } else {
    }

    function findIndex(array, accesor) {
      for (var i = 0; i < array.Properties.Items.length; i++) {
        if (array.Properties.Items[i].Name == accesor) {
          return i;
        }
      }
      return -1;
    }

    function getColumn(accessor) {
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].accessor == accessor) {
          return columns[i];
        }
      }
    }

    const getColumnData = (event) => {
      var parent = event.target.parentElement;
      returnRow(parent);
    };

    tableData = tableData.Items;

    return (
      <tbody>
        {tableData.map((data, index) => {
          return (
            <tr key={uuid()} onClick={getColumnData}>
              {columns.map(({ accessor }) => {
                var column = getColumn(accessor);
                var tData = "";

                try {
                  tData = DataAccess.getData(
                    data,
                    column.accessor,
                    column.type,
                  );
                } catch (e) {}

                return (
                  <td key={uuid()} className={accessor}>
                    {tData}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
};

export default TableBody;
