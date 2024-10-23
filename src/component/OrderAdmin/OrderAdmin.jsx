import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import Loading from "../LoadingComponent/Loading";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import * as Message from "../../component/Message/Message";
import { convertPrice, getBase64 } from "../../utils";
import * as OrderService from "../../services/OrderService";
import { orderContant } from "../../contant";
import PieChartComponent from "../../pages/PaymentPage/PieChart";

const OrderAdmin = () => {
  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token); // Truyền token vào API
    return res;
  };

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrder,
  });

  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          //   ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          //   onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),

    onFilter: (value, record) => {
      const recordValue = record[dataIndex];
      return recordValue
        ? recordValue.toString().toLowerCase().includes(value.toLowerCase())
        : false;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },

    //   render: (text) =>
    //     searchedColumn === dataIndex ? (
    //       <Highlighter
    //         highlightStyle={{
    //           backgroundColor: '#ffc069',
    //           padding: 0,
    //         }}
    //         searchWords={[searchText]}
    //         autoEscape
    //         textToHighlight={text ? text.toString() : ''}
    //       />
    //     ) : (
    //       text
    //     ),
  });

  const columns = [
    {
      title: "User name",
      dataIndex: "userName",
      sorter: (a, b) => (a.userName?.length || 0) - (b.userName?.length || 0),
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => (a.phone?.length || 0) - (b.phone?.length || 0),
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => (a.address?.length || 0) - (b.address?.length || 0),
      ...getColumnSearchProps("address"),
    },
    {
      title: "Items price",
      dataIndex: "itemsPrice",
      sorter: (a, b) =>
        (a.itemsPrice?.length || 0) - (b.itemsPrice?.length || 0),
      ...getColumnSearchProps("itemsPrice"),
    },
    {
      title: "Shipping price",
      dataIndex: "shippingPrice",
      sorter: (a, b) =>
        (a.shippingPrice?.length || 0) - (b.shippingPrice?.length || 0),
      ...getColumnSearchProps("shippingPrice"),
    },

    {
      title: "Paided",
      dataIndex: "isPaid",
      sorter: (a, b) => (a.isPaid?.length || 0) - (b.isPaid?.length || 0),
      ...getColumnSearchProps("isPaid"),
    },
    // {
    //   title: "Shipped",
    //   dataIndex: "isDelivered",
    //   sorter: (a, b) =>
    //     (a.isDelivered?.length || 0) - (b.isDelivered?.length || 0),
    //   ...getColumnSearchProps("isDelivered"),
    // },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
      sorter: (a, b) =>
        (a.paymentMethod?.length || 0) - (b.paymentMethod?.length || 0),
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      sorter: (a, b) =>
        (a.totalPrice?.length || 0) - (b.totalPrice?.length || 0),
      ...getColumnSearchProps("totalPrice"),
    },
  ];
  const dataTable = orders?.data?.length
    ? orders.data.map((order) => ({
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        itemsPrice: convertPrice(order?.itemsPrice),
        shippingPrice: convertPrice(order?.shippingPrice),
        totalPrice: convertPrice(order?.totalPrice),
        isPaid: order?.isPaid ? "TRUE" : "FALSE",
        // isDelivered: order?.isDelivered ? "TRUE" : "FALSE",
        paymentMethod: orderContant.payment[order?.paymentMethod],
      }))
    : [];

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ height: 200, width: 200 }}>
        <PieChartComponent data={orders?.data} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isPending={isLoadingOrders}
          data={dataTable}
        ></TableComponent>
      </div>
    </div>
  );
};

export default OrderAdmin;
