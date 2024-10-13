import axios from "axios";
import { axiosJWT } from "./UserService";

// export const createOrder = async (data, access_token) => {
//   const res = await axiosJWT.post(
//     `${process.env.REACT_APP_API_TEST}/order/Create-Order/`,
//     data,
//     {
//       headers: {
//         token: `Bearer ${access_token}`,
//       },
//     }
//   );
//   return res.data;
// };

export const createOrder = async (data) => {
  // Lấy access_token từ LocalStorage
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (!access_token) {
    console.error("No access token found");
    return;
  }

  try {
    // Gửi request tạo đơn hàng
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_TEST}/order/Create-Order/`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error.response || error);
    // Có thể xử lý thêm ở đây
  }
};
