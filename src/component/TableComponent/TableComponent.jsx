import { Table } from "antd";
import React, { useMemo, useRef, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isPending = false,
    columns = [],
    handleDeleteMany,
  } = props;

  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <Loading isPending={isPending}>
      {rowSelectedKeys.length > 1 && (
        <div
          style={{
            background: "Blue",
            color: "#fff",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
          onClick={handleDeleteAll}
        >
          Delete what you selected
        </div>
      )}
      <button onClick={exportExcel}>Export to Excel</button>
      <Table
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
