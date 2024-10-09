import axios from "axios";
export const axiosJWT = axios.create();

//call api
export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/user/Sign-In`,
    data
  );
  console.log("Login response:", res);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/user/Sign-Up`,
    data
  );
  return res.data;
};

// export const getDetailsUser = async (id, access_token) => {
//   const res = await axiosJWT.get(
//     `${process.env.REACT_APP_API_TEST}/user/Get-Details/${id}`,
//     {
//       headers: {
//         token: `Bearer ${access_token}`,
//       },
//     }
//   );
//   return res.data;
// };
export const getDetailsUser = async (id) => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (!access_token) {
    console.error("No access token found");
    return;
  }

  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_TEST}/user/Get-Details/${id}`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error.response || error);
    // Có thể xử lý thêm ở đây
  }
};

// export const getAllUser = async (access_token) => {
//   console.log("Access Token:", access_token);
//   const res = await axiosJWT.get(
//     `${process.env.REACT_APP_API_TEST}/user/GetAll/`,
//     {
//       headers: {
//         token: `Bearer ${access_token}`,
//       },
//     }
//   );
//   return res.data;
// };
export const getAllUser = async () => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (!access_token) {
    console.error("No access token found");
    return;
  }

  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_TEST}/user/GetAll/`,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error.response || error);
    // Có thể xử lý thêm ở đây
  }
};

// export const getDetailsUser = async (id, access_token) => {
//   try {
//     const res = await axiosJWT.get(
//       `${process.env.REACT_APP_API_TEST}/user/Get-Details/${id}`,
//       {
//         headers: {
//           token: `Bearer ${access_token}`,
//         },
//       }
//     );

//     return res.data;
//   } catch (error) {
//     console.error("Error fetching user details:", error); // Log lỗi nếu có
//     throw error; // Ném lỗi để có thể xử lý ở nơi gọi hàm
//   }
// };

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/user/Refresh-Token`,
    { withCredentials: true }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_TEST}/user/Log-Out`
  );
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_TEST}/user/Update-User/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// export const updateUser = async (id, data, access_token) => {
//   try {
//     const res = await axiosJWT.put(
//       `${process.env.REACT_APP_API_TEST}/user/Update-User/${id}`,
//       data,
//       {
//         headers: {
//           token: `Bearer ${access_token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (error) {
//     console.error(
//       "Error updating user:",
//       error?.response?.data || error.message
//     );
//     throw (
//       error?.response?.data || {
//         message: "Update failed",
//         details: error.message,
//       }
//     );
//   }
// };

export const deleteUser = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_TEST}/user/Delete-User/${id}`,

    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// export const deleteManyUser = async (data, access_token) => {
//   const res = await axiosJWT.post(
//     `${process.env.REACT_APP_API_TEST}/user/Delete-Many`,
//     data,
//     {
//       headers: {
//         token: `Bearer ${access_token}`,
//       },
//     }
//   );
//   return res.data;
// };

export const deleteManyUser = async (data) => {
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  if (!access_token) {
    console.error("No access token found");
    return;
  }

  try {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_TEST}/user/Delete-Many`,
      data,
      {
        headers: {
          token: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error.response || error);
    // Có thể xử lý thêm ở đây
  }
};
