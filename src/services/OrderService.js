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

export const getOrderByUserId = async (id) => {
  // Lấy access_token từ LocalStorage
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (!access_token) {
    console.error("No access token found");
    return;
  }

  try {
    // Gửi request lấy tất cả đơn hàng của người dùng
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_TEST}/order/Get-All-Order/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response || error);
    // Có thể xử lý thêm ở đây
  }
};

export const getDetailsOrder = async (id) => {
  // Lấy access_token từ LocalStorage
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (!access_token) {
    console.error("No access token found");
    return;
  }

  try {
    // Gửi request lấy chi tiết đơn hàng
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_TEST}/order/Get-Details-Order/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching order details:", error.response || error);
    // Có thể xử lý thêm ở đây
  }
};

export const cancelOrder = async (id, access_token, orderItems) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_TEST}/order/Cancel-Order/${id}`,

    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    },
    { data: orderItems }
  );
  return res.data;
};

// export const cancelOrder = async (id, orderItems) => {
//   // Lấy access_token từ LocalStorage
//   const access_token = JSON.parse(localStorage.getItem("access_token"));
//   if (!access_token) {
//     console.error("No access token found");
//     return;
//   }
//   console.log("access token: ", access_token);

//   try {
//     const res = await axiosJWT.delete(
//       `${process.env.REACT_APP_API_TEST}/order/Cancel-Order/${id}`,

//       {
//         headers: {
//           token: `Bearer ${access_token}`,
//         },
//       },
//       { data: orderItems }
//     );
//     return res.data;
//   } catch (error) {
//     console.error("Error canceling order:", error.response || error);
//     // Có thể xử lý thêm ở đây
//   }
// };
