import React, { useEffect, useState } from "react";
import {
  WrapperContentProfile,
  WrapperHeaderProfile,
  WrapperInput,
  WrapperLabel,
} from "./style";
import InputForm from "../../component/InputForm/InputForm";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../component/LoadingComponent/Loading";
import { message } from "antd";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);
  const [avatar, setAvatar] = useState(user?.avatar);

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

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
  const handleOnchangeAvatar = (value) => {
    setAvatar(value);
  };

  const mutation = useMutationHooks((id, data) =>
    UserService.updateUser(id, data)
  );

  const { data, isPending, isSuccess, isError } = mutation;
  console.log("data", data);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(UserService.updateUser({ ...res?.data, access_token: token }));
    // console.log("res", res);
  };
  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleUpdateUser = () => {
    mutation.mutate(user?.id, { name, email, phone, address, avatar });
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
              onClick={handleUpdateUser}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "5px",
                padding: "2px 6px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26,148,255)",
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
              onClick={handleUpdateUser}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "5px",
                padding: "2px 6px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26,148,255)",
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
              onClick={handleUpdateUser}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "5px",
                padding: "2px 6px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26,148,255)",
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
              onClick={handleUpdateUser}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "5px",
                padding: "2px 6px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26,148,255)",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>

            <InputForm
              style={{ width: "300px" }}
              id="avatar"
              value={avatar}
              onChange={handleOnchangeAvatar}
            />

            <ButtonComponent
              onClick={handleUpdateUser}
              size={40}
              styleButton={{
                height: "30px",
                width: "fit-content",
                borderRadius: "5px",
                padding: "2px 6px 6px",
              }}
              textButton={"Update"}
              styleTextButton={{
                color: "rgb(26,148,255)",
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
