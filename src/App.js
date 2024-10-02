import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./component/DefaultComponent/DefaultComponent";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import * as UserService from "./services/UserService";

function App() {
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  const dispatch = useDispatch();
  const handleGetDetailsUser = async (id, token) => {
    try {
      const res = await UserService.getDetailsUser(id, token); // Gọi API lấy thông tin người dùng
      dispatch(updateUser({ ...res?.data, access_token: token })); // Cập nhật vào Redux store
    } catch (error) {
      console.error("Failed to get user details:", error); // Xử lý lỗi nếu có
    }
  };

  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     // Do something before request is sent
  //     const currentTime = new Date();
  //     const { decoded } = handleDecoded();
  //     if (decoded?.exp < currentTime.getTime() / 1000) {
  //       const data = await UserService.refreshToken();
  //       config.headers["token"] = `Bearer ${data?.access_token}`;
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     // Do something with request error
  //     return Promise.reject(err);
  //   }
  // );

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        try {
          const data = await UserService.refreshToken(); // Refresh token
          config.headers["token"] = `Bearer ${data?.access_token}`; // Gán access token mới vào header
          localStorage.setItem(
            "access_token",
            JSON.stringify(data?.access_token)
          ); // Lưu token mới
        } catch (error) {
          console.error("Failed to refresh token:", error);
          // Bạn có thể xử lý lỗi refresh token ở đây, ví dụ: redirect về trang login
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // const dispatch = useDispatch();

  // const handleDecoded = () => {
  //   let accessToken = localStorage.getItem("access_token");
  //   let decoded = {};

  //   if (accessToken) {
  //     decoded = jwtDecode(accessToken); // Giải mã access token
  //   }

  //   return { decoded, accessToken };
  // };

  // useEffect(() => {
  //   const { accessToken, decoded } = handleDecoded();
  //   if (decoded?.id) {
  //     handleGetDetailsUser(decoded?.id, accessToken); // Gọi API lấy thông tin người dùng
  //   } else {
  //     window.location.href = "/Sign-In"; // Redirect nếu không có thông tin người dùng
  //   }
  // }, []);

  // const handleGetDetailsUser = async (id, token) => {
  //   try {
  //     const res = await UserService.getDetailsUser(id, token); // Gọi API lấy thông tin người dùng
  //     dispatch(updateUser({ ...res?.data, access_token: token })); // Cập nhật vào Redux store
  //   } catch (error) {
  //     console.error("Failed to get user details:", error); // Xử lý lỗi nếu có
  //   }
  // };

  // // Thiết lập Axios Interceptor
  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     const currentTime = new Date();
  //     const { decoded } = handleDecoded();

  //     if (decoded?.exp < currentTime.getTime() / 1000) {
  //       try {
  //         // Gọi API refresh token
  //         const data = await UserService.refreshToken();
  //         config.headers["token"] = `Bearer ${data?.access_token}`; // Gán access token mới vào header
  //         localStorage.setItem(
  //           "access_token",
  //           JSON.stringify(data?.access_token)
  //         ); // Lưu token mới
  //       } catch (error) {
  //         console.error("Failed to refresh token:", error);
  //         // Điều hướng người dùng đến trang đăng nhập nếu refresh token không hợp lệ
  //         window.location.href = "/Sign-In";
  //       }
  //     }

  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
