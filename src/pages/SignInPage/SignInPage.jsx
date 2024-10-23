import React, { useEffect } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../component/InputForm/InputForm";
import ButtonComponent from "../../component/ButtonComponent/ButtonComponent";
import imageLogo from "../../assets/images/theme-login.jpg";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../component/LoadingComponent/Loading";
import * as message from "../../component/Message/Message";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  // isShowPassword: Điều khiển việc hiển thị mật khẩu dưới dạng text hoặc dấu sao.
  const [isShowPassword, setIsShowPassword] = useState(false);
  // email, password: Lưu trữ giá trị email và mật khẩu người dùng nhập vào.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const dispatch = useDispatch();

  // Các hàm xử lý sự kiện handleOnchangeEmail và handleOnchangePassword được sử dụng để cập nhật email và password dựa trên input từ người dùng.
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  // Khi người dùng bấm nút "Login", hàm handleSignIn được gọi và thực hiện yêu cầu đăng nhập bằng cách gọi mutation.mutate từ hook useMutationHooks.
  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
    // console.log("Sign in", email, password);
  };

  const navigate = useNavigate();
  const handleNavigateSignUp = () => {
    navigate("/Sign-Up");
  };

  // useMutationHooks: Đây là một hook tùy chỉnh để xử lý các hành động bất đồng bộ (asynchronous actions) như gọi API.
  // UserService.loginUser: Hàm này sẽ gửi yêu cầu đăng nhập đến backend.
  const mutation = useMutationHooks((data) => UserService.loginUser(data));

  const { data, isPending, isSuccess, isError } = mutation;

  // Nếu đăng nhập thành công (isSuccess), token sẽ được lưu vào localStorage, và thông tin người dùng được giải mã bằng jwtDecode. Sau đó, người dùng sẽ được chuyển hướng về trang chính.
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      // Chỉ điều hướng nếu đăng nhập thành công
      localStorage.setItem("access_token", JSON.stringify(data?.access_token)); // Lưu access token vào localStorage
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token); // Giải mã token bằng jwtDecode
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
      navigate("/"); // Điều hướng sang trang chính khi đăng nhập thành công
    } else if (isError || data?.status === "ERR") {
      // Hiển thị thông báo lỗi nếu có
      message.error(data?.message || "Đăng nhập thất bại, vui lòng thử lại.");
    }
  }, [isSuccess, isError, data?.access_token, data?.message, navigate]);

  // Sau khi đăng nhập thành công, hàm này được gọi để lấy chi tiết thông tin người dùng và cập nhật vào Redux store thông qua dispatch(updateUser).
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    // console.log("res", res);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ccc",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>What's up</h1>
          <p>Login or Sign in</p>
          <InputForm
            style={{ marginBottom: "13px" }}
            placeholder="duy@gmail"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? (
                <EyeFilled></EyeFilled>
              ) : (
                <EyeInvisibleFilled></EyeInvisibleFilled>
              )}
            </span>

            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            ></InputForm>
          </div>

          {data?.status === "ERR" && (
            <span style={{ color: "rgb(225,57,69)" }}>{data?.message}</span>
          )}
          <Loading isPending={isPending}>
            <ButtonComponent
              onClick={handleSignIn}
              disabled={!email.length || !password.length}
              size={40}
              styleButton={{
                background: "rgb(225,57,69)",
                height: "48px",
                width: "100%",
                borderRadius: "5px",
                margin: "26px 0 10px",
              }}
              textbutton={"Login"}
              styletextbutton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </Loading>

          <p>
            <WrapperTextLight>Forgot password</WrapperTextLight>
          </p>
          <p>
            No account ?
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Sign Up
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="image-logo"
            width="200px"
            height="200px"
          ></Image>
          <h4>Mua sắm tại BookShopBee</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
