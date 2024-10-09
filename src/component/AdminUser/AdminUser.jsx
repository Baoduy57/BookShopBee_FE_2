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
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserService";

const AdminUser = () => {
  const [form] = Form.useForm();

  const [rowSelected, setRowSelected] = useState("");

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [isPendingUpdate, setIsPendingUpdate] = useState(false);

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const user = useSelector((state) => state?.user);
  const [stateUser, setstateUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const [stateUserDetails, setstateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, rests, token);
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;

    const res = UserService.deleteManyUser(ids, token);
    return res;
  });
  const getAllUsers = async () => {
    const res = await UserService.getAllUser(); // Truyền token vào API
    return res;
  };

  // const fetchGetDetailsUser = async (rowSelected) => {
  //   const res = await UserService.getDetailsUser(rowSelected);
  //   if (res?.data) {
  //     setstateUserDetails({
  //       name: res?.data?.name,
  //       email: res?.data?.email,
  //       phone: res?.data?.phone,
  //       isAdmin: res?.data?.isAdmin,
  //     });
  //   }
  //   setIsPendingUpdate(false);
  // };

  const fetchGetDetailsUser = async (rowSelected) => {
    const token = user?.access_token;
    if (!token) {
      console.error("No token available");
      return;
    }
    const res = await UserService.getDetailsUser(rowSelected, token);
    if (res?.data) {
      setstateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
      });
    }
    setIsPendingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleEditProduct = () => {
    if (rowSelected) {
      setIsPendingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
    setIsOpenDrawer(true);
  };

  const handleDeleteManyUser = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const {
    data: dataDeletedMany,
    isPending: isPendingDeletedMany,
    isSuccess: isSuccessDeletedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { isLoading: isLoadingUsers, data: users } = queryUser;

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
          onClick={() => {
            setIsModalOpenDelete(true);
          }}
        ></DeleteOutlined>
        <EditOutlined
          style={{ color: "orange", fontSize: "25px", cursor: "pointer" }}
          onClick={handleEditProduct}
        ></EditOutlined>
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText("");
  };

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
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
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
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",

      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  // const dataTable =
  //   users?.data?.length &&
  //   users?.data?.map((user) => {
  //     return {
  //       ...user,
  //       key: user._id,
  //       isAdmin: user?.isAdmin ? "TRUE" : "FALSE",
  //     };
  //   });
  const dataTable = users?.data?.length
    ? users.data.map((user) => ({
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "TRUE" : "FALSE",
      }))
    : [];
  console.log("users", users);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      Message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      Message.error();
    }
  }, [isSuccessDeleted, isErrorDeleted, dataDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
      Message.success();
    } else if (isErrorDeletedMany) {
      Message.error();
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setstateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      Message.success();

      handleCloseDrawer(); // Đảm bảo bạn đóng Drawer
    } else if (isErrorUpdated) {
      Message.error();
    }
  }, [isSuccessUpdated, isErrorUpdated, dataUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          setRowSelected(""); // Xóa hàng đã chọn
          queryUser.refetch();
        },
      }
    );
  };

  const handleOnchangeDetails = (e) => {
    setstateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  // const handleOnchangeAvatar = async ({ fileList }) => {
  //   // Kiểm tra file đầu tiên có tồn tại không
  //   const file = fileList?.[0];
  //   if (file) {
  //     // Kiểm tra xem file đã có url hoặc preview chưa
  //     if (!file.url && !file.preview) {
  //       file.preview = await getBase64(file.originFileObj); // Chuyển file thành base64
  //     }
  //     // Cập nhật state avatar với ảnh preview
  //     setstateUser({
  //       ...stateUser, // Giữ nguyên các thuộc tính khác của state
  //       image: file.preview, // Cập nhật ảnh mới
  //     });
  //   }
  // };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList?.[0];
    if (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      if (file.preview) {
        setstateUser((prev) => ({
          ...prev,
          image: file.preview,
        }));
      }
    }
  };

  // const handleOnchangeAvatarDetails = async ({ fileList }) => {
  //   // Kiểm tra file đầu tiên có tồn tại không
  //   const file = fileList?.[0];
  //   if (file) {
  //     // Kiểm tra xem file đã có url hoặc preview chưa
  //     if (!file.url && !file.preview) {
  //       file.preview = await getBase64(file.originFileObj); // Chuyển file thành base64
  //     }
  //     // Cập nhật state avatar với ảnh preview
  //     setstateUserDetails({
  //       ...stateUserDetails, // Giữ nguyên các thuộc tính khác của state
  //       image: file.preview, // Cập nhật ảnh mới
  //     });
  //   }
  // };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList?.[0];
    if (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      if (file.preview) {
        setstateUserDetails((prev) => ({
          ...prev,
          image: file.preview,
        }));
      }
    }
  };

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        ...stateUserDetails,
        token: user?.access_token,
      },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };
  return (
    <div>
      <WrapperHeader>User Management</WrapperHeader>

      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDeleteMany={handleDeleteManyUser}
          columns={columns}
          isPending={isLoadingUsers}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        ></TableComponent>
      </div>

      <DrawerComponent
        forceRender
        title="User Details"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="70%"
      >
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            {/* <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <WrapperUploadFile
                fileList={
                  stateUserDetails?.image
                    ? [{ url: stateUserDetails.image }]
                    : []
                }
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateUserDetails?.image && (
                  <img
                    src={stateUserDetails?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "25px",
                    }}
                    alt="avatar"
                  ></img>
                )}
              </WrapperUploadFile>
            </Form.Item> */}

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Delete User"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Are you sure to delete this user?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
