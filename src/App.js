import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./component/DefaultComponent/DefaultComponent";
import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import * as UserService from "./services/UserService";
import Loading from "./component/LoadingComponent/Loading";

function App() {
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
    setIsLoading(false); // Kết thúc loading sau khi quá trình kết thúc (thành công hoặc thất bại)
  };

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

  return (
    <div>
      <Loading isPending={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const ischeckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={ischeckAuth ? route.path : undefined}
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
      </Loading>
    </div>
  );
}
export default App;
