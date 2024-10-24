import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeaderProfile,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../component/InputForm/InputForm";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Button, message, Upload } from "antd";
import Loading from "../../component/LoadingComponent/Loading";
import { updateUser } from "../../redux/slides/userSlide";
import { getBase64 } from "../../utils";
import { UploadOutlined } from "@ant-design/icons";

const ProfilePage = () => {
  // useSelector: Lấy thông tin người dùng từ Redux store, bao gồm các giá trị như name, email, phone, address, và avatar.
  // useState: Sử dụng useState để lưu trữ và cập nhật giá trị nhập từ người dùng trên giao diện
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  // useMutationHooks: Được sử dụng để thực hiện yêu cầu cập nhật người dùng đến server thông qua dịch vụ UserService.updateUser.
  const mutation = useMutationHooks(async (data) => {
    const { id, access_token, ...rests } = data;
    // Gọi đúng thứ tự tham số: id, data, access_token
    return await UserService.updateUser(id, rests, access_token);
  });

  const { data, isPending, isSuccess, isError } = mutation;
  // useEffect: Khi thành phần được tải lần đầu hoặc khi thông tin người dùng thay đổi, các trường thông tin cá nhân sẽ được đặt với giá trị hiện tại của người dùng từ Redux store.
  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  // useEffect: Kiểm tra trạng thái của yêu cầu cập nhật. Nếu thành công, thông tin người dùng được cập nhật trong Redux và thông báo thành công sẽ hiện lên. Nếu thất bại, sẽ hiển thị thông báo lỗi.
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("User updated successfully");
      handleGetDetailsUser(user?.id, user?.access_token); // Lấy lại thông tin user sau khi cập nhật
    } else if (isError || data?.status === "ERR") {
      message.error(`Failed to update user ${JSON.stringify(data)}`);
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  // const handleGetDetailsUser = async (id, token) => {
  //   try {
  //     const res = await UserService.getDetailsUser(id, token);
  //     if (res?.data) {
  //       dispatch(updateUser({ ...res?.data, access_token: token }));
  //     } else {
  //       message.error("Failed to fetch updated user details");
  //     }
  //   } catch (error) {
  //     message.error("Error fetching user details");
  //     console.error("Error fetching user details:", error);
  //   }
  // };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  // handleOnchangeAvatar: Khi người dùng chọn tệp ảnh mới, hàm này sẽ xử lý việc chuyển ảnh thành định dạng base64 và lưu vào state avatar.
  const handleOnchangeAvatar = async ({ fileList }) => {
    // Kiểm tra file đầu tiên có tồn tại không
    const file = fileList[0];
    if (file) {
      // Kiểm tra xem file đã có url hoặc preview chưa
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj); // Chuyển file thành base64
      }
      // Cập nhật state avatar với ảnh preview
      setAvatar(file.preview);
    }
  };

  // const handleUpdate = () => {
  //   mutation.mutate({
  //     id: user?.id,
  //     name,
  //     email,
  //     phone,
  //     address,
  //     avatar,
  //     access_token: user?.access_token,
  //   });
  //   // console.log("Update", name, email, phone, address, avatar);
  // };

  // handleUpdate: Gọi hàm mutateAsync để gửi yêu cầu cập nhật thông tin người dùng với các giá trị mới.
  const handleUpdate = async () => {
    mutation.mutateAsync({
      id: user?.id,
      name,
      email,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeaderProfile>Thông tin người dùng</WrapperHeaderProfile>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="name"
              value={name}
              onChange={handleOnchangeName}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,256)",
                borderRadius: "5px",
                padding: "2px 6px 6px ",
              }}
              textbutton={"Update"}
              styletextbutton={{
                color: "rgb(26,148,256)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="email"
              value={email}
              onChange={handleOnchangeEmail}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,256)",
                borderRadius: "5px",
                padding: "2px 6px 6px ",
              }}
              textbutton={"Update"}
              styletextbutton={{
                color: "rgb(26,148,256)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="phone"
              value={phone}
              onChange={handleOnchangePhone}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,256)",
                borderRadius: "5px",
                padding: "2px 6px 6px ",
              }}
              textbutton={"Update"}
              styletextbutton={{
                color: "rgb(26,148,256)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm
              style={{ width: "300px" }}
              id="address"
              value={address}
              onChange={handleOnchangeAddress}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,256)",
                borderRadius: "5px",
                padding: "2px 6px 6px ",
              }}
              textbutton={"Update"}
              styletextbutton={{
                color: "rgb(26,148,256)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              ></img>
            )}
            {/* <InputForm
              style={{ width: "300px" }}
              id="avatar"
              value={avatar}
              onChange={handleOnchangeAvatar}
            /> */}
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                border: "1px solid rgb(26,148,256)",
                borderRadius: "5px",
                padding: "2px 6px 6px ",
              }}
              textbutton={"Update"}
              styletextbutton={{
                color: "rgb(26,148,256)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
