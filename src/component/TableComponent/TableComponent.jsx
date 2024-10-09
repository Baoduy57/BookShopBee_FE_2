import { Table } from "antd";
import React, { useState } from "react";
import Loading from "../LoadingComponent/Loading";

const TableComponent = (props) => {
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const {
    selectionType = "checkbox",
    data = [],
    isPending = false,
    columns = [],
    handleDeleteMany,
  } = props;

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
      <Table
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
